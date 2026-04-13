// ============================================================
// Componente contenedor que renderiza la lista completa de
// productos usando .map() para iterar el arreglo.
// ============================================================

import React from "react";
import { Product } from "../interfaces/product";
import ProductCard from "./ProductCard";

// Props del componente: recibe el arreglo de productos
interface ProductListProps {
    products: Product[]; // arreglo tipado: solo acepta objetos Product
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    // Filtramos solo los productos activos para el listado principal
    const activeProducts = products.filter((p) => p.isActive);

    return (
        <div>
            {/* Encabezado del listado con contador */}
            <div style={styles.header}>
                <h2 style={styles.title}>Productos disponibles</h2>
                <span style={styles.count}>{activeProducts.length} productos</span>
            </div>

            {/* Grid de tarjetas — .map() convierte cada Product en un ProductCard */}
            <div style={styles.grid}>
                {activeProducts.map((product) => (
                    // key es obligatorio en listas: React lo usa para
                    // identificar qué elementos cambiaron en re-renders
                    <ProductCard key={product.sku} product={product} />
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
    grid: {
        display: "grid",
        // auto-fill: crea tantas columnas como quepan; mínimo 240px
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px",
    },
};

export default ProductList;