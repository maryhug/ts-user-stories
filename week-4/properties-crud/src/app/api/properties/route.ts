// ============================================================
// route.ts — /api/properties
// Endpoints para listar y crear propiedades.
//
// En Next.js App Router cada archivo route.ts exporta
// funciones nombradas GET, POST, PUT, DELETE que corresponden
// al método HTTP. No hay un objeto req/res clásico de Express;
// en su lugar usamos Request y NextResponse.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Property from "@/database/models/Property";

// ----------------------------------------------------------
// GET /api/properties
// Retorna todas las propiedades ordenadas por fecha de creación
// ----------------------------------------------------------
export async function GET() {
    try {
        await connectDB();

        // .lean() convierte los documentos Mongoose a objetos JS planos,
        // lo que es más eficiente cuando no necesitamos métodos de Mongoose
        const properties = await Property.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json(
            { success: true, data: properties },
            { status: 200 }
        );
    } catch (error) {
        console.error("[GET /api/properties]", error);
        return NextResponse.json(
            { success: false, message: "Error al obtener propiedades" },
            { status: 500 }
        );
    }
}

// ----------------------------------------------------------
// POST /api/properties
// Crea una nueva propiedad con los datos del body
// ----------------------------------------------------------
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // Parseamos el body de la petición (JSON)
        const body = await request.json();
        const { name, value, img } = body;

        // Validación básica antes de llegar a Mongoose
        if (!name || value === undefined) {
            return NextResponse.json(
                { success: false, message: "name y value son obligatorios" },
                { status: 400 }
            );
        }

        // Creamos y guardamos el documento en MongoDB
        const newProperty = await Property.create({ name, value, img: img || "" });

        return NextResponse.json(
            { success: true, data: newProperty },
            { status: 201 }  // 201 Created
        );
    } catch (error: any) {
        console.error("[POST /api/properties]", error);

        // Mongoose lanza errores de validación con el campo "name" = "ValidationError"
        if (error.name === "ValidationError") {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Error al crear la propiedad" },
            { status: 500 }
        );
    }
}