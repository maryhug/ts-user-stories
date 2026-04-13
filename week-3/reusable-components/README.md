# reusable-components

Semana 3 — Componentes UI reutilizables con React + TypeScript:
`Button`, `Badge` y `Card` con props tipadas y temas visuales.

---

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y ejecución

```bash
npm install
npm start
```

Abre http://localhost:3000 para ver la galería de componentes.

---

## Cómo crear este proyecto desde cero

```bash
npx create-react-app reusable-components --template typescript
cd reusable-components
mkdir src/components src/interfaces
npm start
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Button.tsx   # Botón con variantes, tamaños, loading e íconos
│   ├── Badge.tsx    # Etiqueta de estado con colores semánticos
│   └── Card.tsx     # Contenedor con tema de color, badges y footer
├── interfaces/
│   ├── Button.ts    # ButtonProps
│   ├── Badge.ts     # BadgeProps
│   └── Card.ts      # CardProps
└── App.tsx          # Galería de demostración
```

---

## Referencia de componentes

### Button

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `text` | `string` | — | **Obligatorio.** Texto del botón |
| `variant` | `"primary" \| "secondary" \| "danger"` | `"primary"` | Estilo visual |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del botón |
| `disabled` | `boolean` | `false` | Deshabilita el botón |
| `loading` | `boolean` | `false` | Muestra spinner y bloquea clics |
| `leftIcon` | `React.ReactNode` | — | Ícono a la izquierda |
| `rightIcon` | `React.ReactNode` | — | Ícono a la derecha |
| `onClick` | `() => void` | — | Manejador de clic |

```tsx
// Ejemplos de uso
<Button text="Guardar" />
<Button text="Eliminar" variant="danger" size="sm" />
<Button text="Procesando" loading />
<Button text="Exportar" leftIcon="📤" variant="secondary" />
```

---

### Badge

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | **Obligatorio.** Texto del badge |
| `status` | `"success" \| "warning" \| "info" \| "error" \| "neutral"` | `"neutral"` | Color semántico |
| `icon` | `React.ReactNode` | — | Ícono antes del label |

```tsx
// Ejemplos de uso
<Badge label="Activo" status="success" icon="✓" />
<Badge label="Pendiente" status="warning" icon="⚠" />
<Badge label="Sin stock" status="error" />
```

---

### Card

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `title` | `string` | — | **Obligatorio.** Título de la card |
| `type` | `"green" \| "white" \| "black"` | — | **Obligatorio.** Tema visual |
| `subtitle` | `string` | — | Texto secundario |
| `imageUrl` | `string` | — | URL de imagen de cabecera |
| `badges` | `React.ReactNode` | — | Zona de badges (estados/categorías) |
| `footer` | `React.ReactNode` | — | Zona inferior (botones de acción) |

```tsx
// Ejemplo de uso completo
<Card
  title="Producto X"
  type="white"
  subtitle="Descripción breve del producto"
  imageUrl="https://ejemplo.com/imagen.jpg"
  badges={<Badge label="Nuevo" status="info" icon="★" />}
  footer={<Button text="Comprar" variant="primary" size="sm" />}
/>
```

---

## Cómo extender los componentes

**Agregar una variante nueva a Button** — en `interfaces/Button.ts` agrega el nuevo valor al union type y en `Button.tsx` agrega su entrada en `variantStyles`:

```typescript
// interfaces/Button.ts
variant?: "primary" | "secondary" | "danger" | "ghost"; // nuevo: ghost

// components/Button.tsx
ghost: {
  backgroundColor: "transparent",
  color: "#0d6efd",
  border: "1px solid transparent",
},
```

**Agregar un tema nuevo a Card** — mismo patrón: nuevo valor en el union type de `CardProps["type"]` y nueva entrada en `typeThemes`.

---

## Conceptos clave de TypeScript usados

| Concepto | Dónde se usa | Para qué sirve |
|---|---|---|
| `interface` | Todas las interfaces | Define el contrato de props |
| Union types `"a" \| "b"` | `variant`, `size`, `status`, `type` | Limita los valores válidos |
| `React.ReactNode` | `leftIcon`, `badges`, `footer` | Acepta cualquier contenido JSX |
| `NonNullable<T>` | Mapas de estilos en Button y Badge | Elimina `undefined` del tipo para usarlo como key |
| `Record<K, V>` | `variantStyles`, `sizeStyles`, `typeThemes` | Tipado de objetos con claves conocidas |
| Props opcionales `?` | Mayoría de props | El componente funciona sin ellas |
| Valores por defecto | `variant = "primary"`, `size = "md"` | Comportamiento predecible sin configurar |