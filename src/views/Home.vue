<template>
  <div class="bg-style" :style="`background-image: url(${background});`"></div>
  <div class="flex flex-col lg:justify-center h-full-screen pb-32 md:space-y-12">
    <div
      class="text-3xl md:text-5xl font-semibold text-gray-1 md:space-y-2 mt-20 "
    >
      <p>Antimicrobial</p>
      <p>Recommendation in Pet</p>
    </div>
    <ul class="list-disc ml-6 my-8">
      <li class="text-md md:text-2xl font-semibold text-gray-2">
        Recommend antibiotic in pet with ML models
      </li>
      <li class="text-md md:text-2xl font-semibold text-gray-2">
        Upload files to retrain models automatically
      </li>
    </ul>
    <div>
      <button
        @click="getStarted"
        class="bg-yellow-1 text-gray-1 font-bold py-2 px-6 rounded"
      >
        GET STARTED
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      background: require("../assets/bg-home.png"),
    };
  },
  methods: {
    getStarted() {
      this.$router.push("/recommend-drug");
    },
  },
};
</script>

<style scoped>
.bg-style {
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right bottom;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: -1;
}
</style>
