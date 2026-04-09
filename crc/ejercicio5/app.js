/**
 * @fileoverview Sistema de validación de usuarios y permisos con Callbacks.
 * @author Eileen Mendoza
 */

// --- Ejecución del Programa ---
alert("Bienvenido al sistema de validacion de usuarios y permisos");
/**
 * Objeto que contiene las descripciones de permisos según el rol.
 * @type {Object<string, string>}
 */
const roles={
    admin : "Acceso total al sistema",
    editor : "Acceso limitado a funciones de edicion y visualizacion",
    lector: "Acceso a funciones solamente de visualizacion"
}
/**
 * Valida el acceso de un usuario según su estado y rol, y ejecuta un callback con el resultado.
 * * @param {string} nombre - El nombre del usuario a validar.
 * @param {string} estado - El estado actual (ej. "activo" o "inactivo").
 * @param {string} rol - El rol del usuario (admin, editor, lector).
 * @param {function(string): void} callback - Función que recibe el mensaje de resultado para mostrarlo.
 * * @example
 * validarUsuario("Eileen", "activo", "admin", (msg) => alert(msg));
 */
function validarUsuario(nombre, estado, rol, callback, ) {

    if (estado.toLowerCase()==="activo"){
        // Verificamos si el rol existe en nuestro objeto 'roles'
        if (rol.toLowerCase() in roles ){
            callback(`El usuario ${nombre} tiene el rol de ${rol} y tiene los siguientes permisos: ${roles[rol.toLowerCase()]}`);   
        }else if (rol.toLowerCase() in roles ){
            callback(`El usuario ${nombre} tiene el rol de ${rol} y tiene los siguientes permisos: ${roles[rol.toLowerCase()]}`);   
        }else if (rol.toLowerCase() in roles ){
            callback(`El usuario ${nombre} tiene el rol de ${rol} y tiene los siguientes permisos: ${roles[rol.toLowerCase()]}`);
        }else{
            callback(`El usuario ${nombre} tiene un rol no aprobado, permiso denegado`)
        }

    }else if (estado.toLowerCase()=== "inactivo") {

        callback(`El usuario ${nombre} esta inactivo, permiso denegado`)
        
    }else{
        callback(`El estado ingresado no es valido, permiso denegado`)
    }
    
}

const nombreUsuario = prompt("Ingrese su nombre de usuario: ");
const estadoUsuario = prompt("Ingrese su estado (activo/inactivo): ");
const rolUsuario = prompt("Ingrese su rol (admin/editor/lector): ");
/**
 * Llamada a la función principal.
 * Se utiliza una función de flecha como callback para mostrar el alert.
 */
validarUsuario(nombreUsuario, estadoUsuario, rolUsuario, (mensaje) => {
    alert(mensaje);
});
