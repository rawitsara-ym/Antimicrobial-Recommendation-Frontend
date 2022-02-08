<template>
  <div>
    <apexchart
      ref="chart"
      type="pie"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "SpeciesChart",
  data() {
    return {
      options: {
        chart: {
          id: "species",
          toolbar: {
            show: true,
          },
        },
        theme: {
          palette: "palette8",
        },
        labels: [],
        title: {
          text: "ชนิดของสัตว์เลี้ยง (Species)",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        // legend: {
        //     position: 'bottom',
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
