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
          :value="item.id"
        >
          {{ upperFirst(item.name) }}
        </option>
      </select>
    </div>
    <div class="grid grid-col-2">
      <label for="bact_genus" class="text-right mr-8"
        >Bacteria Genus<span class="text-red-1"> *</span></label
      >
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
          :value="item.id"
        >
          {{ item.name.toUpperCase() }}
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
  props: ['host'],
  data() {
    return {
      species: "",
      bact_genus: "",
      submitted_sample: "",
      vitek_id: "",
      species_options: [],
      vitek_id_options: [],
      feature: {},
      bact_genus_list: [],
      submitted_sample_list: [{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'},{id: 1, name: 'asd'}, {id: 2, name: 'sss'}],
    };
  },
  created() {
    this.getSpecies();
    this.getVitekId();
    this.getBactGenus();
    this.getSubmittedSample();
  },
  methods: {
    handleInputBactGenus(value) {
      this.bact_genus = value;
      this.emitForm();
    },
    handleInputSubmittedSample(value) {
      this.submitted_sample = value;
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
          this.bact_genus_list = this.sortObjectByName(response.data.data.bact_genus);
        }
      });
    },
    getSubmittedSample() {
      axios.get(`${this.host}/api/submitted_sample`).then((response) => {
        if (response.data.status == "success") {
          this.submitted_sample_list = this.sortObjectByName(response.data.data.submitted_sample);
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
    sortObjectByName(obj) {
      obj.sort((a, b) => {
        let a_name = a.name.toLowerCase();
        let b_name = b.name.toLowerCase();
        if (a_name < b_name) {
          return -1;
        }
        if (a_name > b_name) {
          return 1;
        }
        return 0;
      });
      return obj;
    }
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
