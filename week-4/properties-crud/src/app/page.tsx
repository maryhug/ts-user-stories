// ============================================================
// page.tsx — ruta raíz "/"
// Redirige automáticamente al dashboard de propiedades
// para que no veamos la pantalla por defecto de Next.js
// ============================================================

import { redirect } from "next/navigation";

export default function Home() {
    redirect("/dashboard/properties");
}