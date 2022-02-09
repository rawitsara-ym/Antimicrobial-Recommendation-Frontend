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
  name: "PerformanceByAntimicrobialChart",
  data() {
    return {
      options: {
        chart: {
          id: "antimicrobial model performance",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 1,
        //   labels: {
        //     formatter: function (val) {
        //       return val.toFixed(2);
        //     },
        //   },
        },
        markers: {
          size: 5,
        },
        theme: {
          palette: "palette2", // upto palette10
        },
        title: {
          text: "ประสิทธิภาพของโมเดลในแต่ละ Version",
          align: "center",
          // margin: 50,
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
