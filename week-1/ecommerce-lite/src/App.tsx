// ============================================================
// Componente raíz de la aplicación.
// Importa los datos mock y los pasa al componente de listado.
// ============================================================

import React from "react";
import { products } from "./data/data";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  return (
      <div style={styles.app}>
        {/* Header de la tienda */}
        <header style={styles.header}>
          <h1 style={styles.logo}>🛒 ecommerce-lite</h1>
          <p style={styles.subtitle}>Tu tienda TypeScript</p>
        </header>

        {/* Contenido principal */}
        <main style={styles.main}>
          {/* Pasamos los productos como prop; TypeScript verifica el tipo */}
          <ProductList products={products} />
        </main>
      </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    backgroundColor: "#0d6efd",
    color: "#ffffff",
    padding: "24px 40px",
  },
  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "14px",
    opacity: 0.8,
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
};

export default App;