// ============================================================
// Vista principal post-login. Aquí el usuario autenticado
// puede ver, crear, editar y eliminar usuarios usando UserStore.
// ============================================================

import React, { useState } from "react";
import { User } from "../interfaces/User";
import { UserStore } from "../utils/UserStore";

interface DashboardViewProps {
    currentUser: User;              // usuario que inició sesión
    onLogout: () => void;           // callback para cerrar sesión
}

// Creamos UNA sola instancia de UserStore para toda la vista
const store = new UserStore();

const DashboardView: React.FC<DashboardViewProps> = ({ currentUser, onLogout }) => {
    const [users, setUsers] = useState<User[]>(store.list());
    const [search, setSearch] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [newName, setNewName] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");

    // Refresca el listado desde el store
    const refresh = () => setUsers(store.list());

    const handleSearch = () => {
        if (search.trim()) {
            setUsers(store.findByName(search));
        } else {
            refresh();
        }
    };

    const handleCreate = () => {
        if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
            setFeedback("Completa todos los campos para crear un usuario.");
            return;
        }

        store.create({
            fullName: newName,
            email: newEmail,
            password: newPassword,
            isActive: true,
        });

        setFeedback("Usuario creado correctamente. Revisa la consola para ver los logs.");
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        refresh();
    };

    const handleRemove = (id: number) => {
        store.remove(id);
        setFeedback(`Usuario ${id} eliminado.`);
        refresh();
    };

    const handleToggleActive = (user: User) => {
        store.update(user.id, { isActive: !user.isActive });
        setFeedback(`Usuario ${user.id} actualizado.`);
        refresh();
    };

    return (
        <div style={styles.wrapper}>
            {/* Header con saludo y botón de logout */}
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Panel de usuarios</h1>
                    <p style={styles.subtitle}>
                        Sesión: <strong>{currentUser.fullName}</strong> ({currentUser.role})
                    </p>
                </div>
                <button onClick={onLogout} style={styles.logoutBtn}>
                    Cerrar sesión
                </button>
            </header>

            <div style={styles.content}>
                {/* Feedback */}
                {feedback && (
                    <p style={styles.feedback} onClick={() => setFeedback("")}>
                        {feedback} <span style={{ fontSize: 11 }}>(clic para cerrar)</span>
                    </p>
                )}

                {/* Buscador */}
                <div style={styles.row}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre..."
                        style={styles.input}
                    />
                    <button onClick={handleSearch} style={styles.btnPrimary}>Buscar</button>
                    <button onClick={refresh} style={styles.btnSecondary}>Ver todos</button>
                </div>

                {/* Tabla de usuarios */}
                <table style={styles.table}>
                    <thead>
                    <tr>
                        {["ID", "Nombre", "Email", "Rol", "Estado", "Acciones"].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td style={styles.td}>{u.id}</td>
                            <td style={styles.td}>{u.fullName}</td>
                            <td style={styles.td}>{u.email}</td>
                            <td style={styles.td}>
                  <span style={{
                      ...styles.badge,
                      backgroundColor:
                          u.role === "admin" ? "#fff3cd" :
                              u.role === "seller" ? "#cff4fc" : "#e2e3e5",
                  }}>
                    {u.role}
                  </span>
                            </td>
                            <td style={styles.td}>
                  <span style={{
                      ...styles.badge,
                      backgroundColor: u.isActive ? "#d4edda" : "#f8d7da",
                  }}>
                    {u.isActive ? "Activo" : "Inactivo"}
                  </span>
                            </td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => handleToggleActive(u)}
                                    style={styles.btnSmall}
                                >
                                    {u.isActive ? "Desactivar" : "Activar"}
                                </button>
                                <button
                                    onClick={() => handleRemove(u.id)}
                                    style={{ ...styles.btnSmall, backgroundColor: "#dc3545", color: "#fff" }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Formulario de creación */}
                <div style={styles.createBox}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>Crear nuevo usuario</h3>
                    <div style={styles.row}>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Nombre completo"
                            style={styles.input}
                        />
                        <input
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Email"
                            style={styles.input}
                        />
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Contraseña"
                            type="password"
                            style={styles.input}
                        />
                        <button onClick={handleCreate} style={styles.btnPrimary}>
                            Crear
                        </button>
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6c757d" }}>
                        💡 Abre la consola del navegador (F12) para ver los logs del decorador y UserStore.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: { minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "'Segoe UI', sans-serif" },
    header: { backgroundColor: "#0d6efd", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    title: { margin: 0, fontSize: 22, fontWeight: 700 },
    subtitle: { margin: "4px 0 0", fontSize: 13, opacity: 0.85 },
    logoutBtn: { padding: "8px 18px", backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 8, cursor: "pointer", fontSize: 13 },
    content: { maxWidth: 1000, margin: "0 auto", padding: "32px 20px" },
    feedback: { backgroundColor: "#fff3cd", color: "#856404", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 13, cursor: "pointer" },
    row: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
    input: { flex: 1, minWidth: 160, padding: "9px 12px", borderRadius: 8, border: "1px solid #ced4da", fontSize: 13 },
    btnPrimary: { padding: "9px 20px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
    btnSecondary: { padding: "9px 20px", backgroundColor: "#e9ecef", color: "#495057", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 },
    btnSmall: { padding: "4px 10px", backgroundColor: "#e9ecef", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, marginRight: 4 },
    table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 28 },
    th: { textAlign: "left", padding: "12px 16px", backgroundColor: "#f1f3f5", fontSize: 12, fontWeight: 700, color: "#495057", borderBottom: "1px solid #dee2e6" },
    td: { padding: "11px 16px", fontSize: 13, color: "#212529", borderBottom: "1px solid #f1f3f5" },
    badge: { display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 },
    createBox: { backgroundColor: "#fff", padding: "24px", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
};

export default DashboardView;