// ============================================================
// Controla qué vista se muestra según si hay sesión activa.
// Usa useState para guardar el usuario autenticado.
// Si currentUser es null → mostramos LoginView
// Si currentUser tiene datos → mostramos DashboardView
// ============================================================

import React, { useState } from "react";
import { User } from "./interfaces/User";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";

const App: React.FC = () => {
  // null significa "no hay sesión activa"
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Renderizado condicional: una sola expresión decide qué vista mostrar
  return currentUser ? (
      <DashboardView currentUser={currentUser} onLogout={handleLogout} />
  ) : (
      <LoginView onLoginSuccess={handleLogin} />
  );
};

export default App;