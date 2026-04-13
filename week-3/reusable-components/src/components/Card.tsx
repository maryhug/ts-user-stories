// ============================================================
// Contenedor visual que agrupa título, imagen, badges y footer.
// El prop "type" define el tema de color de toda la card.
//
// Uso básico:
//   <Card
//     title="Producto X"
//     type="white"
//     badges={<Badge label="Activo" status="success" />}
//     footer={<Button text="Ver más" />}
//   />
// ============================================================

import React from "react";
import { CardProps } from "../interfaces/Card";

// Temas visuales: cada tipo define colores de fondo, texto y borde
const typeThemes: Record<
CardProps["type"],
    { bg: string; text: string; subtitleColor: string; border: string }
    > = {
        white: {
            bg: "#ffffff",
            text: "#212529",
            subtitleColor: "#6c757d",
            border: "1px solid #e0e0e0",
        },
        green: {
            bg: "#1a7a4a",
            text: "#ffffff",
            subtitleColor: "rgba(255,255,255,0.75)",
            border: "1px solid #155d38",
        },
        black: {
            bg: "#1c1c1e",
            text: "#f8f9fa",
            subtitleColor: "rgba(255,255,255,0.55)",
            border: "1px solid #3a3a3c",
        },
    };

const Card: React.FC<CardProps> = ({
                                       title,
                                       type,
                                       subtitle,
                                       imageUrl,
                                       footer,
                                       badges,
                                   }) => {
    const theme = typeThemes[type];

    return (
        <div style={{ ...styles.card, backgroundColor: theme.bg, border: theme.border }}>

            {/* Imagen de cabecera — solo se renderiza si se pasó imageUrl */}
            {imageUrl && (
                <img src={imageUrl} alt={title} style={styles.image} />
            )}

            {/* Cuerpo de la card */}
            <div style={styles.body}>

                {/* Zona de badges: estados y categorías */}
                {badges && (
                    <div style={styles.badgesRow}>
                        {badges}
                    </div>
                )}

                {/* Título */}
                <h3 style={{ ...styles.title, color: theme.text }}>{title}</h3>

                {/* Subtítulo opcional */}
                {subtitle && (
                    <p style={{ ...styles.subtitle, color: theme.subtitleColor }}>
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Footer: separador visual + contenido (normalmente un Button) */}
            {footer && (
                <div
                    style={{
                        ...styles.footer,
                        borderTop: `1px solid ${type === "white" ? "#f0f0f0" : "rgba(255,255,255,0.12)"}`,
                    }}
                >
                    {footer}
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', sans-serif",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
    },
    body: {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flex: 1,
    },
    badgesRow: {
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
    },
    title: {
        margin: 0,
        fontSize: "17px",
        fontWeight: 700,
        lineHeight: 1.3,
    },
    subtitle: {
        margin: 0,
        fontSize: "13px",
        lineHeight: 1.5,
    },
    footer: {
        padding: "14px 20px",
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
    },
};

export default Card;