<template>
  <div>
    <apexchart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "AnswerChart",
  data() {
    return {
      options: {
        chart: {
          id: "antimicrobial recommentdation",
          toolbar: {
            show: true,
          },
          stacked: true
        },
        xaxis: {
          categories: [],
        },
        theme: {
          palette: "palette4",
        },
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        title: {
          text: "ยาต้านจุลชีพที่มีการแนะนำ (Antimicrobial Recommendation)",
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
          count: 1000
        },
        {
          name: "Doxycycline",
          count: 900
        },
        {
          name: "Enrofloxacin",
          count: 800
        },
        {
          name: "Enrofloxacin",
          count: 700
        },
        {
          name: "Nitrofurantoin",
          count: 600
        },
        {
          name: "Trimethoprim/sulfamethoxazole",
          count: 500
        },
      ];
      this.series = [
        {
          name: "Antimicrobial",
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
