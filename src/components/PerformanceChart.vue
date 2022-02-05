<template>
  <div
    class="flex flex-col mt-8 p-4 border border-solid border-gray-300 rounded-lg"
  >
    <h4 class="text-lg font-semibold">Model Performance</h4>
    <div v-if="antimicrobial" class="flex justify-center mt-8">
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <apexchart
          type="line"
          :options="antimicrobial_options"
          :series="antimicrobial_series"
        ></apexchart>
      </div>
    </div>
    <div v-else class="flex flex-col items-center">
      <div class="flex justify-between my-8 w-full gap-x-4">
        <div class="w-4/6 border border-solid pt-2">
          <apexchart
            type="bar"
            :options="performance_options"
            :series="performance_series"
          ></apexchart>
        </div>
        <div class="w-7/12 border border-solid pt-2">
          <apexchart
            type="bar"
            :options="testbycase_options"
            :series="testbycase_series"
          ></apexchart>
        </div>
      </div>
      <div v-if="version == 0" class="w-1/2 border border-solid pt-2 mb-6">
        <apexchart
          type="line"
          :options="version_options"
          :series="version_series"
        ></apexchart>
      </div>
    </div>
    <performance-table
      v-if="!antimicrobial"
      :version="version"
      :performances="api_perf"
    />
  </div>
</template>

<script>
import PerformanceTable from "./PerformanceTable.vue";

export default {
  name: "PerformanceChart",
  components: {
    PerformanceTable,
  },
  props: ["version", "antimicrobial"],
  data() {
    return {
      // performance model (bar chart)
      performance_options: {
        chart: {
          id: "performance",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 1,
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "ประสิทธิภาพของแต่ละโมเดล",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        legend: {
          itemMargin: {
            horizontal: 5,
            vertical: 10,
          },
        },
      },

      // test by case (bar chart)
      testbycase_options: {
        chart: {
          id: "test_by_case",
        },
        yaxis: {
          min: 0,
          max: 1,
        },
        theme: {
          palette: "palette3", // upto palette10
        },
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        title: {
          text: "ประสิทธิภาพแบบ Test By Case",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        xaxis: {
          categories: ["Accuracy", "Precision", "Recall", "F1-Score"],
        },
        // dataLabels: {
        //   enabled: false,
        // }
      },

      // version model (line chart)
      version_options: {
        chart: {
          id: "model version",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
        markers: {
          size: 5,
        },
        theme: {
          palette: "palette1", // upto palette10
        },
        title: {
          text: "Version ของแต่ละโมเดล",
          align: "center",
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

      // antimicrobial (line chart)
      antimicrobial_options: {
        chart: {
          id: "antimicrobial model performance",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 1,
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

      performance_series: [],
      testbycase_series: [],
      version_series: [],
      antimicrobial_series: [],
    };
  },
  created() {
    this.getPerformance();
    this.getPerfAntimicrobial();
  },
  methods: {
    getPerformance() {
      let test_by_case = this.api_perf.filter(
        (obj) => obj.antimicrobial == "All Model By Case"
      )[0];
      let res = this.api_perf.filter(
        (obj) => obj.antimicrobial != "All Model By Case"
      );

      // performance model (bar chart)
      this.performance_series = [
        {
          name: "Accuracy",
          data: res.map(({ accuracy }) => accuracy),
        },
        {
          name: "Precision",
          data: res.map(({ precision }) => precision),
        },
        {
          name: "Recall",
          data: res.map(({ recall }) => recall),
        },
        {
          name: "F1-Score",
          data: res.map(({ f1 }) => f1),
        },
      ];
      this.performance_options.xaxis.categories = res.map(
        ({ antimicrobial }) => this.upperFirst(antimicrobial)
      );

      // test by case (bar chart)
      this.testbycase_series = [
        {
          name: "Performance",
          data: [
            test_by_case.accuracy,
            test_by_case.precision,
            test_by_case.recall,
            test_by_case.f1,
          ],
        },
      ];

      // version model (line chart)
      this.version_series = [
        {
          name: "Version",
          data: res.map(({ version }) => version),
        },
      ];
      this.version_options.xaxis.categories = res.map(
        ({ antimicrobial }) => this.upperFirst(antimicrobial)
      );
    },

    getPerfAntimicrobial() {
      let res = this.api_anti;
      this.antimicrobial_series = [
        {
          name: "Accuracy",
          data: res.map(({ accuracy }) => accuracy),
        },
        {
          name: "Precision",
          data: res.map(({ precision }) => precision),
        },
        {
          name: "Recall",
          data: res.map(({ recall }) => recall),
        },
        {
          name: "F1-Score",
          data: res.map(({ f1 }) => f1),
        },
      ];
      this.antimicrobial_options.xaxis.categories = res.map(
        ({ version }) => version
      );
    },
  },
};
</script>
