<template>
  <div class="relative z-10">
    <input
      class="w-full h-full border border-solid border-gray-300 rounded px-2"
      v-model="input"
      @input="handleInput"
      @click="show_list=true"
    />
    <div
      class="w-full absolute border bg-white rounded-lg shadow-xl"
      v-if="show_list && filteredList.length"
    >
      <ul class="cursor-pointer overflow-y-auto max-h-32 rounded-lg">
        <li
          v-for="(item, i) in filteredList"
          :key="i"
          @click="setInput(item)"
          class="px-2 hover:bg-blue-500 hover:text-white"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Autocomplete",
  props: {
    list: {
      type: Array,
      requred: true,
    },
  },
  created() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.show_list = false;
      }
    });
  },
  data() {
    return {
      input: null,
      show_list: false,
    };
  },
  methods: {
    handleInput() {
      this.show_list = true;
      this.$emit('inputValue', this.input);
    },
    setInput(value) {
      this.input = value;
      this.show_list = false;
      this.$emit('inputValue', value);
    },
    clearInput() {
      this.input = null;
    }
  },
  computed: {
    filteredList() {
      if (this.input) {
        return this.list.filter((e) =>
          e.toLowerCase().startsWith(this.input.toLowerCase())
        );
      } else {
        return this.list;
      }
    },
  },
};
</script>
