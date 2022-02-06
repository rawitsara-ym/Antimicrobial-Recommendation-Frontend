<template>
  <div>
    <apexchart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "SubmittedSampleChart",
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
          palette: "palette3",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        title: {
          text: "Top 10 ตัวอย่างที่ส่งตรวจ (ฺSubmitted Sample)",
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
    this.getSubmittedSampleDb()
  },
  methods: {
    getSubmittedSampleDb() {
      let res = [
        {
          name: "abdomen",
          count: 1206,
        },
        {
          name: "blood",
          count: 1000,
        },
        {
          name: "crust from skin",
          count: 845,
        },
        {
          name: "ear wound",
          count: 798,
        },
        {
          name: "saliva",
          count: 598,
        },
      ];
      this.series = [
        {
          name: "Submitted Sample",
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
