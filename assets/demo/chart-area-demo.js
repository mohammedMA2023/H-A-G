// Set new default font family and font color to mimic Bootstrap's default styling

// Area Chart Example

export function showGraph(xVals,yVals){
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#ffffff';
  
  var ctx = document.getElementById("myAreaChart");const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7"],
      datasets: [{
        label: "Sessions",
        data: [10000, 30162, 26263, 18394, 18287, 28682, 31274],
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)"
      }]
    },
    options: {
      scales: {
        xAxes: [{
          // **Option 1: Display all labels, adjust canvas size if needed**
          display: true,
          ticks: {
            maxTicksLimit: null, // Remove limit
          }
        }, {
          // **Option 2: Limit and format dates with ticks.callback**
          display: true,
          ticks: {
            maxTicksLimit: 5,
            callback: function(value, index, ticks) {
              return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            }
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 40000,
            maxTicksLimit: 5
          }
        }]
      }
    }
  });
}