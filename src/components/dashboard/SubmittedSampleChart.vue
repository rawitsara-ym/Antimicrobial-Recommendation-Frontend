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
  name: "SubmittedSampleChart",
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
          "#449DD1",
          "#F86624",
          "#EA3546",
          "#662E9B",
          "#C5D86D",
          "#D7263D",
          "#1B998B",
          "#2E294E",
          "#F46036",
          "#E2C044",
        ],
        // theme: {
        //   palette: "palette3",
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
          text: "Top 10 ตัวอย่างที่ส่งตรวจ (Submitted Sample)",
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
                text: "Top 10 ตัวอย่างที่ส่งตรวจ (Submitted Sample)",
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
                text: ["Top 10 ตัวอย่างที่ส่งตรวจ", "(Submitted Sample)"],
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
