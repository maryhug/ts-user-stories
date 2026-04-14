# properties-crud

CRUD completo de propiedades inmobiliarias con Next.js, MongoDB,
Mongoose y Axios.

---

## Stack

| Tecnología | Rol |
|---|---|
| Next.js 14 (App Router) | Framework frontend + API Routes |
| TypeScript | Tipado estricto en todo el proyecto |
| MongoDB Atlas | Base de datos en la nube |
| Mongoose | ODM para modelar documentos MongoDB |
| Axios | Cliente HTTP para consumir la API desde el cliente |

---

## Requisitos

- Node.js 18+
- Cuenta en [MongoDB Atlas](https://cloud.mongodb.com) (gratis)

---

## Instalación desde cero

```bash
npx create-next-app@latest properties-crud --typescript --app --no-tailwind --eslint
cd properties-crud
npm install mongoose axios
mkdir -p src/lib src/database/models src/services
mkdir -p src/app/api/properties/[id]
mkdir -p src/app/dashboard/properties
```

## Configuración de MongoDB

1. Crea un cluster gratuito en https://cloud.mongodb.com
2. En "Database Access" crea un usuario con contraseña
3. En "Network Access" agrega tu IP (o 0.0.0.0/0 para desarrollo)
4. En "Connect" copia la connection string

Crea `.env.local` en la raíz:

```
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/properties-db?retryWrites=true&w=majority
```

## Ejecución

```bash
npm run dev
```

Abre http://localhost:3000 — redirige automáticamente al dashboard.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── api/
│   │   └── properties/
│   │       ├── route.ts          # GET /api/properties, POST /api/properties
│   │       └── [id]/
│   │           └── route.ts      # PUT /api/properties/:id, DELETE /api/properties/:id
│   ├── dashboard/
│   │   └── properties/
│   │       └── page.tsx          # Vista CRUD del dashboard ("use client")
│   └── page.tsx                  # Redirección a /dashboard/properties
├── database/
│   └── models/
│       └── Property.ts           # Modelo Mongoose + interface TypeScript
├── lib/
│   └── db.ts                     # Conexión a MongoDB con cache global
└── services/
    └── properties.ts             # Capa de servicios Axios (getProperties, etc.)
```

---

## Flujo de datos

```
Dashboard (React) → services/properties.ts (Axios) → /api/properties (Next.js Route)
                                                              ↓
                                                       lib/db.ts (Mongoose)
                                                              ↓
                                                       MongoDB Atlas
```

---

## Endpoints de la API

| Método | URL | Descripción |
|---|---|---|
| `GET` | `/api/properties` | Lista todas las propiedades |
| `POST` | `/api/properties` | Crea una nueva propiedad |
| `PUT` | `/api/properties/:id` | Actualiza una propiedad por ID |
| `DELETE` | `/api/properties/:id` | Elimina una propiedad por ID |

### Body para POST y PUT

```json
{
  "name": "Apartamento Centro",
  "value": 250000,
  "img": "https://ejemplo.com/foto.jpg"
}
```

---

## Servicios disponibles (Axios)

```typescript
import {
  getProperties,    // GET  — retorna IProperty[]
  postProperty,     // POST — retorna IProperty creado
  updateProperty,   // PUT  — retorna IProperty actualizado
  deleteProperty,   // DELETE — retorna void
} from "@/services/properties";
```

---

## Conceptos clave

| Concepto | Archivo | Explicación |
|---|---|---|
| Cached connection | `lib/db.ts` | Evita múltiples conexiones en hot-reload |
| `mongoose.models.X \|\| mongoose.model(...)` | `Property.ts` | Evita "Cannot overwrite model" en dev |
| `"use client"` | `dashboard/page.tsx` | Habilita hooks de React en App Router |
| `NextResponse.json()` | `api/properties/route.ts` | Respuesta tipada en App Router |
| `Omit<T, K>` | `services/properties.ts` | Excluye campos del tipo para el payload |
| `Partial<T>` | `services/properties.ts` | Hace todos los campos opcionales para updates |