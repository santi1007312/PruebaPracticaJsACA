// Ejercicio 6: Cálculo modular de nómina

// Enunciado analítico:

// Una empresa requiere calcular el salario neto de un trabajador separando el proceso en

// módulos independientes: salario base, deducciones y salario final.

// Requerimientos:

// • Crear tres funciones: calcularSalarioBase(), calcularDeducciones(), calcularNeto().

// • Manejo de parámetros para conectar los módulos.

// • Aplicar operaciones matemáticas.

// • Retornar el salario final.

// Entradas:

// • Valor de hora.

// • Horas trabajadas.

// Salidas:

// • Salario base.

// • Total deducciones.

// • Salario neto.



function calcularSalarioBase(valorHora, horasTrabajadas, callback) {

    const salarioBase = valorHora * horasTrabajadas;

    callback(salarioBase);

}



function calcularDeducciones(callback) {

    const deduccion= parseFloat(prompt("Ingrese el valor de la deduccion: "));

    if (isNaN(deduccion) || deduccion < 0) {

        alert("Error: El valor de la deducción no es válido.");

    } else {

        callback(deduccion);

    }

}





function calcularNEto(salarioBase, deducciones, callback){

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

            calcularNEto(salarioBase, deducciones, (salarioNeto) => {

                alert(salarioNeto);

            });

        });

    });

}