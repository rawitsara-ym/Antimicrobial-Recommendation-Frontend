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
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        legend: {
          itemMargin: {
            horizontal: 5,
            vertical: 15,
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
