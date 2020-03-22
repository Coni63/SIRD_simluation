var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    black: 'rgb(0, 0, 0)'
};

var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '# of Susceptible individuals',
            data: [],
            backgroundColor: chartColors.yellow,
            borderColor: chartColors.yellow,
            borderWidth: 1,
            fill: origin,
        },
        {
            label: '# of Infected individuals',
            data: [],
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            borderWidth: 1,
            fill: origin,
        },
        {
            label: '# of Recovered individuals',
            data: [],
            backgroundColor: chartColors.green,
            borderColor: chartColors.green,
            borderWidth: 1,
            fill: origin,
        },
        {
            label: '# of Died individuals',
            data: [],
            backgroundColor: chartColors.black,
            borderColor: chartColors.black,
            borderWidth: 1,
            fill: origin,
        },
        {
            label: '# of Quarantine individuals',
            data: [],
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            borderWidth: 1,
            fill: origin,
        }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
};

document.getElementById('addData').addEventListener('click', function() {
    if (day == 0) {
        reset();
    } else {
        simulate();
    }
    myChart.update();
});

document.getElementById('addData15').addEventListener('click', function() {
    if (day == 0) {
        reset();
    } 
    for (let i = 0; i < 15; i++){
        simulate();
    }
    myChart.update();
});

document.getElementById('reset').addEventListener('click', function() {
    reset();
    myChart.update();
});