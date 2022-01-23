<template>
    <div class="grid grid-cols-2 col-gap">
        <div class="grid grid-col-2">
            <p class="text-center bg-blue-3 px-10 py-2 rounded mr-8">Antimicrobial</p>
            <p class="text-center bg-blue-3 px-10 py-2 rounded">S/I/R</p>
        </div>
        <div class="grid grid-col-2">
            <p class="text-center bg-blue-3 px-10 py-2 rounded mr-8">Antimicrobial</p>
            <p class="text-center bg-blue-3 px-10 py-2 rounded">S/I/R</p>
        </div>
        <div v-for="(name, index) in sir_name" :key="index" class="grid grid-col-2 mt-4">
            <label for="sir" class="mr-8">{{ name.antimicrobial }}</label>
            <select v-if="name.sir_type=='pn'" v-model="sir_result[index]" class="w-full border border-solid border-gray-300 rounded">
              <option v-for="(item, i) in pn" :key="i" :value="item">
                {{ item }}
              </option>
            </select>
            <select v-else v-model="sir_result[index]" class="w-full border border-solid border-gray-300 rounded">
              <option v-for="(item, i) in sir" :key="i" :value="item">
                {{ item }}
              </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AntimicrobialForm',
    data() {
        return {
            sir_result: [],
            sir_name: [{'antimicrobial': 'ESBL', 'sir_type': 'pn'}, {'antimicrobial': 'Ampicillin', 'sir_type': 'sir'}, {'antimicrobial': 'Amoxicillin/clavulanic acid', 'sir_type': 'sir'}, {'antimicrobial': 'Cefalexin', 'sir_type': 'sir'}, {'antimicrobial': 'Cefotaxime', 'sir_type': 'sir'},{'antimicrobial': 'Gentamicin', 'sir_type': 'sir'},{'antimicrobial': 'Enrofloxacin', 'sir_type': 'sir'},{'antimicrobial': 'Imipenem', 'sir_type': 'sir'}],
            sir_type: ['pn', 'sir'],
            pn: ['POS', 'NEG'],
            sir: ['S', 'I', 'R'], 
        }
    }
}
</script>

<style scoped>
  .grid-col-2 {
    grid-template-columns: 2.5fr 1fr;
    grid-auto-flow: row;
  }
  .col-gap {
    column-gap: 60px;
  }
</style>
