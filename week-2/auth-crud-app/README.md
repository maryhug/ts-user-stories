# auth-crud-app

Semana 2 — Autenticación, CRUD y decoradores con React + TypeScript.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y ejecución

```bash
npm install
npm start
```

Abre http://localhost:3000.

## Credenciales de prueba

| Email | Contraseña | Rol |
|---|---|---|
| ana@demo.com | 1234 | admin |
| carlos@demo.com | abcd | user |
| maria@demo.com | pass123 | seller (inactiva — no puede entrar) |

## Cómo probar cada funcionalidad

**Login:** Ingresa con las credenciales de la tabla. Si usas las de María (cuenta inactiva) verás el mensaje de error.

**CRUD:** Una vez dentro del dashboard podés buscar usuarios por nombre, activar/desactivar y eliminar. Para ver los logs simulados de HTTP abre la consola del navegador con F12.

**Decorador:** Crea un usuario nuevo desde el formulario del dashboard y revisa la consola — verás los mensajes del decorador `@withDefaults` antes y después del método `create`.

## Estructura

```
src/
├── components/       # (disponible para componentes reutilizables)
├── data/
│   └── users.ts      # Mock data de usuarios
├── interfaces/
│   └── User.ts       # Interface User y tipos relacionados
├── utils/
│   ├── auth.ts       # Función authenticate (login modular)
│   ├── UserStore.ts  # Clase CRUD con logs HTTP simulados
│   └── decorators.ts # Decorador @withDefaults
├── views/
│   ├── LoginView.tsx     # Vista de login con validación
│   └── DashboardView.tsx # Vista principal con tabla CRUD
└── App.tsx           # Enrutado condicional por estado de sesión
```