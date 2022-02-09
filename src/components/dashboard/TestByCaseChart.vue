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
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        xaxis: {
          categories: [],
        },
        // dataLabels: {
        //   enabled: false,
        // }
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
