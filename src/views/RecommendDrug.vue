<template>
  <div class="flex flex-col items-center">
    <p class="text-2xl font-semibold my-8">Antimicrobial Recommedation</p>
    <feature-form class="mb-8" />
    <antimicrobial-form />
    <div class="mt-8">
      <button
        @click="getRecommend()"
        class="bg-blue-2 text-white-1 font-semibold py-2 px-6 rounded"
      >
        Recommend
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FeatureForm from "../components/FeatureForm.vue";
import AntimicrobialForm from "../components/AntimicrobialForm.vue";

export default {
  name: "RecommendDrug",
  components: {
    FeatureForm,
    AntimicrobialForm,
  },
  data() {
    return {
      host: "http://localhost:8000",
      body: {
          species: "dog",
          bact_species: "Staphylococcus pseudintermedius",
          vitek_id: "gp",
          submitted_sample: "urine",
          sir: {}
        }
    };
  },
  methods: {
    getRecommend() {
      axios
        .post(`${this.host}/api/predict`, this.body)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>