// Enunciado analítico:
// Un sistema debe validar si un usuario puede acceder y qué permisos posee según su rol.
// El programa recibirá los datos del usuario y evaluará si está activo y qué tipo de acceso
// corresponde a su rol.
// Requerimientos:
// • Crear una función validarUsuario().
// • Usar operadores lógicos y condicionales.
// • Evaluar roles: admin, editor y lector.
// • Retornar nivel de acceso.
// Entradas:
// • Nombre.
// • Estado (activo/inactivo).
// • Rol.
// Salidas:
// • Permisos asignados según el rol.
// • Mensaje de acceso permitido o denegado.
// utilizar callbacks 

alert("Bienvenido al sistema de validacion de usuarios y permisos");

const roles={
    admin : "Acceso total al sistema",
    editor : "Acceso limitado a funciones de edicion y visualizacion",
    lector: "Acceso a funciones solamente de visualizacion"
}

function validarUsuario(nombre, estado, rol, callback, ) {

    if (estado.toLowerCase()==="activo"){
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

validarUsuario(nombreUsuario, estadoUsuario, rolUsuario, (mensaje) => {
    alert(mensaje);
});
