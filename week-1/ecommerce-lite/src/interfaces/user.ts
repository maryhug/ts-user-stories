// ============================================================
// Interfaz: Address
// Representa una dirección postal completa.
// ============================================================
export interface Address {
    street: string;   // calle y número
    city: string;     // ciudad
    state: string;    // estado / departamento
    zipCode: string;  // código postal
    country: string;  // país
}

// ============================================================
// Tipo: UserRole
// "type alias" con los roles posibles.
// ============================================================
export type UserRole = "admin" | "customer" | "seller";

// ============================================================
// Interfaz: User
// Define la forma de un usuario en el sistema.
// ============================================================
export interface User {
    id: string;
    fullName: string;
    email: string;
    isActive: boolean;
    role: UserRole;
    address: Address;
    createdAt: Date;

    phone?: string;
    avatarUrl?: string;
}