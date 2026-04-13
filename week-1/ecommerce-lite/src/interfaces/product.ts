// ============================================================
// Interfaz: Dimensions
// Describe las dimensiones físicas de un producto (opcionales)
// ============================================================
export interface Dimensions {
    width: number;   // ancho en cm
    height: number;  // alto en cm
    depth: number;   // profundidad en cm
}

// ============================================================
// Interfaz: Product
// Define la forma (shape) que debe tener todo objeto producto.
// Valida que no nos falte ningún campo obligatorio.
// ============================================================
export interface Product {
    sku: string;          // (Stock Keeping Unit)
    name: string;
    brand: string;
    quantity: number;
    price: number;
    isActive: boolean;
    category: string;
    imageUrl: string;
    createdAt: Date;

    // ? los hace opcionales
    description?: string;
    tags?: string[];
    dimensions?: Dimensions;
}