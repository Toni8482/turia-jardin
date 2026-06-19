export function safeInit(fn, name = 'module') {
  try {
    const result = fn();

    // Soporte async opcional
    if (result instanceof Promise) {
      return result.catch(err => {
        console.warn(`❌ Error en ${name}:`, err);
      });
    }

    return result;

  } catch (err) {
    console.warn(`❌ Error en ${name}:`, err);
  }
}