<template>
  <div>
    <apexchart type="line" :options="options" :series="series"></apexchart>
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
        },
        markers: {
          size: 5,
        },
        title: {
          text: "จำนวน Case ในแต่ละปี",
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
    this.getCaseCount();
  },
  methods: {
    getCaseCount() {
      let res = [
        {
          date: "2018-01-31",
          count: 86,
        },
        {
          date: "2018-02-28",
          count: 66,
        },
        {
          date: "2018-03-31",
          count: 76,
        },
      ];
      this.options.xaxis.categories = res.map(({ date }) => date);
      this.series = [
          {
              name: 'Case',
              data: res.map(({ count }) => count)
          }
      ]
    },
  },
};
</script>
