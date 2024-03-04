export function showGraph(xVals,yVals){
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#000';

  const options = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        },
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Forecasted Temp'
        }
      }]
    }
  };

  const data = {
    labels: xVals,
    datasets: [{
      label: 'Sessions',
      data: yVals,
      backgroundColor: 'rgba(2,117,216,0.2)',
      borderColor: 'rgba(2,117,216,1)'
    }]
  };

  const ctx = document.getElementById('myAreaChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });
}
