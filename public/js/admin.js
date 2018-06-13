function data15() {

    var chart = new CanvasJS.Chart("KpiDados", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Gastos com Pessoal"
        },
        axisY: {
            title: "Euros €"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00'€'",
            indexLabel: "{label} {y}",
            dataPoints: [{
                    y: KpiDados(),
                    label: "Colaboradores Pagos"
                },

            ]
        }]
    });

    chart.render();

}