<template>
  <div>
    <apexchart ref=chart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "AnswerChart",
  data() {
    return {
      options: {
        chart: {
          id: "antimicrobial recommentdation",
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories: [],
        },
        colors: [
          "#4ECDC4",
          "#C7F464",
          "#81D4FA",
          "#546E7A",
          "#FD6A6A",
          "#2B908F",
          "#F9A3A4",
          "#90EE7E",
          "#FA4443",
          "#69D2E7",
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
        ],
        // theme: {
        //   palette: "palette4",
        // },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        title: {
          text: "ยาต้านจุลชีพที่มีการแนะนำ (Antimicrobial Recommendation)",
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
        },
        grid: {
          padding: {
            // left: 80,
            // right: 20,
            bottom: 10,
          },
        },
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
