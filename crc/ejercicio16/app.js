/**
 * @fileoverview Sistema de alerta temprana para una red social que detecta
 * usuarios que podrían estar infringiendo las normas de la comunidad.
 * Analiza reportes, publicaciones inapropiadas y antigüedad de la cuenta
 * para clasificar usuarios por nivel de riesgo y generar un informe global.
 * @author Eileen Mendoza
 */

// --- Ejecución del Programa ---
alert("Bienvenido al sistema de alerta temprana de la red social");

/**
 * Arreglo que almacena los datos de todos los usuarios registrados.
 * @type {Array<Object>}
 */
const usuarios = [];

/**
 * Palabras prohibidas que aumentan el nivel de riesgo de un usuario.
 * @type {Array<string>}
 */
const PALABRAS_PROHIBIDAS = ["spam", "fraude", "hack", "estafa", "ilegal"];

/**
 * Solicita y registra los datos de cada usuario mediante prompts,
 * almacenándolos en el arreglo de usuarios.
 * @param {number} cantidad - Número total de usuarios a registrar.
 * @returns {void}
 */
function registrarUsuarios(cantidad) {
    for (let i = 1; i <= cantidad; i++) {
        const id = i;
        const nombre = prompt(`Ingrese el nombre del usuario ${i}: `);
        const reportes = parseInt(prompt(`Ingrese la cantidad de reportes del usuario ${i}: `));
        const publicacionesInapropiadas = parseInt(prompt(`Ingrese el número de publicaciones inapropiadas del usuario ${i}: `));
        const contenidoPublicaciones = prompt(`Ingrese el contenido de las publicaciones del usuario ${i} (separadas por coma): `);
        const diasRegistro = parseInt(prompt(`Ingrese hace cuántos días se registró el usuario ${i}: `));
        const estado = prompt(`Ingrese el estado del usuario ${i} (activo/suspendido): `);

        if (!nombre || isNaN(reportes) || isNaN(publicacionesInapropiadas) || isNaN(diasRegistro) || !estado) {
            alert(`Error: Datos inválidos para el usuario ${i}. Verifique los valores ingresados.`);
            return;
        }

        usuarios.push({
            id,
            nombre,
            publicaciones: contenidoPublicaciones ? contenidoPublicaciones.split(",").map(p => p.trim()) : [],
            reportes: Array(reportes).fill("reporte"),
            publicacionesInapropiadas,
            fechaRegistro: diasRegistro,
            estado
        });
    }
}

/**
 * Callback de análisis de riesgo que evalúa un usuario según sus reportes,
 * publicaciones inapropiadas, antigüedad y contenido de sus publicaciones,
 * retornando un objeto con su nivel de riesgo y motivo principal.
 * @param {Object} usuario - Objeto con los datos completos del usuario.
 * @param {number} usuario.id - Identificador único del usuario.
 * @param {string} usuario.nombre - Nombre del usuario.
 * @param {Array<string>} usuario.publicaciones - Lista de publicaciones del usuario.
 * @param {Array<string>} usuario.reportes - Lista de reportes recibidos.
 * @param {number} usuario.publicacionesInapropiadas - Cantidad de publicaciones marcadas como inapropiadas.
 * @param {number} usuario.fechaRegistro - Días transcurridos desde el registro.
 * @param {string} usuario.estado - Estado actual de la cuenta (activo/suspendido).
 * @returns {{ sospechoso: boolean, nivel: number, motivo: string }} Resultado del análisis de riesgo.
 */
