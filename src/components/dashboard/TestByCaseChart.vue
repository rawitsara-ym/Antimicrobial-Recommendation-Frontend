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
  name: "TestByCaseChart",
  data() {
    return {
      options: {
        chart: {
          id: "test_by_case",
        },
        yaxis: {
          min: 0,
          max: 1,
        },
        theme: {
          palette: "palette3", // upto palette10
        },
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        title: {
          text: "ประสิทธิภาพแบบ Test By Case",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Sarabun, sans-serif",
            color: "#263238",
          },
        },
        xaxis: {
          categories: [],
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
              },
              title: {
                style: {
                  fontSize: "16px",
                },
              },
              dataLabels: {
                style: {
                  fontSize: "14px"
                }
              }
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
              },
              title: {
                style: {
                  fontSize: "12px",
                },
              },
              dataLabels: {
                style: {
                  fontSize: "10px"
                }
              }
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
