import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Properties CRUD",
    description: "Gestión de propiedades con Next.js y MongoDB",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
        <body>{children}</body>
        </html>
    );
}
