<template>
  <div class="flex flex-col mb-8">
    <h1 class="text-center text-2xl font-semibold my-6">Model Dashboard</h1>
    <select-dashboard @EmitForm="getForm" />
    <performance-chart v-if="showDashboard" :version="version" :antimicrobial="antimicrobial"/>
    <div v-else class="flex justify-center items-center my-8">
      <h3>No Dashboard</h3>
    </div>
  </div>
</template>

<script>
import SelectDashboard from "../components/SelectDashboard.vue";
import PerformanceChart from "../components/PerformanceChart.vue";

export default {
  name: "DashboardPage",
  components: {
    SelectDashboard,
    PerformanceChart,
  },
  data() {
    return {
      vitek_id: null,
      version: null,
      antimicrobial: null,
    };
  },
  methods: {
    getForm(form) {
      this.vitek_id = form.vitek_id;
      this.version = form.version;
      this.antimicrobial = form.antimicrobial;
      console.log(form);
    },
  },
  computed: {
    showDashboard() {
      return this.version != null || this.antimicrobial;
    },
  },
};
</script>
