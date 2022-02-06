<template>
  <div class="flex flex-col mb-8">
    <h1 class="text-center text-2xl font-semibold my-6">Model Dashboard</h1>
    <select-dashboard @EmitForm="getForm" @ShowMode="setMode" />
    <div v-if="showDashboard">
      <performance-chart
        v-if="mode === 1"
        :version="version"
        :antimicrobial="antimicrobial"
      />
      <dataset-dashboard v-if="mode === 2" />
    </div>
    <div v-else class="flex justify-center items-center my-8">
      <h3>No Dashboard</h3>
    </div>
  </div>
</template>

<script>
import SelectDashboard from "../components/SelectDashboard.vue";
import PerformanceChart from "../components/PerformanceChart.vue";
import DatasetDashboard from "../components/DatasetDashboard.vue";

export default {
  name: "DashboardPage",
  components: {
    SelectDashboard,
    PerformanceChart,
    DatasetDashboard,
  },
  data() {
    return {
      vitek_id: null,
      version: null,
      antimicrobial: null,
      mode: 1,
    };
  },
  methods: {
    getForm(form) {
      this.vitek_id = form.vitek_id;
      this.version = form.version;
      this.antimicrobial = form.antimicrobial;
      console.log(form);
    },
    setMode(mode) {
      this.mode = mode;
    },
  },
  computed: {
    showDashboard() {
      return this.version != null || this.antimicrobial;
    },
  },
};
</script>
