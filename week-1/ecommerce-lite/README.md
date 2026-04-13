# ecommerce-lite

Proyecto de práctica: sistema e-commerce con React y TypeScript.

## Requisitos previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- npm versión 9 o superior

Verifica tus versiones con:
```bash
node --version
npm --version
```

## Cómo crear un proyecto React con TypeScript desde cero

Estos son los pasos exactos para reproducir este proyecto:

**1. Crear el proyecto**
```bash
npx create-react-app ecommerce-lite --template typescript
cd ecommerce-lite
```
El flag `--template typescript` configura automáticamente tsconfig.json,
instala los tipos necesarios (@types/react, @types/node) y genera
los archivos con extensión .tsx en lugar de .jsx.

**2. Crear la estructura de carpetas**
```bash
mkdir src/interfaces src/components src/data
```

**3. Verificar que compila y arranca**
```bash
npm start
```
Abre http://localhost:3000 — deberías ver la pantalla de bienvenida de React.

**4. Reemplazar los archivos generados**

Elimina el contenido de `src/App.tsx` y `src/App.css` (o bórralos)
y crea los archivos del proyecto según la estructura descrita abajo.

**5. Instalar dependencias adicionales** (si las hay)
```bash
npm install
```

**6. Verificar que TypeScript no tiene errores**
```bash
npx tsc --noEmit
```
Si no muestra nada, el proyecto compila sin errores.

## Instalación de este proyecto (clonar y correr)

```bash
git clone <url-del-repositorio>
cd ecommerce-lite
npm install
npm start
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo en localhost:3000 |
| `npm run build` | Genera la versión de producción en /build |
| `npm test` | Ejecuta los tests |
| `npx tsc --noEmit` | Verifica tipos sin compilar |

## Estructura del proyecto

```
ecommerce-lite/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Componentes React reutilizables
│   │   ├── ProductCard.tsx  # Tarjeta individual de producto
│   │   ├── ProductList.tsx  # Grid de productos con .map()
│   │   ├── UserCard.tsx     # Tarjeta individual de usuario
│   │   └── UserList.tsx     # Lista de usuarios con .map()
│   ├── data/
│   │   └── data.ts          # Mock data: 15 productos, 5 usuarios
│   ├── interfaces/          # Contratos de datos (TypeScript)
│   │   ├── product.ts       # Interface Product, Dimensions
│   │   └── user.ts          # Interface User, Address, type UserRole
│   ├── App.tsx              # Componente raíz con navegación por pestañas
│   └── index.tsx            # Punto de entrada de la app
├── tsconfig.json            # Configuración de TypeScript
└── package.json
```

## Semana 1 — Lo que se implementó

- Proyecto React con TypeScript inicializado con CRA
- Interfaces `Product`, `User`, `Address`, `Dimensions` y tipo `UserRole`
- 15 productos y 5 usuarios mock tipados en `data.ts`
- Componentes `ProductCard` y `ProductList` con grid responsivo
- Componentes `UserCard` y `UserList` con avatar y badge de rol
- Navegación por pestañas con `useState<Tab>`
- Filtrado de productos inactivos con `.filter()`