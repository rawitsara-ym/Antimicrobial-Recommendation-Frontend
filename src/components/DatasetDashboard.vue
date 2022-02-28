<template>
  <div
    class="flex flex-col mt-4 p-2 sm:p-6 border border-solid border-gray-300 rounded-lg"
  >
    <h4 class="text-lg font-medium mb-4 sm:mb-8">Dataset</h4>
    <div class="flex flex-col gap-y-8">
      <div
        class="flex flex-col xl:flex-row justify-between w-full gap-x-4 gap-y-8"
      >
        <div class="chart-res w-full xl:w-3/5 border border-solid pt-2">
          <case-count-chart ref="caseCountChart" />
        </div>
        <div class="chart-res w-full xl:w-1/2 border border-solid pt-2">
          <species-chart ref="speciesChart" />
        </div>
      </div>
      <div
        class="flex flex-col xl:flex-row justify-between w-full gap-x-4 gap-y-8"
      >
        <div class="chart-res w-full xl:w-1/2 border border-solid pt-2">
          <bacteria-genus-chart ref="bacteriaGenusChart" />
        </div>
        <div class="chart-res w-full xl:w-1/2 border border-solid pt-2">
          <submitted-sample-chart ref="submittedSampleChart" />
        </div>
      </div>
      <div
        class="flex flex-col 2xl:flex-row justify-between w-full gap-x-4 gap-y-8"
      >
        <div class="chart-res w-full 2xl:w-1/2 border border-solid pt-2">
          <sir-chart ref="sirChart" />
        </div>
        <div class="chart-res w-full 2xl:w-1/2 border border-solid pt-2">
          <answer-chart ref="answerChart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CaseCountChart from "./dashboard/CaseCountChart.vue";
import SpeciesChart from "./dashboard/SpeciesChart.vue";
import BacteriaGenusChart from "./dashboard/BacteriaGenusChart.vue";
import SubmittedSampleChart from "./dashboard/SubmittedSampleChart.vue";
import SirChart from "./dashboard/SirChart.vue";
import AnswerChart from "./dashboard/AnswerChart.vue";

export default {
  name: "DatasetDashboard",
  components: {
    CaseCountChart,
    SpeciesChart,
    BacteriaGenusChart,
    SubmittedSampleChart,
    SirChart,
    AnswerChart,
  },
  props: ["vitekId", "version"],
  mounted() {
    this.getCaseCountDb();
    this.getSpeciesDb();
    this.getBacteriaGenusDb();
    this.getSubmittedSampleDb();
    this.getSirDb();
    this.getAnswerDb();
  },
  methods: {
    getCaseCountDb() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_case`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.cases;
            let series = [
              {
                name: "Case",
                data: res.map(({ count }) => count),
              },
            ];
            let options = {
              xaxis: {
                categories: res.map(({ date }) => date),
              },
            };
            this.$refs.caseCountChart.updateChart(options, series);
          }
        });
    },
    getSpeciesDb() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_species`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.species;
            let series = res.map(({ count }) => count);
            let options = {
              labels: res.map(({ name }) => this.upperFirst(name)),
            };
            this.$refs.speciesChart.updateChart(options, series);
          }
        });
    },
    getBacteriaGenusDb() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_bacteria_genus`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.bacteria_genus;
            let series = [
              {
                name: "Bacteria Genus",
                data: res.map(({ count }) => count),
              },
            ];
            let options = {
              xaxis: {
                categories: res.map(({ name }) => this.upperFirst(name)),
              },
            };
            this.$refs.bacteriaGenusChart.updateChart(options, series);
          }
        });
    },
    getSubmittedSampleDb() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_submitted_sample`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.submitted_sample;
            let series = [
              {
                name: "Submitted Sample",
                data: res.map(({ count }) => count),
              },
            ];
            let options = {
              xaxis: {
                categories: res.map(({ name }) => this.upperFirst(name)),
              },
            };
            this.$refs.submittedSampleChart.updateChart(options, series);
          }
        });
    },
    getSirDb() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_antimicrobial_sir`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.antimicrobial_sir;
            let series = [
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
            let options = {
              xaxis: {
                categories: res.map(({ name }) =>
                  name == "esbl" ? name.toUpperCase() : this.upperFirst(name)
                ),
              },
            };
            this.$refs.sirChart.updateChart(options, series);
          }
        });
    },
    getAnswerDb() {
      let params = {
        vitek_id: this.vitekId,
        version: this.version,
      };
      this.axios
        .get(`${this.host}/api/dashboard_antimicrobial_answer`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let res = response.data.data.antimicrobial_answers;
            let series = [
              {
                name: "Antimicrobal",
                data: res.map(({ count }) => count),
              },
            ];
            let options = {
              xaxis: {
                categories: res.map(({ name }) => this.upperFirst(name)),
              },
            };
            this.$refs.answerChart.updateChart(options, series);
          }
        });
    },
  },
  watch: {
    version(value) {
      if (value != null) {
        this.getCaseCountDb();
        this.getSpeciesDb();
        this.getBacteriaGenusDb();
        this.getSubmittedSampleDb();
        this.getSirDb();
        this.getAnswerDb();
      }
    },
  },
};
</script>

<style scoped>
.chart-res {
  height: 325px;
}
.chart-res-2 {
  height: 250px;
}
.chart-res-3 {
  height: 350px;
}
@media (min-width: 640px) {
  .chart-res {
    height: 450px;
  }
  .chart-res-2 {
    height: 450px;
  }
  .chart-res-3 {
    height: 450px;
  }
}
</style>
