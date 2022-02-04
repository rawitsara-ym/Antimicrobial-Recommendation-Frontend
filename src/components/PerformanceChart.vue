<template>
  <div
    class="flex flex-col items-center mt-8 p-4 border border-solid border-gray-300 rounded-lg"
  >
    <h4 class="text-lg font-semibold">Model Performance</h4>
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
    <performance-table :version="version" />
  </div>
</template>

<script>
import PerformanceTable from "./PerformanceTable.vue";

export default {
  name: "PerformanceChart",
  components: {
    PerformanceTable,
  },
  props: ["version"],
  data() {
    return {
      performance_options: {
        chart: {
          id: "performance",
        },
        xaxis: {
          categories: [],
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
      testbycase_options: {
        chart: {
          id: "test_by_case",
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
      version_options: {
        chart: {
          id: "performance",
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
        theme: {
          palette: "palette2", // upto palette10
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
            bottom: 10,
          },
        },
      },
      performance_series: [],
      testbycase_series: [],
      version_series: [],
    };
  },
  created() {
    this.getPerformance();
  },
  methods: {
    getPerformance() {
      this.performance_series = [
        {
          name: "Accuracy",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 70, 45],
        },
        {
          name: "Precision",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 70, 45],
        },
        {
          name: "Recall",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 70, 45],
        },
        {
          name: "F1-Score",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 70, 45],
        },
      ];
      this.performance_options.xaxis.categories = [
        "amikacin",
        "amoxicillin/clavulanic acid",
        "cefalexin",
        "cefovecin",
        "doxycycline",
        "enrofloxacin",
        "gentamicin",
        "imipenem",
        "marbofloxacin",
        "nitrofurantoin",
        "trimethoprim/sulfamethoxazole",
      ];
      this.version_options.xaxis.categories = [
        "amikacin",
        "amoxicillin/clavulanic acid",
        "cefalexin",
        "cefovecin",
        "doxycycline",
        "enrofloxacin",
        "gentamicin",
        "imipenem",
        "marbofloxacin",
        "nitrofurantoin",
        "trimethoprim/sulfamethoxazole",
      ];
      this.testbycase_series = [
        {
          name: "Performance",
          data: [95.48, 76.11, 89.99, 82.45],
        },
      ];
      this.version_series = [
        {
          name: "Version",
          data: [1, 2, 4, 3, 2, 5, 4, 5, 1, 4, 3],
        },
      ];
    },
  },
};
</script>
