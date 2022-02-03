<template>
  <div class="flex flex-col mb-8 h-full">
    <h1 class="text-center text-2xl font-semibold my-6">Model Dashboard</h1>
    <select-dashboard :host="host" @EmitForm="getForm" />
  </div>
</template>

<script>
import SelectDashboard from "../components/SelectDashboard.vue";

export default {
  name: "DashboardPage",
  components: {
    SelectDashboard,
  },
  props: ["host"],
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
};
</script>
