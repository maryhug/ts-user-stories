// ============================================================
// Página de demostración que muestra un listado de Cards,
// cada una con al menos un Badge y un Button integrados.
// Sirve como referencia visual de todos los casos de uso
// posibles de los tres componentes.
// ============================================================

import React, { useState } from "react";
import Card from "./components/Card";
import Badge from "./components/Badge";
import Button from "./components/Button";

// ----------------------------------------------------------
// Datos de ejemplo para las cards.
// Tipamos el array explícitamente para que TypeScript detecte
// errores si algún objeto no cumple con la forma esperada.
// ----------------------------------------------------------
interface CardData {
    id: number;
    title: string;
    subtitle: string;
    type: "green" | "white" | "black";
    imageUrl?: string;
    badgeLabel: string;
    badgeStatus: "success" | "warning" | "info" | "error" | "neutral";
    badgeIcon: string;
    buttonText: string;
    buttonVariant: "primary" | "secondary" | "danger";
}

const cardData: CardData[] = [
    {
        id: 1,
        title: "Laptop UltraBook Pro",
        subtitle: "Procesador i9, 32GB RAM, SSD 1TB. Perfecta para desarrollo.",
        type: "white",
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        badgeLabel: "En stock",
        badgeStatus: "success",
        badgeIcon: "✓",
        buttonText: "Agregar al carrito",
        buttonVariant: "primary",
    },
    {
        id: 2,
        title: "Auriculares SoundWave X700",
        subtitle: "Cancelación de ruido activa. 30 horas de batería.",
        type: "green",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        badgeLabel: "Últimas unidades",
        badgeStatus: "warning",
        badgeIcon: "⚠",
        buttonText: "Ver detalles",
        buttonVariant: "secondary",
    },
    {
        id: 3,
        title: "Smartwatch Series 8",
        subtitle: "GPS, monitor cardíaco y resistente al agua hasta 50m.",
        type: "black",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        badgeLabel: "Sin stock",
        badgeStatus: "error",
        badgeIcon: "✕",
        buttonText: "Notificarme",
        buttonVariant: "danger",
    },
    {
        id: 4,
        title: "Cafetera Espresso Pro",
        subtitle: "15 bares de presión. Molinillo integrado. Pantalla táctil.",
        type: "white",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        badgeLabel: "Nuevo",
        badgeStatus: "info",
        badgeIcon: "★",
        buttonText: "Comprar ahora",
        buttonVariant: "primary",
    },
    {
        id: 5,
        title: "Bicicleta Trail King 29\"",
        subtitle: "Marco de aluminio. 21 velocidades. Frenos de disco hidráulicos.",
        type: "green",
        imageUrl: "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        badgeLabel: "Disponible",
        badgeStatus: "success",
        badgeIcon: "✓",
        buttonText: "Ver detalles",
        buttonVariant: "secondary",
    },
    {
        id: 6,
        title: "Clean Code — Libro",
        subtitle: "Robert C. Martin. La guía esencial para código mantenible.",
        type: "black",
        badgeLabel: "Digital",
        badgeStatus: "neutral",
        badgeIcon: "📖",
        buttonText: "Descargar",
        buttonVariant: "primary",
    },
];

const App: React.FC = () => {
    // Guardamos qué card tiene loading activo para simular una acción async
    const [loadingId, setLoadingId] = useState<number | null>(null);

    // Simula una acción asíncrona de 1.5s al hacer clic en el botón
    const handleAction = (id: number) => {
        setLoadingId(id);
        setTimeout(() => setLoadingId(null), 1500);
    };

    return (
        <div style={styles.app}>
            {/* Encabezado de la página */}
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>🧩 Componentes reutilizables</h1>
                <p style={styles.headerSub}>
                    Galería de <code>Card</code>, <code>Badge</code> y <code>Button</code> con TypeScript
                </p>
            </header>

            <main style={styles.main}>
                {/* Sección: variantes de Button */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Button — variantes y tamaños</h2>
                    <div style={styles.row}>
                        <Button text="Primary" variant="primary" />
                        <Button text="Secondary" variant="secondary" />
                        <Button text="Danger" variant="danger" />
                        <Button text="Small" size="sm" />
                        <Button text="Large" size="lg" />
                        <Button text="Deshabilitado" disabled />
                        <Button text="Cargando" loading />
                        <Button text="Con íconos" leftIcon="👈" rightIcon="👉" variant="secondary" />
                    </div>
                </section>

                {/* Sección: variantes de Badge */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Badge — estados</h2>
                    <div style={styles.row}>
                        <Badge label="Success" status="success" icon="✓" />
                        <Badge label="Warning" status="warning" icon="⚠" />
                        <Badge label="Info"    status="info"    icon="ℹ" />
                        <Badge label="Error"   status="error"   icon="✕" />
                        <Badge label="Neutral" status="neutral" />
                    </div>
                </section>

                {/* Sección: galería de Cards */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Card — galería de productos</h2>
                    <div style={styles.grid}>
                        {cardData.map((item) => (
                            <Card
                                key={item.id}
                                title={item.title}
                                subtitle={item.subtitle}
                                type={item.type}
                                imageUrl={item.imageUrl}
                                // Pasamos el Badge como ReactNode a la prop badges
                                badges={
                                    <Badge
                                        label={item.badgeLabel}
                                        status={item.badgeStatus}
                                        icon={item.badgeIcon}
                                    />
                                }
                                // Pasamos el Button como ReactNode a la prop footer
                                footer={
                                    <Button
                                        text={item.buttonText}
                                        variant={item.buttonVariant}
                                        size="sm"
                                        loading={loadingId === item.id}
                                        onClick={() => handleAction(item.id)}
                                    />
                                }
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    app: {
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        fontFamily: "'Segoe UI', sans-serif",
    },
    header: {
        backgroundColor: "#0d6efd",
        color: "#ffffff",
        padding: "32px 40px",
    },
    headerTitle: {
        margin: 0,
        fontSize: "26px",
        fontWeight: 700,
    },
    headerSub: {
        margin: "6px 0 0",
        fontSize: "14px",
        opacity: 0.85,
    },
    main: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
    },
    section: {
        marginBottom: "48px",
    },
    sectionTitle: {
        margin: "0 0 20px",
        fontSize: "18px",
        fontWeight: 700,
        color: "#212529",
        borderLeft: "4px solid #0d6efd",
        paddingLeft: "12px",
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
    },
};

export default App;