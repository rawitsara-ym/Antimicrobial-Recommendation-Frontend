<template>
  <div class="relative z-10">
    <input
      class="w-full h-full border border-solid border-gray-300 rounded px-2"
      v-model="input"
      @input="handleInput"
      @click="show_list=true"
    />
    <div
      class="w-full absolute border bg-white rounded-lg shadow-2xl"
      v-if="show_list && filteredList.length"
    >
      <ul class="cursor-pointer overflow-y-auto max-h-48 rounded-lg">
        <li
          v-for="(item, i) in filteredList"
          :key="i"
          @click="setInput(item)"
          class="px-2 hover:bg-blue-500 hover:text-white"
        >
          {{ item.name }}
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
      this.input = value.name;
      this.show_list = false;
      this.$emit('inputValue', value.name);
    },
    clearInput() {
      this.input = null;
    }
  },
  computed: {
    filteredList() {
      if (this.input) {
        return this.list.filter((e) =>
          e.name.toLowerCase().startsWith(this.input.toLowerCase())
        );
      } else {
        return this.list;
      }
    },
  },
};
</script>
