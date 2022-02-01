<template>
  <loader v-if="show_loading"/>
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
import Loader from './Loader.vue'

export default {
  name: "AntimicrobialForm",
  components: {
    Loader
  },
  props: {
    vitekId: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      host: 'http://localhost:8000',
      show_loading: false,
      sir_result: {},
      sir_name: {},
      sir_type: [],
      pn: [],
      sir: [],
    };
  },
  methods: {
    getSIR(vitekId) {
      this.show_loading = true
      let params = {'vitek_id': vitekId};
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
    },
    clearInput() {
      this.sir_result = {};
      this.emitForm();
    },
    upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  },
  watch: {
    vitekId(val) {
      if (val) {
        this.getSIR(val);
      }
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
