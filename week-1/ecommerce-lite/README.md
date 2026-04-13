# ecommerce-lite

Proyecto de práctica: sistema e-commerce con React y TypeScript.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
src/
├── components/       # Componentes React reutilizables
│   ├── ProductCard.tsx
│   └── ProductList.tsx
├── data/             # Datos mock centralizados
│   └── data.ts
├── interfaces/       # Interfaces TypeScript (contratos de datos)
│   ├── product.ts
│   └── user.ts
└── App.tsx           # Componente raíz
```

## Semana 1 — Lo que se implementó

- Proyecto React con TypeScript creado con CRA
- Interfaces `Product`, `User`, `Address`, `Dimensions`
- 15 productos y 5 usuarios mock en `data.ts`
- Componente `ProductCard` con props tipadas
- Componente `ProductList` con grid responsivo usando `.map()`