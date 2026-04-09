function buscarCursos(catalogo, callback) {
    return catalogo.filter(callback);
}   
// Ejemplo de uso:
const catalogoCursos = [
    { nombre: "JavaScript Básico", categoria: "Programación", duracion: 10 },
    { nombre: "Python para Principiantes", categoria: "Programación", duracion: 15 },
    { nombre: "Diseño Gráfico", categoria: "Diseño", duracion: 8 },
    { nombre: "Marketing Digital", categoria: "Marketing", duracion: 12 }
];
const cursosProgramacion = buscarCursos(catalogoCursos, curso => curso.categoria === "Programación");
alert(cursosProgramacion); // Salida: [{ nombre: "JavaScript Básico", ... }, { nombre: "Python para Principiantes", ... }]
