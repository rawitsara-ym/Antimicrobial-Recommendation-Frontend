<template>
  <div>
    <apexchart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "SirChart",
  data() {
    return {
      options: {
        chart: {
          id: "sir result",
          toolbar: {
            show: true,
          },
          stacked: true
        },
        xaxis: {
          categories: [],
        },
        theme: {
          palette: "palette7",
        },
        title: {
          text: "ผลการทดสอบความไวต่อยาต้านจุลชีพ (S/I/R/POS/NEG)",
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
        },
        grid: {
          padding: {
            // left: 40,
            // right: 20,
            bottom: 10,
          },
        },
      },
      series: [],
    };
  },
  created() {
    this.getSirDb()
  },
  methods: {
    getSirDb() {
      let res = [
        {
          name: "Amikacin",
          count: {
            s: 1006,
            i: 120,
            r: 500,
            pos: 0,
            neg: 0,
          }
        },
        {
          name: "Doxycycline",
          count: {
            s: 806,
            i: 220,
            r: 300,
            pos: 0,
            neg: 0,
          }
        },
        {
          name: "Enrofloxacin",
          count: {
            s: 806,
            i: 50,
            r: 500,
            pos: 0,
            neg: 0,
          }
        },
        {
          name: "Enrofloxacin",
          count: { 
            s: 1006,
            i: 120,
            r: 500,
            pos: 0,
            neg: 0,
          }
        },
        {
          name: "Nitrofurantoin",
          count: { 
            s: 910,
            i: 120,
            r: 600,
            pos: 0,
            neg: 0,
          }
        },
        {
          name: "Trimethoprim/sulfamethoxazole",
          count: { 
            s: 1406,
            i: 10,
            r: 606,
            pos: 0,
            neg: 0,
          }
        },
        {
          name: "esbl",
          count: { 
            s: 0,
            i: 0,
            r: 0,
            pos: 1200,
            neg: 500,
          }
        },
      ];
      this.series = [
        {
          name: "R",
          data: res.map(({ count }) => count.r),
        },
        {
          name: "I",
          data: res.map(({ count }) => count.i),
        },
        {
          name: "S",
          data: res.map(({ count }) => count.s),
        },
        {
          name: "POS",
          data: res.map(({ count }) => count.pos),
        },
        {
          name: "NEG",
          data: res.map(({ count }) => count.neg),
        },
      ];
      this.options.xaxis.categories = res.map(({ name }) =>
        (name == 'esbl') ? name.toUpperCase() : this.upperFirst(name)
      );
    },
  },
};
</script>
