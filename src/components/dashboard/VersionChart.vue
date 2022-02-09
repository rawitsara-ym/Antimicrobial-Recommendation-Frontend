<template>
  <div>
    <apexchart
      ref="chart"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "VersionChart",
  data() {
    return {
      options: {
        chart: {
          id: "model version",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
        markers: {
          size: 5,
        },
        theme: {
          palette: "palette1", // upto palette10
        },
        title: {
          text: "Version ของแต่ละโมเดล",
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
