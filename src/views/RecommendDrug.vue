<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-2xl font-semibold my-6">Antimicrobial Recommedation</h1>
    <feature-form ref="featureForm" @EmitForm="getFeatureForm" class="mb-8" />
    <antimicrobial-form
      ref="antimicrobialForm"
      v-show="show_sir_name"
      @EmitForm="getAntimicrobialForm"
      @EmitSirName="showSirName"
      :vitekId="body.vitek_id"
    />
    <div class="mt-8 flex gap-x-4">
      <button
        @click="getRecommend()"
        :disabled="disableRecommend"
        :class="{ 'opacity-50 cursor-not-allowed': disableRecommend }"
        class="bg-blue-2 text-white-1 font-semibold py-2 px-6 rounded"
      >
        Recommend
      </button>
      <button
        @click="clearInput()"
        class="bg-yellow-1 text-gray-1 font-semibold py-2 px-6 rounded"
      >
        Clear
      </button>
    </div>
    <loader v-if="show_loading" />
    <model-result v-if="recommended" :results="model_result" />
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../components/Loader.vue";
import FeatureForm from "../components/FeatureForm.vue";
import AntimicrobialForm from "../components/AntimicrobialForm.vue";
import ModelResult from "../components/ModelResult.vue";

export default {
  name: "RecommendDrug",
  components: {
    Loader,
    FeatureForm,
    AntimicrobialForm,
    ModelResult,
  },
  data() {
    return {
      body: {
        species: "",
        bact_genus: "",
        vitek_id: "",
        submitted_sample: "",
        sir: {},
      },
      model_result: {},
      recommended: false,
      show_loading: false,
      show_sir_name: false,
    };
  },
  methods: {
    getRecommend() {
      this.show_loading = true;
      this.recommended = false;
      this.body.sir = this.filterObjectByValue(this.body.sir, null);
      axios
        .post(`${this.host}/api/predict`, this.body)
        .then((response) => {
          this.model_result = response.data.answer;
          this.show_loading = false;
          this.recommended = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFeatureForm(form) {
      this.body.species = form.species;
      this.body.bact_genus = form.bact_genus;
      this.body.submitted_sample = form.submitted_sample;
      this.body.vitek_id = form.vitek_id;
      // console.log(form);
    },
    getAntimicrobialForm(form) {
      this.body.sir = form;
      // console.log(form);
    },
    showSirName() {
      this.show_sir_name = true;
    },
    clearInput() {
      this.$refs.featureForm.clearInput();
      this.$refs.antimicrobialForm.clearInput();
      this.show_sir_name = false;
      this.recommended = false;
    },
    filterObjectByValue(obj, value) {
      const array = Object.entries(obj);
      const filteredArr = array.filter(function (items) {
        return items[1] !== value;
      });
      return Object.fromEntries(filteredArr);
    },
  },
  computed: {
    disableRecommend() {
      return (
        !this.body.species ||
        !this.body.bact_genus ||
        !this.body.submitted_sample ||
        !this.body.vitek_id
      );
    },
  },
};
</script>
