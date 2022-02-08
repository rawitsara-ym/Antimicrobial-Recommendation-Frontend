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
  name: "CaseCountChart",
  data() {
    return {
      options: {
        chart: {
          id: "Case Count",
        },
        theme: {
          palette: "palette1",
        },
        xaxis: {
          categories: [],
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
            },
            // format: "yyyy-MM",
          },
        },
        tooltip: {
          x: {
            format: "MMM 'yy",
          },
        },
        markers: {
          size: 5,
        },
        title: {
          text: "จำนวนรายงานผลตรวจ",
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
