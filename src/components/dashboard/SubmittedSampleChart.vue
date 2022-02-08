<template>
  <div>
    <apexchart ref=chart type="bar" :options="options" :series="series"></apexchart>
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
          text: "Top 10 ตัวอย่างที่ส่งตรวจ (ฺSubmitted Sample)",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        legend: {
            position: 'right',
        }
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
