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
  name: "PerformanceByAntimicrobialChart",
  data() {
    return {
      options: {
        chart: {
          id: "antimicrobial model performance",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 1,
        },
        markers: {
          size: 5,
        },
        theme: {
          palette: "palette2", // upto palette10
        },
        title: {
          text: "ประสิทธิภาพของโมเดลในแต่ละ Version",
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
              legend: {
                fontSize: "12px",
                itemMargin: {
                  horizontal: 5,
                  vertical: 0,
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
              legend: {
                fontSize: "8px",
                itemMargin: {
                  horizontal: 5,
                  vertical: 0,
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
              title: {
                style: {
                  fontSize: "12px",
                },
                offsetY: 20,
                margin: 20,
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
