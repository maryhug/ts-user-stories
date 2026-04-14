// ============================================================
// db.ts
// Módulo de conexión a MongoDB con Mongoose.
//
// PROBLEMA que resuelve el patrón "cached connection":
// En Next.js con App Router, cada hot-reload en desarrollo
// volvería a llamar mongoose.connect() creando decenas de
// conexiones simultáneas. Guardamos la conexión en la variable
// global de Node.js para reutilizarla entre recargas.
// En producción esto no aplica porque el servidor no se recarga,
// pero el patrón funciona igual en ambos entornos.
// ============================================================

import mongoose from "mongoose";

// URI de conexión desde variables de entorno (nunca hardcodear credenciales)
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        "❌ MONGODB_URI no está definida. Crea el archivo .env.local con la variable."
    );
}

// ----------------------------------------------------------
// Tipo para el cache global de conexión.
// Guardamos tanto la promesa como el estado de la conexión.
// ----------------------------------------------------------
interface MongooseCache {
    conn: typeof mongoose | null;  // la conexión activa (o null si no existe)
    promise: Promise<typeof mongoose> | null; // promesa en curso (o null)
}

// Extendemos el tipo global de Node.js para que TypeScript
// acepte nuestra propiedad personalizada en "global"
declare global {
    var mongooseCache: MongooseCache | undefined;
}

// Inicializamos el cache la primera vez
const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

// ----------------------------------------------------------
// connectDB — función principal que exportamos
// Llámala al inicio de cada API route que necesite la base de datos
// ----------------------------------------------------------
export async function connectDB(): Promise<typeof mongoose> {
    // Si ya hay una conexión activa, la reutilizamos directamente
    if (cached.conn) {
        console.log("[MongoDB] Reutilizando conexión existente");
        return cached.conn;
    }

    // Si no hay promesa en curso, iniciamos la conexión
    if (!cached.promise) {
        console.log("[MongoDB] Iniciando nueva conexión...");

        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false, // evita que Mongoose encole operaciones si no hay conexión
        });
    }

    // Esperamos a que la conexión se resuelva y la guardamos en cache
    cached.conn = await cached.promise;
    console.log("[MongoDB] Conexión establecida ✓");

    return cached.conn;
}