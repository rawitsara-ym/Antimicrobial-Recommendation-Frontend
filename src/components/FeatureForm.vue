<template>
  <div class="grid grid-cols-2 gap-6 col-gap">
    <div class="grid grid-col-2">
      <label for="species" class="text-right mr-8"
        >Species<span class="text-red-1"> *</span></label
      >
      <select
        @change="emitForm"
        v-model="species"
        class="w-full border border-solid border-gray-300 rounded px-2"
      >
        <option
          v-for="(item, index) in species_options"
          :key="index"
          :value="item"
        >
          {{ upperFirst(item) }}
        </option>
      </select>
    </div>
    <div class="grid grid-col-2">
      <label for="bact_genus" class="text-right mr-8"
        >Bacteria Genus<span class="text-red-1"> *</span></label
      >
      <!-- <input
        @input="emitForm"
        v-model="bact_genus"
        class="w-full border border-solid border-gray-300 rounded"
      /> -->
      <autocomplete
        ref="bactGenusInput"
        :list="bact_genus_list"
        @inputValue="handleInputBactGenus"
      />
    </div>
    <div class="grid grid-col-2">
      <label for="submitted_sample" class="text-right mr-8"
        >Submitted Sample<span class="text-red-1"> *</span></label
      >
      <!-- <input
        @input="emitForm"
        v-model="submitted_sample"
        class="w-full border border-solid border-gray-300 rounded"
      /> -->
      <autocomplete
        ref="submittedSampleInput"
        :list="submitted_sample_list"
        @inputValue="handleInputSubmittedSample"
      />
    </div>
    <div class="grid grid-col-2">
      <label for="vitek_id" class="text-right mr-8"
        >Vitek ID Card<span class="text-red-1"> *</span></label
      >
      <select
        @change="emitForm"
        v-model="vitek_id"
        class="w-full border border-solid border-gray-300 rounded px-2"
      >
        <option
          v-for="(item, index) in vitek_id_options"
          :key="index"
          :value="item"
        >
          {{ item.toUpperCase() }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Autocomplete from "./Autocomplete.vue";

export default {
  name: "FeatureForm",
  components: {
    Autocomplete,
  },
  data() {
    return {
      host: "http://localhost:8000",
      species: "",
      bact_genus: "",
      submitted_sample: "",
      vitek_id: "",
      species_options: [],
      vitek_id_options: [],
      feature: {},
      bact_genus_list: [],
      submitted_sample_list: [],
    };
  },
  created() {
    this.getSpecies();
    this.getVitekId();
    this.getBactGenus();
    this.getSubmittedSample();
  },
  methods: {
    handleInputBactGenus(e) {
      this.bact_genus = e;
      this.emitForm();
    },
    handleInputSubmittedSample(e) {
      this.submitted_sample = e;
      this.emitForm();
    },
    getSpecies() {
      axios.get(`${this.host}/api/species`).then((response) => {
        if (response.data.status == "success") {
          this.species_options = response.data.data.species;
        }
      });
    },
    getVitekId() {
      axios.get(`${this.host}/api/vitek_id`).then((response) => {
        if (response.data.status == "success") {
          this.vitek_id_options = response.data.data.vitek_id;
        }
      });
    },
    getBactGenus() {
      axios.get(`${this.host}/api/bact_genus`).then((response) => {
        if (response.data.status == "success") {
          this.bact_genus_list = response.data.data.bact_genus;
        }
      });
    },
    getSubmittedSample() {
      axios.get(`${this.host}/api/submitted_sample`).then((response) => {
        if (response.data.status == "success") {
          this.submitted_sample_list = response.data.data.submitted_sample;
        }
      });
    },
    emitForm() {
      this.feature = {
        species: this.species,
        bact_genus: this.bact_genus,
        submitted_sample: this.submitted_sample,
        vitek_id: this.vitek_id,
      };
      this.$emit("EmitForm", this.feature);
    },
    clearInput() {
      this.species = null;
      this.bact_genus = null;
      this.submitted_sample = null;
      this.vitek_id = null;
      this.$refs.bactGenusInput.clearInput();
      this.$refs.submittedSampleInput.clearInput();
      this.emitForm();
    },
    upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  },
};
</script>

<style scoped>
.grid-col-2 {
  grid-template-columns: 1fr 1.5fr;
}
.col-gap {
  column-gap: 60px;
}
</style>
