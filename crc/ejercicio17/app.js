/**
 * @fileoverview Sistema de control de inventarios dinámicos para una cadena
 * de supermercados. Analiza, clasifica y depura el inventario aplicando un
 * callback de control personalizado, detecta productos próximos a vencer,
 * calcula el valor total del inventario y genera un informe completo.
 * @author Eileen Mendoza
 */

// --- Ejecución del Programa ---
alert("Bienvenido al sistema de control de inventarios");

/**
 * Arreglo que almacena todos los productos registrados en el inventario.
 * @type {Array<Object>}
 */
const inventario = [];

/**
 * Solicita y registra los datos de cada producto mediante prompts,
 * almacenándolos en el arreglo de inventario.
 * @param {number} cantidad - Número total de productos a registrar.
 * @returns {void}
 */
function registrarProductos(cantidad) {
    for (let i = 1; i <= cantidad; i++) {
        const id = i;
        const nombre = prompt(`Producto ${i} - Nombre: `);
        const categoria = prompt(`Producto ${i} - Categoría (lácteos/carnes/bebidas/limpieza/otros): `);
        const stock = parseInt(prompt(`Producto ${i} - Stock (unidades): `));
        const precio = parseFloat(prompt(`Producto ${i} - Precio unitario: `));
        const perecedero = prompt(`Producto ${i} - ¿Es perecedero? (si/no): `).toLowerCase() === "si";
        const fechaVencimiento = perecedero ? prompt(`Producto ${i} - Fecha de vencimiento (DD/MM/AAAA): `) : null;

        if (!nombre || !categoria || isNaN(stock) || isNaN(precio) || stock < 0 || precio < 0) {
            alert(`Error: Datos inválidos para el producto ${i}. Verifique los valores ingresados.`);
            return;
        }

        inventario.push({ id, nombre, categoria, stock, precio, perecedero, fechaVencimiento });
    }
}

/**
 * Convierte una fecha en formato DD/MM/AAAA a un objeto Date.
 * @param {string} fechaStr - Fecha en formato DD/MM/AAAA.
 * @returns {Date} Objeto Date correspondiente a la fecha ingresada.
 */
function parsearFecha(fechaStr) {
    const [dia, mes, anio] = fechaStr.split("/").map(Number);
    return new Date(anio, mes - 1, dia);
}

/**
 * Callback de control del inventario que evalúa cada producto y retorna
 * una acción sugerida según su stock, precio y estado de vencimiento.
 * @param {Object} producto - Objeto con los datos completos del producto.
 * @param {number} producto.id - Identificador único del producto.
 * @param {string} producto.nombre - Nombre del producto.
 * @param {string} producto.categoria - Categoría a la que pertenece el producto.
 * @param {number} producto.stock - Cantidad de unidades disponibles en inventario.
 * @param {number} producto.precio - Precio unitario del producto.
 * @param {boolean} producto.perecedero - Indica si el producto tiene fecha de vencimiento.
 * @param {string|null} producto.fechaVencimiento - Fecha de vencimiento en formato DD/MM/AAAA.
 * @returns {string} Acción sugerida: "retirar", "ajustar precio", "vigilar" o "estable".
 */
function callbackControl(producto) {
    if (producto.perecedero && producto.fechaVencimiento) {
        const hoy = new Date();
        const vencimiento = parsearFecha(producto.fechaVencimiento);
        const diasRestantes = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));

        if (diasRestantes < 0) return "retirar";
        if (diasRestantes <= 7) return "ajustar precio";
        if (diasRestantes <= 30) return "vigilar";
    }

    if (producto.stock === 0) return "retirar";
    if (producto.stock < 10) return "vigilar";
    if (producto.precio <= 0) return "ajustar precio";

    return "estable";
}

/**
 * Procesa el inventario completo aplicando el callback de control a cada producto,
 * clasifica los productos según la acción recomendada, detecta perecederos próximos
 * a vencer, obtiene los productos con mayor y menor stock, genera un resumen por
 * categoría y calcula el valor económico total del inventario.
 * @param {Array<Object>} inventario - Arreglo con todos los productos registrados.
 * @param {function(Object): string} callback - Función de control aplicada a cada producto.
 * @returns {{
 *   acciones: Object,
 *   proximosAVencer: Array,
 *   mayorStock: Object,
 *   menorStock: Object,
 *   resumenCategorias: Object,
 *   valorTotal: number
 * }} Informe completo del inventario.
 */
