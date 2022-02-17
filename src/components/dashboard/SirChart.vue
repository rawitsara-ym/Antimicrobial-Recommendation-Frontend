<template>
  <div class="h-full pb-2 sm:p-4">
    <apexchart
      ref="chart"
      type="bar"
      height="100%"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "SirChart",
  data() {
    return {
      options: {
        chart: {
          id: "sir result",
          toolbar: {
            show: true,
          },
          stacked: true,
        },
        xaxis: {
          categories: [],
        },
        colors: ["#FF4560", "#FEB019", "#4CAF50", "#F86624", "#008FFB"],
        theme: {
          palette: "palette7",
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        title: {
          text: "ผลการทดสอบความไวต่อยาต้านจุลชีพ (S/I/R/POS/NEG)",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Sarabun, sans-serif",
            color: "#263238",
          },
        },
        legend: {
          position: "right",
        },
        grid: {
          padding: {
            // left: 40,
            // right: 20,
            bottom: 10,
          },
        },
        responsive: [
          {
            breakpoint: 10000,
            options: {
              xaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                  },
                },
              },
              legend: {
                position: "right",
                fontSize: "12px",
              },
              title: {
                text: "ผลการทดสอบความไวต่อยาต้านจุลชีพ (S/I/R/POS/NEG)",
                style: {
                  fontSize: "16px",
                },
              },
            },
          },
          {
            breakpoint: 640,
            options: {
              xaxis: {
                labels: {
                  style: {
                    fontSize: "8px",
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "8px",
                  },
                },
              },
              legend: {
                position: "bottom",
                fontSize: "8px",
                itemMargin: {
                  horizontal: 5,
                  vertical: 0,
                },
              },
              title: {
                text: ["ผลการทดสอบความไวต่อยาต้านจุลชีพ", "(S/I/R/POS/NEG)"],
                style: {
                  fontSize: "12px",
                },
              },
            },
          },
        ],
      },
      series: [],
    };
  },
  methods: {
    updateChart(options, series) {
      this.$refs.chart.updateOptions(options);
      this.series = series;
    },
  },
};
</script>
