<template>
  <div class="h-full p-2 sm:p-4">
    <apexchart
      ref="chart"
      type="pie"
      height="100%"
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
        legend: {
            position: 'bottom',
        },
        responsive: [
          {
            breakpoint: 10000,
            options: {
              title: {
                style: {
                  fontSize: "16px",
                },
              },
              legend: {
                fontSize: "12px",
              },
            },
          },
          {
            breakpoint: 640,
            options: {
              title: {
                style: {
                  fontSize: "12px",
                },
              },
              legend: {
                fontSize: "10px",
              },
            },
          },
        ],
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
