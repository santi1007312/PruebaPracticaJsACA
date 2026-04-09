/**
 * @fileoverview Sistema de cálculo modular de nómina para determinar
 * el salario neto de un trabajador a partir de su valor por hora,
 * horas trabajadas y deducciones aplicables.
 * @author Eileen Mendoza
 */

/**
 * Calcula el salario base multiplicando el valor por hora
 * por las horas trabajadas, y retorna el resultado mediante un callback.
 * @param {number} valorHora - Valor monetario pagado por cada hora trabajada.
 * @param {number} horasTrabajadas - Número total de horas trabajadas por el empleado.
 * @param {function(number): void} callback - Función que recibe el salario base calculado.
 * @returns {void}
 */
function calcularSalarioBase(valorHora, horasTrabajadas, callback) {

    const salarioBase = valorHora * horasTrabajadas;

    callback(salarioBase);

}


/**
 * Solicita al usuario el valor de las deducciones mediante un prompt,
 * valida que sea un número positivo y retorna el resultado mediante un callback.
 * @param {function(number): void} callback - Función que recibe el valor de la deducción validada.
 * @returns {void}
 */
function calcularDeducciones(callback) {

    const deduccion= parseFloat(prompt("Ingrese el valor de la deduccion: "));

    if (isNaN(deduccion) || deduccion < 0) {

        alert("Error: El valor de la deducción no es válido.");

    } else {

        callback(deduccion);

    }

}


/**
 * Calcula el salario neto restando las deducciones al salario base,
 * y retorna el mensaje de resultado mediante un callback.
 * @param {number} salarioBase - Salario bruto calculado antes de deducciones.
 * @param {number} deducciones - Total de deducciones a descontar del salario base.
 * @param {function(string): void} callback - Función que recibe el mensaje con el salario neto.
 * @returns {void}
 */

function calcularNeto(salarioBase, deducciones, callback){

    const salarioNeto = salarioBase - deducciones;

    callback(`El salario neto del trabajador es de: ${salarioNeto}`);

}


const valorHora = parseFloat(prompt("Ingrese el valor por cada hora trabajada: "));
const  horasTrabajadas = parseInt(prompt("Ingrese el numero de horas que ha tarabajado: "));



if (isNaN(valorHora) || valorHora <= 0 || isNaN(horasTrabajadas) || horasTrabajadas < 0) {
    alert("Error: Ingrese valores numéricos válidos para el valor de hora y horas trabajadas.");
} else {

    calcularSalarioBase(valorHora, horasTrabajadas, (salarioBase) => {

        calcularDeducciones((deducciones) => {

            calcularNeto(salarioBase, deducciones, (salarioNeto) => {

                alert(salarioNeto);

            });

        });

    });

}