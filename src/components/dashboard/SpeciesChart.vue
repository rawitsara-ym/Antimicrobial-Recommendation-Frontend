<template>
  <div>
    <apexchart type="pie" :options="options" :series="series"></apexchart>
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
  created() {
    this.getSpeciesDb();
  },
  methods: {
    getSpeciesDb() {
      let res = [
        {
          species: "cat",
          count: 822,
        },
        {
          species: "dog",
          count: 1206,
        },
        {
          species: "other",
          count: 15,
        },
      ];
      this.options.labels = res.map(({ species }) => species);
      this.series = res.map(({ count }) => count);
    },
  },
};
</script>
