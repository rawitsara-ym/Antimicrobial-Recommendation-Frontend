<template>
  <div
    class="flex flex-col mt-8 p-4 border border-solid border-gray-300 rounded-lg"
  >
    <h4 class="text-lg font-semibold">Model Performance</h4>
    <div v-show="antimicrobial" class="flex justify-center mt-8">
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <performance-by-antimicrobial-chart
          ref="performanceByAntimicrobialChart"
        />
      </div>
    </div>
    <div v-show="version != null" class="flex flex-col items-center">
      <div class="flex justify-between my-8 w-full gap-x-4">
        <div class="w-4/6 border border-solid pt-2">
          <performance-by-version-chart ref="performanceByVersionChart" />
        </div>
        <div class="w-7/12 border border-solid pt-2">
          <test-by-case-chart ref="testByCaseChart" />
        </div>
      </div>
      <div v-if="version == 0" class="w-1/2 border border-solid pt-2 mb-6">
        <version-chart ref="versionChart" />
      </div>
    </div>
    <performance-table
      v-if="!antimicrobial"
      :version="version"
      :performances="performance"
    />
  </div>
</template>

<script>
import PerformanceTable from "./PerformanceTable.vue";
import PerformanceByAntimicrobialChart from "./dashboard/PerformanceByAntimicrobialChart.vue";
import PerformanceByVersionChart from "./dashboard/PerformanceByVersionChart.vue";
import TestByCaseChart from "./dashboard/TestByCaseChart.vue";
import VersionChart from "./dashboard/VersionChart.vue";

export default {
  name: "PerformanceDashboard",
  components: {
    PerformanceTable,
    PerformanceByAntimicrobialChart,
    PerformanceByVersionChart,
    TestByCaseChart,
    VersionChart,
  },
  props: ["version", "antimicrobial", "vitekId"],
  data() {
    return {
      performance: []
    }
  },
  // created() {
  //   this.getPerformance();
  //   this.getPerfAntimicrobial();
  // },
  methods: {
    getPerformance() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_performance_by_version`, {
          params,
        })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.performances;
            let test_by_case = res.pop();
            this.performance = response.data.data.performances;
            this.updatePerfByVersionChart(res);
            this.updateTestByCaseChart(test_by_case);
            this.updateVersionChart(res);
          }
        });
    },

    getPerfAntimicrobial() {
      let params = {
        antimicrobial_id: this.antimicrobial,
      };
      this.axios
        .get(`${this.host}/api/dashboard_performance_by_antimicrobial`, {
          params,
        })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.performances;
            let series = [
              {
                name: "Accuracy",
                data: res.map(({ accuracy }) => accuracy.toFixed(3)),
              },
              {
                name: "Precision",
                data: res.map(({ precision }) => precision.toFixed(3)),
              },
              {
                name: "Recall",
                data: res.map(({ recall }) => recall.toFixed(3)),
              },
              {
                name: "F1-Score",
                data: res.map(({ f1 }) => f1.toFixed(3)),
              },
            ];
            let options = {
              xaxis: {
                categories: res.map(({ version }) => version),
              },
            };
            this.$refs.performanceByAntimicrobialChart.updateChart(
              options,
              series
            );
          }
        });
    },

    updatePerfByVersionChart(res) {
      let series = [
        {
          name: "Accuracy",
          data: res.map(({ accuracy }) => accuracy.toFixed(3)),
        },
        {
          name: "Precision",
          data: res.map(({ precision }) => precision.toFixed(3)),
        },
        {
          name: "Recall",
          data: res.map(({ recall }) => recall.toFixed(3)),
        },
        {
          name: "F1-Score",
          data: res.map(({ f1 }) => f1.toFixed(3)),
        },
      ];
      let options = {
        xaxis: {
          categories: res.map(({ antimicrobial }) =>
            this.upperFirst(antimicrobial)
          ),
        },
      };
      this.$refs.performanceByVersionChart.updateChart(options, series);
    },

    updateTestByCaseChart(res) {
      let series = [
        {
          name: "Performance",
          data: [
            res.accuracy.toFixed(3),
            res.precision.toFixed(3),
            res.recall.toFixed(3),
            res.f1.toFixed(3),
          ],
        },
      ];
      let options = {
        xaxis: {
          categories: ["Accuracy", "Precision", "Recall", "F1-Score"],
        },
      };
      this.$refs.testByCaseChart.updateChart(options, series);
    },

    updateVersionChart(res) {
      let series = [
        {
          name: "Version",
          data: res.map(({ version }) => version),
        },
      ];
      let options = {
        xaxis: {
          categories: res.map(({ antimicrobial }) =>
            this.upperFirst(antimicrobial)
          ),
        },
      };
      this.$refs.versionChart.updateChart(options, series);
    },
  },
  watch: {
    antimicrobial(value) {
      if (value) {
        this.getPerfAntimicrobial();
      }
    },
    version(value) {
      if (value != null) {
        this.getPerformance();
      }
    },
  },
};
</script>
