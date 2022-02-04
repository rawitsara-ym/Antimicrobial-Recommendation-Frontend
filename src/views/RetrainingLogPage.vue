<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-2xl font-semibold my-6">Retraining Log</h1>
    <retraining-log />
  </div>
</template>

<script>
import RetrainingLog from "../components/RetrainingLog.vue";

export default {
  name: "RetrainingLogPage",
  components: {
    RetrainingLog,
  },
};
</script>
