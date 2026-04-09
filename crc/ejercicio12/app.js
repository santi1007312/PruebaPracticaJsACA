/**
 * @fileoverview Sistema de gestión de pacientes por prioridad para un
 * centro médico. Identifica al paciente con mayor prioridad de atención
 * y resuelve empates seleccionando al de mayor edad.
 * @author Eileen Mendoza
 */

// --- Ejecución del Programa ---
alert("Bienvenido al sistema de gestión de pacientes por prioridad");

/**
 * Arreglo que almacena los datos de todos los pacientes registrados.
 * @type {Array<Object>}
 */
const pacientes = [];

/**
 * Solicita y registra los datos de cada paciente mediante prompts,
 * almacenándolos en el arreglo de pacientes.
 * @param {number} cantidad - Número total de pacientes a registrar.
 * @returns {void}
 */
function registrarPacientes(cantidad) {
    for (let i = 1; i <= cantidad; i++) {
        const nombre = prompt(`Ingrese el nombre del paciente ${i}: `);
        const edad = parseInt(prompt(`Ingrese la edad del paciente ${i}: `));
        const prioridad = parseInt(prompt(`Ingrese la prioridad del paciente ${i} (1 = alta, 2 = media, 3 = baja): `));

        if (!nombre || isNaN(edad) || isNaN(prioridad) || edad < 0 || prioridad < 1 || prioridad > 3) {
            alert(`Error: Datos inválidos para el paciente ${i}. Verifique los valores ingresados.`);
            return;
        }

        pacientes.push({ nombre, edad, prioridad });
    }
}

/**
 * Busca y retorna al paciente con mayor prioridad del arreglo.
 * En caso de empate en prioridad, selecciona al de mayor edad.
 * @param {Array<Object>} pacientes - Arreglo con los datos de todos los pacientes.
 * @param {string} pacientes[].nombre - Nombre del paciente.
 * @param {number} pacientes[].edad - Edad del paciente en años.
 * @param {number} pacientes[].prioridad - Nivel de prioridad (1 = alta, 2 = media, 3 = baja).
 * @returns {Object} Paciente con mayor prioridad o mayor edad en caso de empate.
 */
function obtenerPacientePrioritario(pacientes) {
    let prioritario = pacientes[0];

    for (let i = 1; i < pacientes.length; i++) {
        const actual = pacientes[i];

        if (actual.prioridad < prioritario.prioridad) {
            prioritario = actual;
        } else if (actual.prioridad === prioritario.prioridad && actual.edad > prioritario.edad) {
            prioritario = actual;
        }
    }

    return prioritario;
}

const cantidad = parseInt(prompt("Ingrese la cantidad de pacientes a registrar: "));

if (isNaN(cantidad) || cantidad <= 0) {
    alert("Error: Ingrese una cantidad válida de pacientes.");
} else {
    registrarPacientes(cantidad);

    if (pacientes.length === cantidad) {
        const seleccionado = obtenerPacientePrioritario(pacientes);
        alert(`Paciente prioritario:\n- Nombre: ${seleccionado.nombre}\n- Edad: ${seleccionado.edad} años\n- Prioridad: ${seleccionado.prioridad}`);
    }
}