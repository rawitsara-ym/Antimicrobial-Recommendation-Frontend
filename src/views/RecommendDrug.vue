<template>
  <div class="flex flex-col items-center">
    <p class="text-2xl font-semibold my-6">Antimicrobial Recommedation</p>
    <feature-form ref="featureForm" @EmitForm="getFeatureForm" class="mb-8" />
    <antimicrobial-form ref="antimicrobialForm" v-show="show_sir_name" @EmitForm="getAntimicrobialForm" @EmitSirName="showSirName" :vitekId=body.vitek_id />
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
    <div v-show="show_loading" style="border-top-color:transparent"
      class="w-8 h-8 border-4 border-blue-200 border-solid rounded-full animate-spin m-8">
    </div>
    <model-result v-if="recommended" :results="model_result"/>
  </div>
</template>

<script>
import axios from 'axios';
import FeatureForm from '../components/FeatureForm.vue';
import AntimicrobialForm from '../components/AntimicrobialForm.vue';
import ModelResult from '../components/ModelResult.vue'

export default {
  name: 'RecommendDrug',
  components: {
    FeatureForm,
    AntimicrobialForm,
    ModelResult,
  },
  data() {
    return {
      host: 'http://localhost:8000',
      body: {
          species: '',
          bact_genus: '',
          vitek_id: '',
          submitted_sample: '',
          sir: {}
        },
      model_result: {},
      recommended: false,
      show_loading: false,
      show_sir_name: false
    };
  },
  methods: {
    getRecommend() {
      this.show_loading = true
      this.recommended = false
      this.body.sir = this.filterObjectByValue(this.body.sir, null)
      axios
        .post(`${this.host}/api/predict`, this.body)
        .then((response) => {
          this.model_result = response.data.answer
          console.log(response.data.answer);
          this.show_loading = false
          this.recommended = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFeatureForm(form) {
      this.body.species = form.species;
      this.body.bact_genus = form.bacteria_genus;
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
    filterObjectByValue(obj, filter) {
      const array = Object.entries(obj);
      const filteredArr = array.filter(function (items) {
        return items[1] !== filter;
      });
      return Object.fromEntries(filteredArr);
    },
  },
  computed: {
    disableRecommend() {
      return !this.body.species || !this.body.bact_genus || !this.body.submitted_sample || !this.body.vitek_id;
    }
  }
};
</script>