<template>
  <div v-if="show_loading" style="border-top-color:transparent"
    class="w-8 h-8 border-4 border-blue-200 border-solid rounded-full animate-spin m-8">
  </div>
  <div v-else class="grid">
    <div class="grid grid-cols-2 col-gap">
      <div class="grid grid-col-2">
        <p class="text-center bg-blue-3 px-10 py-2 rounded mr-8">Antimicrobial</p>
        <p class="text-center bg-blue-3 px-10 py-2 rounded">S/I/R</p>
      </div>
      <div class="grid grid-col-2">
        <p class="text-center bg-blue-3 px-10 py-2 rounded mr-8">Antimicrobial</p>
        <p class="text-center bg-blue-3 px-10 py-2 rounded">S/I/R</p>
      </div>
    </div>
    <div class="grid grid-cols-2 grid-flow-col col-gap" :style="{'grid-template-rows': `repeat(${Math.ceil(Object.keys(sir_name).length/2)}, 1fr)`}">
      <div
        v-for="(item, key, index) in sir_name"
        :key="index"
        class="grid grid-col-2 mt-4"
      >
        <label for="sir" class="mr-8">{{ key }}</label>
        <select
          v-if="item == 'pn'"
          @change="emitForm"
          v-model="sir_result[key]"
          class="w-full border border-solid border-gray-300 rounded text-center"
        >
          <option v-for="(item, i) in pn" :key="i" :value="item">
            {{ item }}
          </option>
        </select>
        <select
          v-else
          v-model="sir_result[key]"
          @change="emitForm();"
          class="w-full border border-solid border-gray-300 rounded text-center"
        >
          <option v-for="(item, i) in sir" :key="i" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AntimicrobialForm",
  props: ['vitekId'],
  data() {
    return {
      host: 'http://localhost:8000',
      show_loading: false,
      sir_result: {},
      sir_name: {
        "ESBL": "pn",
        "Ampicillin": "sir" ,
        "Amoxicillin/clavulanic acid": "sir",
        "Cefalexin": "sir",
        "Cefotaxime": "sir",
        "Gentamicin": "sir",
        "Enrofloxacin": "sir",
        "Imipenem": "sir",
      },
      sir_type: ["pn", "sir"],
      pn: [null, "POS", "NEG"],
      sir: [null, "S", "I", "R"],
    };
  },
  methods: {
    getSIR(vitek_id) {
      this.show_loading = true
      let params = {'vitek_id': vitek_id};
      axios.get(`${this.host}/api/antimicrobial_sir`, { params })
        .then((response) => {
          if (response.data.status == 'success') {
            this.sir_name = response.data.data.antimicrobial;
            this.sir_type = response.data.data.sir_type;
            this.pn = response.data.data.sir_type.pn;
            this.sir = response.data.data.sir_type.sir;
            this.pn.unshift(null);
            this.sir.unshift(null);
            this.emitSirName();
            this.show_loading = false
          }
        })
    },
    emitForm() {
      this.$emit('EmitForm', this.sir_result);
      // console.log(this.sir_result);
    },
    emitSirName() {
      this.$emit('EmitSirName');
    }
  },
  watch: {
    vitekId(val) {
      this.getSIR(val);
    }
  },
};
</script>

<style scoped>
.grid-col-2 {
  grid-template-columns: 2.5fr 1fr;
}
.col-gap {
  column-gap: 60px;
}
</style>
