// ============================================================
// properties.ts
// Capa de servicios: encapsula todas las llamadas HTTP a la API.
//
// BENEFICIO de tener esta capa separada:
// - Los componentes no saben nada de URLs ni de Axios
// - Si cambia la API (URL, método, headers), solo tocamos este archivo
// - Cada función es fácilmente testeable de forma aislada
// ============================================================

import axios from "axios";
import { IProperty } from "@/database/models/Property";

// URL base de la API — apunta al mismo Next.js en desarrollo
const API_URL = "/api/properties";

// ----------------------------------------------------------
// Tipo de respuesta genérico que retorna nuestra API
// ----------------------------------------------------------
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

// ----------------------------------------------------------
// getProperties — GET /api/properties
// Retorna el array de todas las propiedades
// ----------------------------------------------------------
export async function getProperties(): Promise<IProperty[]> {
    const response = await axios.get<ApiResponse<IProperty[]>>(API_URL);

    // Axios lanza error automáticamente si el status es 4xx o 5xx,
    // así que si llegamos aquí la petición fue exitosa
    return response.data.data ?? [];
}

// ----------------------------------------------------------
// postProperty — POST /api/properties
// Crea una nueva propiedad y retorna el documento creado
// ----------------------------------------------------------
export async function postProperty(
    property: Omit<IProperty, "_id" | "createdAt" | "updatedAt">
): Promise<IProperty> {
    const response = await axios.post<ApiResponse<IProperty>>(API_URL, property);
    return response.data.data!;
}

// ----------------------------------------------------------
// updateProperty — PUT /api/properties/:id
// Actualiza campos específicos de una propiedad por su _id
// Partial<IProperty> indica que no todos los campos son obligatorios
// ----------------------------------------------------------
export async function updateProperty(
    id: string,
    changes: Partial<IProperty>
): Promise<IProperty> {
    const response = await axios.put<ApiResponse<IProperty>>(
        `${API_URL}/${id}`,
        changes
    );
    return response.data.data!;
}

// ----------------------------------------------------------
// deleteProperty — DELETE /api/properties/:id
// Elimina una propiedad por su _id
// ----------------------------------------------------------
export async function deleteProperty(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
}