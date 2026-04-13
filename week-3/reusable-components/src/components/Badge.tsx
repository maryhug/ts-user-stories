// ============================================================
// Etiqueta visual compacta para comunicar estados o categorías.
//
// Uso básico:
//   <Badge label="Activo" status="success" />
//   <Badge label="Pendiente" status="warning" icon="⏳" />
//   <Badge label="Error" status="error" />
// ============================================================

import React from "react";
import { BadgeProps } from "../interfaces/Badge";

// Mapa de colores por status.
// Cada entrada define fondo (bg) y texto (text) para que
// el contraste sea siempre legible.
const statusColors: Record<
NonNullable<BadgeProps["status"]>,
    { bg: string; text: string }
    > = {
        success: { bg: "#d4edda", text: "#155724" },
        warning: { bg: "#fff3cd", text: "#856404" },
        info:    { bg: "#cff4fc", text: "#055160" },
        error:   { bg: "#f8d7da", text: "#721c24" },
        neutral: { bg: "#e2e3e5", text: "#383d41" },
    };

const Badge: React.FC<BadgeProps> = ({
                                         label,
                                         status = "neutral",
                                         icon,
                                     }) => {
    const { bg, text } = statusColors[status];

    const style: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 10px",
        borderRadius: "20px",     // píldora redondeada
        backgroundColor: bg,
        color: text,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.03em",
        fontFamily: "'Segoe UI', sans-serif",
    };

    return (
        <span style={style}>
      {/* Ícono opcional — solo se renderiza si se pasó */}
            {icon && <span style={{ fontSize: "11px" }}>{icon}</span>}
            {label}
    </span>
    );
};

export default Badge;