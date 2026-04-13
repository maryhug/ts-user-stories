// ============================================================
// Módulo de autenticación independiente.
// ============================================================

import { User } from "../interfaces/User";
import { mockUsers } from "../data/users";

// Tipo de retorno explícito: la función devuelve un User o null
export function authenticate(email: string, password: string): User | null {
    // Buscamos un usuario que coincida en email Y password
    const user = mockUsers.find(
        (u) => u.email === email && u.password === password
    );

    // Si no existe o está inactivo, retornamos null (credenciales inválidas)
    if (!user || !user.isActive) {
        return null;
    }

    return user;
}