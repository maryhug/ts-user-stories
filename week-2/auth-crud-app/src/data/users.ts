import { User } from "../interfaces/User";

export const mockUsers: User[] = [
    {
        id: 1,
        fullName: "Ana García",
        email: "ana@demo.com",
        password: "1234",
        isActive: true,
        role: "admin",
        createdAt: Date.now(),
        address: "Medellín, Colombia",
    },
    {
        id: 2,
        fullName: "Carlos Ruiz",
        email: "carlos@demo.com",
        password: "abcd",
        isActive: true,
        role: "user",
        createdAt: Date.now(),
    },
    {
        // usuario inactivo: no podrá autenticarse
        id: 3,
        fullName: "María Torres",
        email: "maria@demo.com",
        password: "pass123",
        isActive: false,
        role: "seller",
        createdAt: Date.now(),
        address: "Bogotá, Colombia",
    },
];