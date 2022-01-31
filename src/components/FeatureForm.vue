<template>
    <div class="grid grid-cols-2 gap-6 col-gap">
    <div class="grid grid-col-2">
      <label for="species" class="text-right mr-8">Species<span class="text-red-1"> *</span></label>
      <select @change="emitForm" v-model="species" class="w-full border border-solid border-gray-300 rounded text-center">
        <option v-for="(item, index) in species_options" :key="index" :value="item">
          {{ upperFirst(item) }}
        </option>
      </select>
    </div>
    <div class="grid grid-col-2">
      <label for="bacteria_genus" class="text-right mr-8">Bacteria Genus<span class="text-red-1"> *</span></label>
      <input @input="emitForm" v-model="bacteria_genus" class="w-full border border-solid border-gray-300 rounded"/>
    </div>
    <div class="grid grid-col-2">
      <label for="submitted_sample" class="text-right mr-8">Submitted Sample<span class="text-red-1"> *</span></label>
      <input @input="emitForm" v-model="submitted_sample" class="w-full border border-solid border-gray-300 rounded"/>
    </div>
    <div class="grid grid-col-2">
      <label for="vitek_id" class="text-right mr-8">Vitek ID Card<span class="text-red-1"> *</span></label>
      <select @change="emitForm" v-model="vitek_id" class="w-full border border-solid border-gray-300 rounded text-center">
        <option v-for="(item, index) in vitek_id_options" :key="index" :value="item">
          {{ item.toUpperCase() }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FeatureForm',
  components: {

  },
  data() {
    return {
      host: 'http://localhost:8000',
      species: '',
      bacteria_genus: '',
      submitted_sample: '',
      vitek_id: '',
      species_options: [],
      vitek_id_options: [],
      feature: {},
    }
  },
  created() {
    this.getSpecies();
    this.getVitekId();
  },
  methods: {
    getSpecies() {
      axios.get(`${this.host}/api/species`)
        .then((response) => {
          if (response.data.status == 'success') {
            this.species_options = response.data.data.species;
          }
        })
    },
    getVitekId() {
      axios.get(`${this.host}/api/vitek_id`)
        .then((response) => {
          this.vitek_id_options = response.data.data.vitek_id
        })
    },
    emitForm() {
      this.feature = {
        "species": this.species,
        "bacteria_genus": this.bacteria_genus,
        "submitted_sample": this.submitted_sample,
        "vitek_id": this.vitek_id
      }
      this.$emit('EmitForm', this.feature);
    },
    clearInput() {
      this.species = null;
      this.bacteria_genus = null;
      this.submitted_sample = null;
      this.vitek_id = null;
      this.emitForm();
    },
    upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }
}
</script>

<style scoped>
  .grid-col-2 {
    grid-template-columns: 1fr 1.5fr;
  }
  .col-gap {
    column-gap: 60px;
  }
</style>