// ============================================================
// page.tsx — /dashboard/properties
// Vista principal para gestionar propiedades.
// Usa los servicios de Axios para conectarse a la API.
//
// NOTA: "use client" es necesario porque usamos useState y
// useEffect. En Next.js App Router los componentes son Server
// Components por defecto; "use client" los convierte en
// Client Components que pueden usar hooks de React.
// ============================================================

"use client";

import React, { useEffect, useState } from "react";
import {
    getProperties,
    postProperty,
    updateProperty,
    deleteProperty,
} from "@/services/properties";
import { IProperty } from "@/database/models/Property";

// ----------------------------------------------------------
// Estado inicial del formulario — lo reutilizamos para
// resetear después de crear o para cargar datos al editar
// ----------------------------------------------------------
const emptyForm = { name: "", value: "", img: "" };

export default function PropertiesPage() {
    // Lista de propiedades cargadas desde la API
    const [properties, setProperties] = useState<IProperty[]>([]);

    // Campos del formulario como strings (el input siempre maneja strings)
    const [form, setForm] = useState(emptyForm);

    // ID de la propiedad que se está editando (null = modo creación)
    const [editingId, setEditingId] = useState<string | null>(null);

    // Estado de carga y mensajes de feedback
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

    // ----------------------------------------------------------
    // Carga inicial: traemos las propiedades al montar el componente
    // useEffect con array vacío [] = se ejecuta solo una vez
    // ----------------------------------------------------------
    useEffect(() => {
        fetchProperties();
    }, []);

    // Obtiene las propiedades desde la API y actualiza el estado
    const fetchProperties = async () => {
        try {
            const data = await getProperties();
            setProperties(data);
        } catch (error) {
            showFeedback("Error al cargar las propiedades", false);
        }
    };

    // Muestra un mensaje de feedback y lo oculta después de 3 segundos
    const showFeedback = (msg: string, ok: boolean) => {
        setFeedback({ msg, ok });
        setTimeout(() => setFeedback(null), 3000);
    };

    // Sincroniza el estado del formulario con cada cambio en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ----------------------------------------------------------
    // handleSubmit — decide si crea o actualiza según editingId
    // ----------------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica en el cliente
        if (!form.name.trim() || !form.value) {
            showFeedback("Nombre y valor son obligatorios", false);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: form.name.trim(),
                value: Number(form.value),  // convertimos string a number para la API
                img: form.img.trim(),
            };

            if (editingId) {
                // Modo edición: llamamos a updateProperty con el id y los cambios
                await updateProperty(editingId, payload as any);
                showFeedback("Propiedad actualizada correctamente ✓", true);
                setEditingId(null);
            } else {
                // Modo creación: llamamos a postProperty con los datos del form
                await postProperty(payload as any);
                showFeedback("Propiedad creada correctamente ✓", true);
            }

            setForm(emptyForm);
            await fetchProperties(); // refrescamos la lista
        } catch (error) {
            showFeedback("Error al guardar la propiedad", false);
        } finally {
            setLoading(false);
        }
    };

    // ----------------------------------------------------------
    // handleEdit — carga los datos de la propiedad en el formulario
    // ----------------------------------------------------------
    const handleEdit = (property: IProperty) => {
        setEditingId(property._id ? String(property._id) : null);
        setForm({
            name: property.name,
            value: String(property.value),  // convertimos number a string para el input
            img: property.img ?? "",
        });
        // Hacemos scroll hacia el formulario para que el usuario lo vea
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Cancela la edición y resetea el formulario
    const handleCancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    // ----------------------------------------------------------
    // handleDelete — elimina la propiedad tras confirmación
    // ----------------------------------------------------------
    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de eliminar esta propiedad?")) return;

        try {
            await deleteProperty(id);
            showFeedback("Propiedad eliminada ✓", true);
            await fetchProperties();
        } catch (error) {
            showFeedback("Error al eliminar la propiedad", false);
        }
    };

    // ----------------------------------------------------------
    // Render
    // ----------------------------------------------------------
    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>🏠 Gestión de Propiedades</h1>
                <p style={styles.headerSub}>CRUD conectado a MongoDB con Mongoose y Axios</p>
            </header>

            <main style={styles.main}>
                {/* Mensaje de feedback */}
                {feedback && (
                    <div
                        style={{
                            ...styles.feedback,
                            backgroundColor: feedback.ok ? "#d4edda" : "#f8d7da",
                            color: feedback.ok ? "#155724" : "#721c24",
                        }}
                    >
                        {feedback.msg}
                    </div>
                )}

                {/* ---- Formulario de creación / edición ---- */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        {editingId ? "✏️ Editar propiedad" : "➕ Nueva propiedad"}
                    </h2>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formRow}>
                            {/* Campo: nombre */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Nombre *</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ej: Apartamento Centro"
                                    style={styles.input}
                                />
                            </div>

                            {/* Campo: valor */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Valor (USD) *</label>
                                <input
                                    name="value"
                                    type="number"
                                    value={form.value}
                                    onChange={handleChange}
                                    placeholder="Ej: 250000"
                                    style={styles.input}
                                    min="0"
                                />
                            </div>

                            {/* Campo: imagen */}
                            <div style={{ ...styles.fieldGroup, flex: 2 }}>
                                <label style={styles.label}>URL de imagen (opcional)</label>
                                <input
                                    name="img"
                                    value={form.img}
                                    onChange={handleChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        {/* Botones del formulario */}
                        <div style={styles.formActions}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ ...styles.btn, ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? "Guardando..." : editingId ? "Actualizar" : "Crear propiedad"}
                            </button>

                            {/* Botón cancelar solo visible en modo edición */}
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    style={{ ...styles.btn, ...styles.btnSecondary }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* ---- Listado de propiedades ---- */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        📋 Propiedades registradas
                        <span style={styles.count}>{properties.length}</span>
                    </h2>

                    {properties.length === 0 ? (
                        <p style={styles.emptyMsg}>
                            No hay propiedades aún. Crea una usando el formulario de arriba.
                        </p>
                    ) : (
                        <div style={styles.grid}>
                            {properties.map((property) => (
                                <div key={String(property._id)} style={styles.propertyCard}>
                                    {/* Imagen de la propiedad */}
                                    {property.img ? (
                                        <img
                                            src={property.img}
                                            alt={property.name}
                                            style={styles.propertyImg}
                                            onError={(e) => {
                                                // Si la imagen falla, ocultamos el elemento
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <div style={styles.imgPlaceholder}>🏠</div>
                                    )}

                                    {/* Info de la propiedad */}
                                    <div style={styles.propertyInfo}>
                                        <h3 style={styles.propertyName}>{property.name}</h3>
                                        <p style={styles.propertyValue}>
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 0,
                                            }).format(property.value)}
                                        </p>
                                        {property.createdAt && (
                                            <p style={styles.propertyDate}>
                                                {new Date(property.createdAt).toLocaleDateString("es-CO")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Acciones */}
                                    <div style={styles.propertyActions}>
                                        <button
                                            onClick={() => handleEdit(property)}
                                            style={{ ...styles.btn, ...styles.btnEdit }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(String(property._id!))}
                                            style={{ ...styles.btn, ...styles.btnDanger }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

// ----------------------------------------------------------
// Estilos
// ----------------------------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
    page: { minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "'Segoe UI', sans-serif" },
    header: { backgroundColor: "#0d6efd", color: "#fff", padding: "28px 40px" },
    headerTitle: { margin: 0, fontSize: "24px", fontWeight: 700 },
    headerSub: { margin: "4px 0 0", fontSize: "13px", opacity: 0.8 },
    main: { maxWidth: "1100px", margin: "0 auto", padding: "32px 20px", display: "flex", flexDirection: "column", gap: "24px" },
    feedback: { padding: "12px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 500 },
    card: { backgroundColor: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" },
    cardTitle: { margin: "0 0 20px", fontSize: "17px", fontWeight: 700, color: "#212529", display: "flex", alignItems: "center", gap: "10px" },
    form: { display: "flex", flexDirection: "column", gap: "16px" },
    formRow: { display: "flex", gap: "14px", flexWrap: "wrap" },
    fieldGroup: { display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "180px" },
    label: { fontSize: "12px", fontWeight: 600, color: "#495057" },
    input: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #ced4da", fontSize: "14px", outline: "none", fontFamily: "inherit" },
    formActions: { display: "flex", gap: "10px" },
    btn: { padding: "9px 20px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
    btnPrimary: { backgroundColor: "#0d6efd", color: "#fff" },
    btnSecondary: { backgroundColor: "#e9ecef", color: "#495057" },
    btnEdit: { backgroundColor: "#ffc107", color: "#212529" },
    btnDanger: { backgroundColor: "#dc3545", color: "#fff" },
    count: { backgroundColor: "#e9ecef", color: "#495057", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 },
    emptyMsg: { color: "#6c757d", fontSize: "14px", textAlign: "center", padding: "32px 0" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" },
    propertyCard: { border: "1px solid #e9ecef", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" },
    propertyImg: { width: "100%", height: "160px", objectFit: "cover" },
    imgPlaceholder: { height: "120px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", backgroundColor: "#f8f9fa" },
    propertyInfo: { padding: "14px", flex: 1 },
    propertyName: { margin: "0 0 6px", fontSize: "15px", fontWeight: 700, color: "#212529" },
    propertyValue: { margin: "0 0 4px", fontSize: "18px", fontWeight: 700, color: "#0d6efd" },
    propertyDate: { margin: 0, fontSize: "11px", color: "#adb5bd" },
    propertyActions: { padding: "10px 14px", display: "flex", gap: "8px", borderTop: "1px solid #f0f0f0" },
};
