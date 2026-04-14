// ============================================================
// [id]/route.ts — /api/properties/:id
// Endpoints para actualizar y eliminar una propiedad específica.
//
// El segmento [id] en la carpeta hace que Next.js capture
// el valor de la URL y lo pase como params.id al handler.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Property from "@/database/models/Property";

// Tipo que Next.js pasa como segundo argumento a los handlers
interface RouteContext {
    params: { id: string };
}

// ----------------------------------------------------------
// PUT /api/properties/:id
// Actualiza los campos enviados en el body para el documento con ese id
// ----------------------------------------------------------
export async function PUT(request: NextRequest, { params }: RouteContext) {
    try {
        await connectDB();

        const body = await request.json();
        const { id } = params;

        // findByIdAndUpdate con { new: true } retorna el documento ACTUALIZADO
        // runValidators: true aplica las validaciones del schema en el update
        const updated = await Property.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Propiedad no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updated },
            { status: 200 }
        );
    } catch (error) {
        console.error(`[PUT /api/properties/${params.id}]`, error);
        return NextResponse.json(
            { success: false, message: "Error al actualizar la propiedad" },
            { status: 500 }
        );
    }
}

// ----------------------------------------------------------
// DELETE /api/properties/:id
// Elimina el documento con ese id de MongoDB
// ----------------------------------------------------------
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
    try {
        await connectDB();

        const deleted = await Property.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Propiedad no encontrada" },
                { status: 404 }
            );
        }

        // 200 con mensaje de confirmación (algunos prefieren 204 sin body)
        return NextResponse.json(
            { success: true, message: "Propiedad eliminada correctamente" },
            { status: 200 }
        );
    } catch (error) {
        console.error(`[DELETE /api/properties/${params.id}]`, error);
        return NextResponse.json(
            { success: false, message: "Error al eliminar la propiedad" },
            { status: 500 }
        );
    }
}