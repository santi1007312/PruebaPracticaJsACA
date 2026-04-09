/**
 * @fileoverview Sistema de resumen de mensajes usando destructuración
 * para extraer y mostrar la información relevante de cada mensaje
 * de forma organizada al usuario.
 * @author Eileen Mendoza
 */

/**
 * Objeto que representa un mensaje con su información completa.
 * @type {Object<string, string>}
 */
const mensaje = {
    remitente: prompt("Ingrese el nombre del remitente: "),
    contenido: prompt("Ingrese el contenido del mensaje: "),
    fecha: prompt("Ingrese la fecha del mensaje (DD/MM/AAAA): ")
};

/**
 * Genera un resumen de un mensaje extrayendo su remitente,
 * contenido y fecha mediante destructuración, y retorna
 * el resumen construido como una cadena de texto.
 * @param {Object} mensaje - Objeto con los datos completos del mensaje.
 * @param {string} mensaje.remitente - Nombre de quien envía el mensaje.
 * @param {string} mensaje.contenido - Texto del mensaje enviado.
 * @param {string} mensaje.fecha - Fecha en que fue enviado el mensaje.
 * @returns {string} Resumen formateado con remitente, contenido y fecha.
 */
function generarResumen(mensaje) {
    const { remitente, contenido, fecha } = mensaje;
    return `Resumen del mensaje:\n- Remitente: ${remitente}\n- Contenido: ${contenido}\n- Fecha: ${fecha}`;
}

if (!mensaje.remitente || !mensaje.contenido || !mensaje.fecha) {
    alert("Error: Todos los campos del mensaje son obligatorios.");
} else {
    const resumen = generarResumen(mensaje);
    alert(resumen);
}