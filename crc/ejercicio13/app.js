function analizarGastos(gastos) {
    const totalGastado = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    const gastosPorCategoria = {};
    for (const gasto of gastos) {
        if (!gastosPorCategoria[gasto.categoria]) {
            gastosPorCategoria[gasto.categoria] = 0;
        }
        gastosPorCategoria[gasto.categoria] += gasto.monto;
    }
    let categoriaMasCostosa = null;
    let montoMasCostoso = 0;    
    for (const categoria in gastosPorCategoria) {
        if (gastosPorCategoria[categoria] > montoMasCostoso) {
            montoMasCostoso = gastosPorCategoria[categoria];
            categoriaMasCostosa = categoria;
        }
    }
    const porcentajeMasCostoso = (montoMasCostoso / totalGastado) * 100;
    const alertaDesbalance = porcentajeMasCostoso > 40 ? "¡Alerta! La categoría más costosa supera el 40% del gasto total." : "No hay desbalance financiero significativo.";
    return {
        totalGastado,
        categoriaMasCostosa,
        alertaDesbalance
    };
}
// Ejemplo de uso:
const gastosMensuales = [
    { categoria: "Alimentación", monto: 300 },
    { categoria: "Transporte", monto: 150 },
    { categoria: "Entretenimiento", monto: 200 },
    { categoria: "Alimentación", monto: 100 },
    { categoria: "Salud", monto: 250 }
];
const reporteFinanciero = analizarGastos(gastosMensuales);
alert(`Total gastado: $${reporteFinanciero.totalGastado}\nCategoría más costosa: ${reporteFinanciero.categoriaMasCostosa}\n${reporteFinanciero.alertaDesbalance}`);