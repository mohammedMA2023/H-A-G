export function showBarGraph(x, y) {
  // Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#000000';

  var ctx = document.getElementById("myBarChart");
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        label: "PM10 Levels",  // Updated label to reflect PM10 Levels
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: y,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time',  // Set x-axis title to "Time"
          },
          gridLines: {
            display: true
          },
          ticks: {
            maxTicksLimit: x.length  // Display all x axis labels
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'PM10 Levels',  // Set y-axis title to "PM10 Levels"
          },
          ticks: {
            min: 0,
            max: Math.max(...y),
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: true,  // Display legend for the label
        position: 'top',  // You can adjust the position as needed
      },
      title: {
        display: true,
        text: "Today's PM10 Levels",  // Set graph title
      },
    }
  });
}
