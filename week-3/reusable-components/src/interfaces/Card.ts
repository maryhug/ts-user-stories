// ============================================================
// Contrato de props para el componente Card.
// La Card es el componente "contenedor" que integra
// Badge (estado) y Button (acción) en una unidad visual.
// ============================================================

export interface CardProps {
    // --- Obligatorias ---
    title: string;                        // título principal de la card
    type: "green" | "white" | "black";    // tema visual de la card

    // --- Opcionales ---
    subtitle?: string;                    // subtítulo o descripción corta
    imageUrl?: string;                    // imagen de cabecera
    footer?: React.ReactNode;             // zona inferior: pensada para Button(s)
    badges?: React.ReactNode;             // zona de badges: estados y categorías
}