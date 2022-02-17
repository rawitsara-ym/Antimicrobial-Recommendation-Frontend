<template>
  <div class="h-full pb-2 sm:p-4">
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
  name: "CaseCountChart",
  data() {
    return {
      options: {
        chart: {
          id: "Case Count",
        },
        theme: {
          palette: "palette1",
        },
        xaxis: {
          categories: [],
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
            },
            // format: "yyyy-MM",
          },
        },
        tooltip: {
          x: {
            format: "MMM 'yy",
          },
        },
        markers: {
          size: 5,
        },
        title: {
          text: "จำนวนรายงานผลตรวจ",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Sarabun, sans-serif",
            color: "#263238",
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
