<template>
  <div>
    <apexchart type="bar" :options="options" :series="series"></apexchart>
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
        theme: {
          palette: "palette2",
        },
        plotOptions: {
          bar: {
            horizontal: true,
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
            position: 'right',
        }
      },
      series: [],
    };
  },
  created() {
    this.getBacteriaGenusDb()
  },
  methods: {
    getBacteriaGenusDb() {
      let res = [
        {
          name: "achromobacter",
          count: 1206,
        },
        {
          name: "bordetella",
          count: 1000,
        },
        {
          name: "corynebacterium",
          count: 845,
        },
        {
          name: "rhizobium",
          count: 798,
        },
        {
          name: "stenotrophomonas",
          count: 598,
        },
      ];
      this.series = [
        {
          name: "Bacteria Genus",
          data: res.map(({ count }) => count),
        },
      ];
      this.options.xaxis.categories = res.map(({ name }) =>
        this.upperFirst(name)
      );
    },
  },
};
</script>
