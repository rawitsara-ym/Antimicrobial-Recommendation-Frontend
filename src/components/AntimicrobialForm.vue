<template>
  <loader v-if="show_loading" />
  <div v-else class="grid text-gray-800">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12">
      <div class="grid grid-col-2">
        <p class="text-center font-semibold bg-blue-3 lg:px-20 py-2 rounded mr-3 lg:mr-8">
          Antimicrobial
        </p>
        <p class="text-center font-semibold bg-blue-3 py-2 rounded">S/I/R</p>
      </div>
      <div class="md:grid grid-col-2 hidden">
        <p class="text-center font-semibold bg-blue-3 lg:px-20 py-2 rounded mr-3 lg:mr-8">
          Antimicrobial
        </p>
        <p class="text-center font-semibold bg-blue-3 py-2 rounded">S/I/R</p>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 md:grid-flow-col gap-x-6 lg:gap-x-12"
      :style="{
        'grid-template-rows': `repeat(${Math.ceil(sir_name.length / 2)}, 1fr)`,
      }"
    >
      <div
        v-for="(sir, index) in sir_name"
        :key="index"
        class="grid grid-col-2 mt-2"
      >
        <label for="sir" class="mr-3 lg:mr-8">{{
          sir.name == "esbl" ? sir.name.toUpperCase() : upperFirst(sir.name)
        }}</label>
        <select
          @change="emitForm"
          v-model="sir_result[sir.name]"
          class="w-full border border-solid border-gray-300 rounded text-center"
        >
          <option :value="null">{{ null }}</option>
          <option
            v-for="(item, i) in find_sir_subtype(sir.sir_type)"
            :key="i"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";

export default {
  name: "AntimicrobialForm",
  components: {
    Loader,
  },
  props: ['vitekId'],
  emits: ["EmitForm", "EmitSirName"],
  data() {
    return {
      show_loading: false,
      sir_result: {},
      sir_name: {},
      sir_type: [],
    };
  },
  methods: {
    getSIR(vitekId) {
      this.show_loading = true;
      let params = { v_id: vitekId };
      this.axios
        .get(`${this.host}/api/antimicrobial_sir`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.sir_name = this.sortObjectByName(
              response.data.data.antimicrobial
            );
            this.sir_type = response.data.data.sir_type;
            this.emitSirName();
            this.show_loading = false;
          }
        });
    },
    emitForm() {
      this.$emit("EmitForm", this.sir_result);
      console.log(this.sir_result);
    },
    emitSirName() {
      this.$emit("EmitSirName");
    },
    clearInput() {
      this.sir_result = {};
      this.emitForm();
    },
    find_sir_subtype(sir_id) {
      for (let i = 0; i < this.sir_type.length; i++) {
        if (this.sir_type[i].id == sir_id) {
          return this.sir_type[i].sub_type;
        }
      }
      return [];
    },
  },
  watch: {
    vitekId(value) {
      if (value) {
        this.getSIR(value);
      }
    },
  },
};
</script>

<style scoped>
.grid-col-2 {
  grid-template-columns: 3.25fr 1fr;
}
</style>
