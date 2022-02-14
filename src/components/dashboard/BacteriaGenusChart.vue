<template>
  <div class="h-full p-2 sm:p-4">
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
  name: "BacteriaGenusChart",
  data() {
    return {
      options: {
        chart: {
          id: "bacteria genus",
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories: [],
        },
        colors: [
          "#3F51B5",
          "#03A9F4",
          "#4CAF50",
          "#F9CE1D",
          "#FF9800",
          "#33B2DF",
          "#546E7A",
          "#D4526E",
          "#13D8AA",
          "#A5978B",
        ],
        // theme: {
        //   palette: "palette2",
        // },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            // horizontal: true,
            distributed: true,
          },
        },
        title: {
          text: "Top 10 สกุลแบคทีเรีย (ฺBacteria Genus)",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        legend: {
          position: "right",
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
                  vertical: 3,
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
