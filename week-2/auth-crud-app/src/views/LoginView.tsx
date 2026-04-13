// ============================================================
// LoginView.tsx
// Vista de login. Gestiona el formulario, llama a authenticate
// y notifica al padre si el login fue exitoso.
//
// Recibe onLoginSuccess como prop para que App.tsx pueda
// cambiar la vista sin que LoginView sepa nada del router.
// ============================================================

import React, { useState } from "react";
import { authenticate } from "../utils/auth";
import { User } from "../interfaces/User";

// Props del componente: callback que se llama con el usuario autenticado
interface LoginViewProps {
    onLoginSuccess: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    // Estado del formulario
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Mensaje de feedback (éxito o error)
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        // Evita que el formulario recargue la página (comportamiento default del browser)
        e.preventDefault();

        // Validación básica: campos vacíos
        if (!email.trim() || !password.trim()) {
            setMessage("Por favor completa todos los campos.");
            setIsError(true);
            return;
        }

        // Llamamos al módulo de autenticación
        const user = authenticate(email, password);

        if (user) {
            setMessage(`Bienvenido, ${user.fullName} ✓`);
            setIsError(false);

            // Pequeño delay para que el usuario vea el mensaje antes de redirigir
            setTimeout(() => onLoginSuccess(user), 800);
        } else {
            setMessage("Credenciales incorrectas o cuenta inactiva.");
            setIsError(true);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Iniciar sesión</h2>
                <p style={styles.hint}>
                    Demo: <code>ana@demo.com</code> / <code>1234</code>
                </p>

                {/* React.FormEvent tipado — necesitamos e.preventDefault() */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@demo.com"
                        style={styles.input}
                    />

                    <label style={styles.label}>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Entrar
                    </button>
                </form>

                {/* Mensaje condicional: solo se renderiza si hay texto */}
                {message && (
                    <p
                        style={{
                            ...styles.message,
                            backgroundColor: isError ? "#f8d7da" : "#d4edda",
                            color: isError ? "#721c24" : "#155724",
                        }}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        margin: "0 0 8px",
        fontSize: "24px",
        fontWeight: 700,
        color: "#212529",
    },
    hint: {
        margin: "0 0 24px",
        fontSize: "13px",
        color: "#6c757d",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    label: {
        fontSize: "13px",
        fontWeight: 600,
        color: "#495057",
    },
    input: {
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #ced4da",
        fontSize: "14px",
        outline: "none",
    },
    button: {
        marginTop: "8px",
        padding: "12px",
        backgroundColor: "#0d6efd",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
    },
    message: {
        marginTop: "16px",
        padding: "12px",
        borderRadius: "8px",
        fontSize: "14px",
        textAlign: "center",
    },
};

export default LoginView;