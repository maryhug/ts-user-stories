// ============================================================
// Componente que renderiza la tarjeta de un usuario.
// Muestra nombre, email, rol y estado de la cuenta.
// ============================================================

import React from "react";
import { User } from "../interfaces/user";

// Props tipadas: solo acepta un objeto que cumpla la interfaz User
interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    // Colores según el rol del usuario
    const roleColors: Record<string, { bg: string; text: string }> = {
        admin:    { bg: "#fff3cd", text: "#856404" },
        seller:   { bg: "#cff4fc", text: "#055160" },
        customer: { bg: "#e2e3e5", text: "#383d41" },
    };

    const roleStyle = roleColors[user.role];

    return (
        <div style={styles.card}>
            {/* Avatar: usa la URL si existe, si no muestra las iniciales */}
            <div style={styles.avatarWrapper}>
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} style={styles.avatar} />
                ) : (
                    <div style={styles.avatarFallback}>
                        {/* Tomamos la primera letra del nombre y apellido */}
                        {user.fullName
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                    </div>
                )}

                {/* Punto verde/rojo según isActive */}
                <span
                    style={{
                        ...styles.statusDot,
                        backgroundColor: user.isActive ? "#28a745" : "#dc3545",
                    }}
                />
            </div>

            {/* Información del usuario */}
            <div style={styles.info}>
                <h3 style={styles.name}>{user.fullName}</h3>
                <p style={styles.email}>{user.email}</p>

                {/* Rol con color según tipo */}
                <span style={{ ...styles.roleBadge, ...roleStyle }}>
          {user.role}
        </span>

                {/* Ciudad y país */}
                <p style={styles.location}>
                    📍 {user.address.city}, {user.address.country}
                </p>

                {/* Teléfono (campo opcional — solo se muestra si existe) */}
                {user.phone && (
                    <p style={styles.phone}>📞 {user.phone}</p>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
    },
    avatarWrapper: {
        position: "relative",
        flexShrink: 0,
    },
    avatar: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        objectFit: "cover",
    },
    avatarFallback: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#0d6efd",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: 700,
    },
    statusDot: {
        position: "absolute",
        bottom: "2px",
        right: "2px",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        border: "2px solid #ffffff",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    name: {
        margin: 0,
        fontSize: "16px",
        fontWeight: 700,
        color: "#212529",
    },
    email: {
        margin: 0,
        fontSize: "13px",
        color: "#6c757d",
    },
    roleBadge: {
        display: "inline-block",
        alignSelf: "flex-start",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "capitalize",
    },
    location: {
        margin: 0,
        fontSize: "12px",
        color: "#495057",
    },
    phone: {
        margin: 0,
        fontSize: "12px",
        color: "#495057",
    },
};

export default UserCard;