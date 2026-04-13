// ============================================================
// Renderiza la lista de usuarios con .map().
// Muestra todos los usuarios (activos e inactivos).
// ============================================================

import React from "react";
import { User } from "../interfaces/user";
import UserCard from "./UserCard";

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div>
            <div style={styles.header}>
                <h2 style={styles.title}>Usuarios del sistema</h2>
                <span style={styles.count}>{users.length} usuarios</span>
            </div>

            {/* Lista vertical de tarjetas de usuario */}
            <div style={styles.list}>
                {users.map((user) => (
                    // Usamos user.id como key único en la lista
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
    },
    title: {
        margin: 0,
        fontSize: "24px",
        fontWeight: 700,
        color: "#212529",
    },
    count: {
        backgroundColor: "#e9ecef",
        color: "#495057",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "13px",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
};

export default UserList;