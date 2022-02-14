<template>
  <div class="h-full p-2 sm:p-4">
    <apexchart
      ref="chart"
      type="line"
      height="100%"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "VersionChart",
  data() {
    return {
      options: {
        chart: {
          id: "model version",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
        markers: {
          size: 5,
        },
        theme: {
          palette: "palette1", // upto palette10
        },
        title: {
          text: "Version ของแต่ละโมเดล",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        grid: {
          padding: {
            left: 40,
            right: 20,
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
                  formatter: function (val) {
                    return val.toFixed(0);
                  },
                  style: {
                    fontSize: "12px",
                  },
                },
              },
              title: {
                style: {
                  fontSize: "16px",
                },
                margin: 0,
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
                  formatter: function (val) {
                    return val.toFixed(0);
                  },
                  style: {
                    fontSize: "8px",
                  },
                },
              },
              title: {
                style: {
                  fontSize: "12px",
                },
                offsetY: 20,
                margin: 20,
              },
              grid: {
                padding: {
                  left: 25,
                  right: 10,
                  bottom: 0,
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
