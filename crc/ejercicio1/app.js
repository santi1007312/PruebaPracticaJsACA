
function validarAsistencia(aprendices, nombre) {
    if (aprendices.includes(nombre)) {
        return `El aprendiz ${nombre} está inscrito.`;
    } else {
        return `El aprendiz ${nombre} no está inscrito.`;
    }
}

// Solicitar la cantidad de aprendices
const cantidadAprendices = parseInt(prompt("Ingrese la cantidad de aprendices:"));
const aprendices = [];

// Solicitar el nombre de cada aprendiz
for (let i = 0; i < cantidadAprendices; i++) {
    const nombreAprendiz = prompt(`Ingrese el nombre del aprendiz ${i + 1}:`);
    aprendices.push(nombreAprendiz);
}
// Solicitar el nombre a validar
for (let i = 0; i < aprendices.length; i++) {
    const nombreAValidar = prompt("Ingrese el nombre del aprendiz a validar:");
    // Validar la asistencia y mostrar el resultado
    const resultado = validarAsistencia(aprendices, nombreAValidar);
    alert(resultado);
}