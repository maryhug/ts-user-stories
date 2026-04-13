// ============================================================
// Contrato de props para el componente Badge.
// Un Badge es una etiqueta visual pequeña que comunica
// un estado o categoría de forma compacta.
// ============================================================

export interface BadgeProps {
    label: string;                                              // texto del badge
    status?: "success" | "warning" | "info" | "error" | "neutral"; // color semántico, default "neutral"
    icon?: React.ReactNode;                                     // ícono opcional antes del label
}