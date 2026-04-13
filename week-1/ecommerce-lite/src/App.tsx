// ============================================================
// Muestra productos y usuarios en dos
// secciones separadas, navegables con pestañas simples.
// ============================================================

import React, { useState } from "react";
import { products } from "./data/data";
import { users } from "./data/data";
import ProductList from "./components/ProductList";
import UserList from "./components/UserList";

// Tipo para controlar qué pestaña está activa
type Tab = "products" | "users";

const App: React.FC = () => {
  // useState con tipo explícito: solo acepta valores del tipo Tab
  const [activeTab, setActiveTab] = useState<Tab>("products");

  return (
      <div style={styles.app}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.logo}>🛒 ecommerce-lite</h1>
          <p style={styles.subtitle}>Tu tienda TypeScript</p>
        </header>

        {/* Navegación por pestañas */}
        <nav style={styles.nav}>
          <button
              style={{
                ...styles.tab,
                ...(activeTab === "products" ? styles.tabActive : {}),
              }}
              onClick={() => setActiveTab("products")}
          >
            Productos ({products.filter((p) => p.isActive).length})
          </button>
          <button
              style={{
                ...styles.tab,
                ...(activeTab === "users" ? styles.tabActive : {}),
              }}
              onClick={() => setActiveTab("users")}
          >
            Usuarios ({users.length})
          </button>
        </nav>

        {/* Contenido según pestaña activa */}
        <main style={styles.main}>
          {activeTab === "products" && (
              <ProductList products={products} />
          )}
          {activeTab === "users" && (
              <UserList users={users} />
          )}
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
  nav: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #dee2e6",
    padding: "0 40px",
    display: "flex",
    gap: "4px",
  },
  tab: {
    padding: "14px 20px",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    fontWeight: 500,
    color: "#6c757d",
    cursor: "pointer",
    borderBottom: "3px solid transparent",
    transition: "all 0.2s",
  },
  tabActive: {
    color: "#0d6efd",
    borderBottom: "3px solid #0d6efd",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
};

export default App;