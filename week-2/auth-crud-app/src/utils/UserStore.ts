// ============================================================
// Clase que centraliza todas las operaciones CRUD sobre usuarios.
//
// Usamos una CLASE (en lugar de funciones sueltas) porque:
// - Agrupa estado (el array _users) y comportamiento juntos
// - Permite aplicar decoradores sobre sus métodos
// - Es más fácil de extender o reemplazar por una clase real con fetch()
// ============================================================

import type { User } from "../interfaces/User";
import { mockUsers } from "../data/users";
import { withDefaults } from "./decorators";


export class UserStore {
    // Array interno de usuarios — privado para que nadie lo modifique directamente
    private _users: User[] = [...mockUsers];

    // Contador para generar IDs únicos en usuarios nuevos
    private _nextId: number = this._users.length + 1;

    // ----------------------------------------------------------
    // LIST — devuelve todos los usuarios
    // Simula: GET /api/users
    // ----------------------------------------------------------
    list(): User[] {
        console.log("[GET] /api/users — listando todos los usuarios");
        return [...this._users]; // retornamos una copia para no exponer el array interno
    }

    // ----------------------------------------------------------
    // FIND BY NAME — busca usuarios cuyo nombre contenga el texto
    // Simula: GET /api/users?name=...
    // ----------------------------------------------------------
    findByName(name: string): User[] {
        console.log(`[GET] /api/users?name=${name} — buscando usuarios`);
        return this._users.filter((u) =>
            u.fullName.toLowerCase().includes(name.toLowerCase())
        );
    }

    // ----------------------------------------------------------
    // CREATE — agrega un usuario nuevo
    // Simula: POST /api/users
    // Nota: el decorador @withDefaults intercepta este método
    // ----------------------------------------------------------
    @withDefaults
    create(userData: Omit<User, "id" | "createdAt" | "role">): User {
        console.log("[POST] /api/users — creando nuevo usuario", userData);

        // Construimos el nuevo usuario con id autoincremental
        const newUser: User = {
            ...userData,
            id: this._nextId++,
            role: "user",           // valor por defecto (el decorador lo sobreescribirá)
            createdAt: Date.now(),  // timestamp actual
        };

        this._users.push(newUser);
        console.log("[POST] Usuario creado con ID:", newUser.id);
        return newUser;
    }

    // ----------------------------------------------------------
    // UPDATE — actualiza campos de un usuario existente
    // Simula: PATCH /api/users/:id
    // Partial<User> significa que todos los campos de User son opcionales
    // ----------------------------------------------------------
    update(id: number, changes: Partial<User>): User | null {
        console.log(`[PATCH] /api/users/${id} — actualizando usuario`);

        const index = this._users.findIndex((u) => u.id === id);

        if (index === -1) {
            console.warn(`[PATCH] Usuario con id ${id} no encontrado`);
            return null;
        }

        // Spread: mantenemos los datos existentes y sobreescribimos solo lo que cambió
        this._users[index] = { ...this._users[index], ...changes };
        console.log("[PATCH] Usuario actualizado:", this._users[index]);
        return this._users[index];
    }

    // ----------------------------------------------------------
    // REMOVE — elimina un usuario por id
    // Simula: DELETE /api/users/:id
    // ----------------------------------------------------------
    remove(id: number): boolean {
        console.log(`[DELETE] /api/users/${id} — eliminando usuario`);

        const index = this._users.findIndex((u) => u.id === id);

        if (index === -1) {
            console.warn(`[DELETE] Usuario con id ${id} no encontrado`);
            return false;
        }

        this._users.splice(index, 1);
        console.log(`[DELETE] Usuario ${id} eliminado correctamente`);
        return true;
    }
}