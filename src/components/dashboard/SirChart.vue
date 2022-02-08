<template>
  <div>
    <apexchart
      ref="chart"
      type="bar"
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
        colors: ['#FF4560', '#FEB019', '#4CAF50', '#F86624', '#008FFB'],
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
            fontWeight: "bold",
            fontFamily: undefined,
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
