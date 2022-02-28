<template>
  <div class="flex flex-col mb-8">
    <h1
      class="text-gray-800 text-center text-xl sm:text-2xl font-semibold my-6"
    >
      Model Dashboard
    </h1>
    <select-dashboard
      ref="selectDashboard"
      :modelVitekId="modelVitekId"
      :modelVersion="modelVersion"
      @EmitForm="getForm"
      @ShowMode="setMode"
      :modelGroupId="model_group_id"
    />
    <div v-show="showDashboard">
      <performance-dashboard
        v-if="mode === 1"
        :version="version"
        :antimicrobial="antimicrobial"
        :vitekId="vitek_id"
        @ModelGroupId="getModelGroupId"
      />
      <dataset-dashboard
        v-if="mode === 2"
        :vitekId="vitek_id"
        :version="version"
      />
    </div>
    <div v-show="!showDashboard" class="flex justify-center items-center my-8">
      <h3>No Dashboard</h3>
    </div>
  </div>
</template>

<script>
import SelectDashboard from "../components/SelectDashboard.vue";
import PerformanceDashboard from "../components/PerformanceDashboard.vue";
import DatasetDashboard from "../components/DatasetDashboard.vue";

export default {
  name: "DashboardPage",
  components: {
    SelectDashboard,
    PerformanceDashboard,
    DatasetDashboard,
  },
  props: ["modelVitekId", "modelVersion"],
  data() {
    return {
      vitek_id: null,
      version: null,
      antimicrobial: null,
      model_group_id: null,
      mode: 1,
    };
  },
  methods: {
    getForm(form) {
      this.vitek_id = form.vitek_id;
      this.version = form.version;
      this.antimicrobial = form.antimicrobial;
      // console.log(form);
    },
    getModelGroupId(modelGroupId) {
      this.model_group_id = modelGroupId;
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
