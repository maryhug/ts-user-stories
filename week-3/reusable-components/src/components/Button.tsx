// ============================================================
// Botón reutilizable con soporte para variantes, tamaños,
// estado de carga e íconos a ambos lados del texto.
//
// Uso básico:
//   <Button text="Guardar" />
//   <Button text="Eliminar" variant="danger" size="sm" />
//   <Button text="Cargando" loading />
// ============================================================

import React from "react";
import { ButtonProps } from "../interfaces/Button";

// ----------------------------------------------------------
// Mapas de estilos: separamos la lógica de presentación
// para que sea fácil cambiar el diseño sin tocar la lógica.
// ----------------------------------------------------------

// Colores y bordes según variante
const variantStyles: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
    primary: {
        backgroundColor: "#0d6efd",
        color: "#ffffff",
        border: "1px solid #0d6efd",
    },
    secondary: {
        backgroundColor: "#ffffff",
        color: "#0d6efd",
        border: "1px solid #0d6efd",
    },
    danger: {
        backgroundColor: "#dc3545",
        color: "#ffffff",
        border: "1px solid #dc3545",
    },
};

// Padding y tamaño de fuente según size
const sizeStyles: Record<NonNullable<ButtonProps["size"]>, React.CSSProperties> = {
    sm: { padding: "5px 12px",  fontSize: "12px" },
    md: { padding: "9px 20px",  fontSize: "14px" },
    lg: { padding: "13px 28px", fontSize: "16px" },
};

// ----------------------------------------------------------
// Componente
// ----------------------------------------------------------
const Button: React.FC<ButtonProps> = ({
                                           text,
                                           variant = "primary",   // valor por defecto definido aquí, no en la interfaz
                                           size = "md",
                                           disabled = false,
                                           loading = false,
                                           leftIcon,
                                           rightIcon,
                                           onClick,
                                       }) => {
    // Un botón en estado loading también debe estar deshabilitado
    const isDisabled = disabled || loading;

    const baseStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "8px",
        fontWeight: 600,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
        transition: "opacity 0.2s, transform 0.1s",
        fontFamily: "'Segoe UI', sans-serif",
        // Combinamos los estilos de variante y tamaño sobre el estilo base
        ...variantStyles[variant],
        ...sizeStyles[size],
    };

    return (
        <button
            style={baseStyle}
            disabled={isDisabled}
            onClick={onClick}
        >
            {/* Ícono izquierdo: solo se renderiza si se pasó la prop */}
            {leftIcon && <span style={{ display: "flex" }}>{leftIcon}</span>}

            {/* Spinner de carga: reemplaza el texto visualmente cuando loading=true */}
            {loading ? (
                <span style={spinnerStyle} />
            ) : (
                text
            )}

            {/* Ícono derecho */}
            {rightIcon && !loading && (
                <span style={{ display: "flex" }}>{rightIcon}</span>
            )}
        </button>
    );
};

// Spinner CSS puro — no necesita librería externa
const spinnerStyle: React.CSSProperties = {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
};

// Inyectamos el keyframe de la animación del spinner una sola vez
// (en proyectos reales esto va en un archivo CSS global)
const styleTag = document.createElement("style");
styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);

export default Button;