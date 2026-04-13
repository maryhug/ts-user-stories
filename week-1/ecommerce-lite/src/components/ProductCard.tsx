// ============================================================
// Componente que renderiza la tarjeta de un producto individual.
// Recibe un producto como prop y muestra sus datos principales.
// ============================================================

import React from "react";
import { Product } from "../interfaces/product";

// ============================================================
// ProductCardProps: interfaz de las props del componente.
// Al tipar las props con una interfaz, TypeScript nos avisa
// si olvidamos pasar algún dato obligatorio al usar el componente.
// ============================================================
interface ProductCardProps {
    product: Product; // el producto a mostrar
}

// Componente funcional con props tipadas
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Formatear el precio como moneda USD
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(product.price);

    return (
        <div style={styles.card}>
            {/* Imagen del producto */}
            <img
                src={product.imageUrl}
                alt={product.name}
                style={styles.image}
            />

            {/* Contenido de la tarjeta */}
            <div style={styles.content}>
                {/* Categoría como etiqueta pequeña */}
                <span style={styles.category}>{product.category}</span>

                {/* Nombre del producto */}
                <h3 style={styles.name}>{product.name}</h3>

                {/* Marca */}
                <p style={styles.brand}>{product.brand}</p>

                {/* Precio */}
                <p style={styles.price}>{formattedPrice}</p>

                {/* Indicador de stock */}
                <p style={styles.stock}>
                    {product.quantity > 0
                        ? `${product.quantity} en stock`
                        : "Sin stock"}
                </p>

                {/* Badge de estado activo/inactivo */}
                <span
                    style={{
                        ...styles.badge,
                        backgroundColor: product.isActive ? "#d4edda" : "#f8d7da",
                        color: product.isActive ? "#155724" : "#721c24",
                    }}
                >
          {product.isActive ? "Activo" : "Inactivo"}
        </span>
            </div>
        </div>
    );
};

// ============================================================
// Estilos inline (sin CSS externo para mantener todo junto).
// ============================================================
const styles: { [key: string]: React.CSSProperties } = {
    card: {
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
    },
    content: {
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    category: {
        fontSize: "11px",
        textTransform: "uppercase",
        color: "#6c757d",
        letterSpacing: "0.05em",
        fontWeight: 600,
    },
    name: {
        margin: 0,
        fontSize: "15px",
        fontWeight: 600,
        color: "#212529",
        lineHeight: 1.3,
    },
    brand: {
        margin: 0,
        fontSize: "13px",
        color: "#6c757d",
    },
    price: {
        margin: 0,
        fontSize: "20px",
        fontWeight: 700,
        color: "#0d6efd",
    },
    stock: {
        margin: 0,
        fontSize: "12px",
        color: "#495057",
    },
    badge: {
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 600,
        alignSelf: "flex-start",
    },
};

export default ProductCard;