function registrarProductos(...productos) {
    const productosUnicos = new Set();  
    for (const producto of productos) {
        productosUnicos.add(producto);  
    }   
    return Array.from(productosUnicos);
}
// Ejemplo de uso:
const productosRegistrados = registrarProductos("Manzana", "Banana", "Naranja", "Manzana", "Pera");
alert(productosRegistrados); // Salida: ["Manzana", "Banana", "Naranja", "Pera"]
