
function calcularInventario(cantidadInicial, cantidadVendida, cantidadRecibida) {
    // Validar valores negativos
    if (cantidadInicial < 0 || cantidadVendida < 0 || cantidadRecibida < 0) {
        alert("Error: Las cantidades no pueden ser negativas.");
        return null; // Retornar null para indicar error
    }   

    // Calcular inventario final
    const inventarioFinal = cantidadInicial - cantidadVendida + cantidadRecibida;

    // Determinar estado del inventario
    const estadoInventario = inventarioFinal < 5 ? "Inventario crítico" : "Inventario estable";

    // Retornar resultados
    return {
        inventarioFinal: inventarioFinal,
        estadoInventario: estadoInventario
    };
}

// Ejemplo de uso
const cantidadInicial = parseInt(prompt("Ingrese la cantidad inicial:"));
const cantidadVendida = parseInt(prompt("Ingrese la cantidad vendida:"));
const cantidadRecibida = parseInt(prompt("Ingrese la cantidad recibida:"));
const resultado = calcularInventario(cantidadInicial, cantidadVendida, cantidadRecibida);
alert(`Inventario final: ${resultado.inventarioFinal}`);
alert(resultado.estadoInventario);
