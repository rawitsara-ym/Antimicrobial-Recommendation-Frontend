<template>
  <div
    class="flex flex-col mt-8 p-4 border border-solid border-gray-300 rounded-lg"
  >
    <h4 class="text-lg font-semibold">Dataset</h4>
    <div class="flex justify-between my-8 w-full gap-x-4">
      <div class="w-3/5 border border-solid pt-2 pr-2">
        <case-count-chart />
      </div>
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <species-chart />
      </div>
    </div>
    <div class="flex justify-between my-8 w-full gap-x-4">
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <bacteria-genus-chart />
      </div>
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <submitted-sample-chart />
      </div>
    </div>
    <div class="flex justify-between my-8 w-full gap-x-4">
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <sir-chart />
      </div>
      <div class="w-1/2 border border-solid pt-2 pr-2">
        <answer-chart />
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
};
</script>
