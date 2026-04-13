// ============================================================
// Contrato de props para el componente Button.
// Separar las interfaces en su propia carpeta permite
// importarlas desde cualquier componente sin acoplamiento.
// ============================================================

export interface ButtonProps {
    text: string;

    // --- Opcionales con valores por defecto ---
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";

    // --- Opcionales sin default ---
    disabled?: boolean;                        // deshabilita el botón
    loading?: boolean;                         // muestra spinner y bloquea clics
    leftIcon?: React.ReactNode;               // ícono a la izquierda del texto
    rightIcon?: React.ReactNode;              // ícono a la derecha del texto
    onClick?: () => void;                     // manejador de clic
}