function procesarInventario(inventario, callback) {

    // 1. Aplicar callback y clasificar por acción
    const acciones = { retirar: [], "ajustar precio": [], vigilar: [], estable: [] };

    inventario.forEach(producto => {
        const accion = callback(producto);
        acciones[accion].push({ ...producto, accion });
    });

    // 2. Productos perecederos próximos a vencer (30 días o menos)
    const hoy = new Date();
    const proximosAVencer = inventario.filter(p => {
        if (!p.perecedero || !p.fechaVencimiento) return false;
        const vencimiento = parsearFecha(p.fechaVencimiento);
        const dias = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));
        return dias >= 0 && dias <= 30;
    }).map(p => {
        const dias = Math.floor((parsearFecha(p.fechaVencimiento) - hoy) / (1000 * 60 * 60 * 24));
        return { ...p, diasRestantes: dias };
    });

    // 3. Producto con mayor y menor stock
    const mayorStock = inventario.reduce((max, p) => p.stock > max.stock ? p : max, inventario[0]);
    const menorStock = inventario.reduce((min, p) => p.stock < min.stock ? p : min, inventario[0]);

    // 4. Resumen por categoría
    const resumenCategorias = inventario.reduce((resumen, p) => {
        resumen[p.categoria] = (resumen[p.categoria] || 0) + 1;
        return resumen;
    }, {});

    // 5. Valor total del inventario
    const valorTotal = inventario.reduce((total, p) => total + (p.stock * p.precio), 0);

    return { acciones, proximosAVencer, mayorStock, menorStock, resumenCategorias, valorTotal };
}

/**
 * Genera y muestra el informe completo del inventario en un alert,
 * incluyendo acciones, alertas de vencimiento, extremos de stock,
 * resumen por categoría y valor total del inventario.
 * @param {{
 *   acciones: Object,
 *   proximosAVencer: Array,
 *   mayorStock: Object,
 *   menorStock: Object,
 *   resumenCategorias: Object,
 *   valorTotal: number
 * }} informe - Informe completo generado por procesarInventario.
 * @returns {void}
 */
function mostrarInforme(informe) {
    let reporte = "=== INFORME DE INVENTARIO ===\n\n";

    reporte += " ACCIONES RECOMENDADAS:\n";
    reporte += `   Retirar (${informe.acciones.retirar.length}): ${informe.acciones.retirar.map(p => p.nombre).join(", ") || "Ninguno"}\n`;
    reporte += `   Ajustar precio (${informe.acciones["ajustar precio"].length}): ${informe.acciones["ajustar precio"].map(p => p.nombre).join(", ") || "Ninguno"}\n`;
    reporte += `   Vigilar (${informe.acciones.vigilar.length}): ${informe.acciones.vigilar.map(p => p.nombre).join(", ") || "Ninguno"}\n`;
    reporte += `   Estable (${informe.acciones.estable.length}): ${informe.acciones.estable.map(p => p.nombre).join(", ") || "Ninguno"}\n`;

    reporte += "\n PRÓXIMOS A VENCER (≤30 días):\n";
    if (informe.proximosAVencer.length === 0) {
        reporte += "  Sin productos próximos a vencer.\n";
    } else {
        informe.proximosAVencer.forEach(p => {
            reporte += `  - ${p.nombre} | Vence en: ${p.diasRestantes} días (${p.fechaVencimiento})\n`;
        });
    }

    reporte += `\n STOCK:\n`;
    reporte += `  Mayor stock: ${informe.mayorStock.nombre} (${informe.mayorStock.stock} unidades)\n`;
    reporte += `  Menor stock: ${informe.menorStock.nombre} (${informe.menorStock.stock} unidades)\n`;

    reporte += "\n RESUMEN POR CATEGORÍA:\n";
    Object.entries(informe.resumenCategorias).forEach(([cat, cant]) => {
        reporte += `  - ${cat}: ${cant} producto(s)\n`;
    });

    reporte += `\n VALOR TOTAL DEL INVENTARIO: $${informe.valorTotal.toFixed(2)}`;

    alert(reporte);
}

const cantidad = parseInt(prompt("Ingrese la cantidad de productos a registrar: "));

if (isNaN(cantidad) || cantidad <= 0) {
    alert("Error: Ingrese una cantidad válida de productos.");
} else {
    registrarProductos(cantidad);

    if (inventario.length === cantidad) {
        const informe = procesarInventario(inventario, callbackControl);
        mostrarInforme(informe);
    }
}