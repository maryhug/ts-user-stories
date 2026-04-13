// ============================================================
// Contrato de datos para un usuario del sistema.
// Separamos las interfaces en su propia carpeta para que
// cualquier módulo las importe sin crear dependencias cruzadas.
// ============================================================

export interface User {
    id: number;
    fullName: string;
    email: string;        // se usará como "username" en el login
    password: string;
    isActive: boolean;
    role: "admin" | "user" | "seller";
    createdAt: number;    // timestamp Unix (Date.now())

    address?: string;
}