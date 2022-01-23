<template>
    <div class="grid grid-cols-2 gap-6 col-gap">
    <div class="grid grid-col-2">
      <label for="species" class="text-right mr-8">Species</label>
      <select v-model="species" class="w-full border border-solid border-gray-300 rounded">
        <option v-for="(item, index) in species_options" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="grid grid-col-2">
      <label for="bacteria_species" class="text-right mr-8">Bacteria Species</label>
      <input v-model="bacteria_species" class="w-full border border-solid border-gray-300 rounded"/>
    </div>
    <div class="grid grid-col-2">
      <label for="submitted_sample" class="text-right mr-8">Submitted Sample</label>
      <input v-model="submitted_sample" class="w-full border border-solid border-gray-300 rounded"/>
    </div>
    <div class="grid grid-col-2">
      <label for="vitek_id" class="text-right mr-8">Vitek ID Card</label>
      <select v-model="vitek_id" class="w-full border border-solid border-gray-300 rounded">
        <option v-for="(item, index) in vitek_id_options" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureForm',
  data() {
    return {
      species: '',
      bacteria_species: '',
      summitted_sample: '',
      vitek_id: '',
      species_options: ['Cat', 'Dog', 'Other'],
      vitek_id_options: ['GN', 'GP']
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