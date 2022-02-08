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
