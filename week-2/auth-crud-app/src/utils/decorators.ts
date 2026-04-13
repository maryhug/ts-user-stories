// ============================================================
// Decoradores de TypeScript para extender comportamiento
// sin modificar la lógica base de los métodos.
//
// Un decorador de método es una función que recibe:
//   - target: el prototipo de la clase
//   - key: el nombre del método decorado
//   - descriptor: objeto que contiene la función original (value)
//
// Retornamos el descriptor modificado para reemplazar el método.
// ============================================================

// ----------------------------------------------------------
// @withDefaults
// Intercepta el método `create` de UserStore y se asegura
// de que todo usuario creado tenga role y createdAt,
// independientemente de lo que pase la lógica base.
// ----------------------------------------------------------
export function withDefaults(
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    // Guardamos referencia al método original antes de sobreescribirlo
    const originalMethod = descriptor.value;

    // Reemplazamos el método con una versión "envuelta"
    descriptor.value = function (...args: any[]) {
        console.log(`[Decorator @withDefaults] Interceptando método: ${key}`);

        // Llamamos al método original con sus argumentos normales
        // "this" aquí se refiere a la instancia de UserStore
        const result = originalMethod.apply(this, args);

        // Enriquecemos el resultado con propiedades extra
        // Solo lo hacemos si el resultado es un objeto (no null, no primitivo)
        if (result && typeof result === "object") {
            result.role = result.role ?? "user";        // no sobreescribe si ya existe
            result.createdAt = result.createdAt ?? Date.now();
            console.log(`[Decorator @withDefaults] Propiedades agregadas a usuario ID: ${result.id}`);
        }

        return result;
    };

    return descriptor;
}