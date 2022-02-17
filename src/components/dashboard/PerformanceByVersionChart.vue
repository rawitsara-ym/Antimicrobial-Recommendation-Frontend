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
  name: "PerformanceByVersionChart",
  data() {
    return {
      options: {
        chart: {
          id: "performance",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 1,
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "ประสิทธิภาพของแต่ละโมเดล",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Sarabun, sans-serif",
            color: "#263238",
          },
        },
        legend: {
          itemMargin: {
            horizontal: 5,
            vertical: 15,
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
                min: 0,
                max: 1,
                labels: {
                  style: {
                    fontSize: "12px",
                  },
                },
              },
              legend: {
                fontSize: "12px",
                itemMargin: {
                  horizontal: 5,
                  vertical: 15,
                },
              },
              title: {
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
                min: 0,
                max: 1,
                labels: {
                  style: {
                    fontSize: "8px",
                  },
                },
              },
              legend: {
                fontSize: "8px",
                itemMargin: {
                  horizontal: 5,
                  vertical: 0,
                },
              },
              title: {
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
