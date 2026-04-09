// Función para filtrar proyectos activos
function filtrarActivos(proyectos) {
    return proyectos.filter(proyecto => proyecto.estado === "activo");
}
// Función para contar participantes de un proyecto
function contarParticipantes(proyecto) {
    return proyecto.participantes.length;
}
// Función para evaluar un proyecto mediante un callback
function evaluarProyecto(proyecto, callback) {
    return callback(proyecto);
}
// Ejemplo de uso:
const proyectos = [
    { nombre: "Proyecto A", estado: "activo", participantes: ["Alice", "Bob"] },
    { nombre: "Proyecto B", estado: "inactivo", participantes: ["Charlie"] },
    { nombre: "Proyecto C", estado: "activo", participantes: ["Dave", "Eve", "Frank"] }
];
const proyectosActivos = filtrarActivos(proyectos);
const informeProyectos = proyectosActivos.map(proyecto => {
    const numParticipantes = contarParticipantes(proyecto);
    const necesitaRefuerzo = evaluarProyecto(proyecto, p => p.participantes.length < 3);
    return {
        nombre: proyecto.nombre,
        participantes: numParticipantes,
        estado: necesitaRefuerzo ? "Requiere refuerzo" : "Suficiente"
    };
});
alert(JSON.stringify(informeProyectos, null, 2)); // Salida: Informe detallado de proyectos activos