function callbackAnalisis(usuario) {
    let nivel = 1;
    let motivo = "Sin infracciones detectadas";
    let sospechoso = false;

    // Regla 1: más de 5 reportes → riesgo mínimo nivel 3
    if (usuario.reportes.length > 5) {
        nivel = Math.max(nivel, 3);
        motivo = "Más de 5 reportes acumulados";
        sospechoso = true;
    }

    // Regla 2: publicaciones inapropiadas → riesgo aumenta
    if (usuario.publicacionesInapropiadas > 0) {
        nivel = Math.max(nivel, nivel + 1);
        motivo = "Publicaciones marcadas como inapropiadas";
        sospechoso = true;
    }

    // Regla 3: usuario nuevo (menos de 30 días) con reportes → riesgo aumenta
    if (usuario.fechaRegistro < 30 && usuario.reportes.length > 0) {
        nivel = Math.max(nivel, nivel + 1);
        motivo = "Usuario nuevo con reportes acumulados";
        sospechoso = true;
    }

    // Regla 4: palabras prohibidas en publicaciones
    const contieneProhibidas = usuario.publicaciones.some(pub =>
        PALABRAS_PROHIBIDAS.some(palabra => pub.toLowerCase().includes(palabra))
    );
    if (contieneProhibidas) {
        nivel = Math.max(nivel, nivel + 1);
        motivo = "Palabras prohibidas detectadas en publicaciones";
        sospechoso = true;
    }

    // Regla 5: cuenta suspendida → riesgo máximo
    if (usuario.estado === "suspendido") {
        nivel = 5;
        motivo = "Cuenta actualmente suspendida";
        sospechoso = true;
    }

    // Limitar nivel máximo a 5
    nivel = Math.min(nivel, 5);

    return { sospechoso, nivel, motivo };
}

/**
 * Procesa todos los usuarios aplicando el callback de análisis a cada uno,
 * los clasifica por nivel de riesgo y genera un informe global con categorías
 * de bajo, medio y alto riesgo.
 * @param {Array<Object>} usuarios - Arreglo con los datos de todos los usuarios.
 * @param {function(Object): { sospechoso: boolean, nivel: number, motivo: string }} callback - Función de análisis de riesgo aplicada a cada usuario.
 * @returns {{ bajoRiesgo: Array, medioRiesgo: Array, altoRiesgo: Array }} Informe global clasificado por nivel de riesgo.
 */
function analizarUsuarios(usuarios, callback) {
    const informe = {
        bajoRiesgo: [],
        medioRiesgo: [],
        altoRiesgo: []
    };

    usuarios.forEach(usuario => {
        const resultado = callback(usuario);

        const entrada = {
            id: usuario.id,
            nombre: usuario.nombre,
            sospechoso: resultado.sospechoso,
            nivel: resultado.nivel,
            motivo: resultado.motivo
        };

        if (resultado.nivel <= 2) {
            informe.bajoRiesgo.push(entrada);
        } else if (resultado.nivel <= 3) {
            informe.medioRiesgo.push(entrada);
        } else {
            informe.altoRiesgo.push(entrada);
        }
    });

    return informe;
}

/**
 * Genera y muestra el informe global de riesgo en un alert,
 * listando los usuarios clasificados por categoría con su motivo.
 * @param {{ bajoRiesgo: Array, medioRiesgo: Array, altoRiesgo: Array }} informe - Informe completo generado por analizarUsuarios.
 * @returns {void}
 */
function mostrarInforme(informe) {
    let reporte = "=== INFORME GLOBAL DE RIESGO ===\n\n";

    reporte += `BAJO RIESGO (${informe.bajoRiesgo.length} usuarios):\n`;
    informe.bajoRiesgo.forEach(u => {
        reporte += `  - ${u.nombre} | Nivel: ${u.nivel} | ${u.motivo}\n`;
    });

    reporte += `\nMEDIO RIESGO (${informe.medioRiesgo.length} usuarios):\n`;
    informe.medioRiesgo.forEach(u => {
        reporte += `  - ${u.nombre} | Nivel: ${u.nivel} | ${u.motivo}\n`;
    });

    reporte += `\nALTO RIESGO (${informe.altoRiesgo.length} usuarios):\n`;
    informe.altoRiesgo.forEach(u => {
        reporte += `  - ${u.nombre} | Nivel: ${u.nivel} | ${u.motivo}\n`;
    });

    alert(reporte);
}

const cantidad = parseInt(prompt("Ingrese la cantidad de usuarios a analizar: "));

if (isNaN(cantidad) || cantidad <= 0) {
    alert("Error: Ingrese una cantidad válida de usuarios.");
} else {
    registrarUsuarios(cantidad);

    if (usuarios.length === cantidad) {
        const informe = analizarUsuarios(usuarios, callbackAnalisis);
        mostrarInforme(informe);
    }
}