<template>
  <div class="relative z-10">
    <input
      class="w-full h-full border border-solid border-gray-300 rounded px-2"
      v-model="input"
      @input="handleInput"
      @click="show_list = true"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <div
      class="w-full absolute border bg-white rounded-lg shadow-2xl"
      v-if="show_list && filteredList.length"
    >
      <ul ref="scrollContainer" class="cursor-pointer overflow-y-auto max-h-48 rounded-lg">
        <li
          ref="options"
          v-for="(item, i) in filteredList"
          :key="i"
          @click="setInput(item)"
          @mouseover="arrowCounter = i; arrowKey = false"
          class="px-2"
          :class="{ 'bg-blue-500 text-white': i === arrowCounter, 'hover:bg-blue-500 hover:text-white': arrowKey == false}"
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
  data() {
    return {
      input: null,
      show_list: false,
      arrowCounter: -1,
      arrowKey: false,
    };
  },
  created() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.show_list = false;
        this.arrowCounter = -1;
      }
    });
  },
  methods: {
    handleInput() {
      this.show_list = true;
      this.$emit("inputValue", this.input);
    },
    setInput(value) {
      this.input = value;
      this.show_list = false;
      this.$emit("inputValue", value);
    },
    clearInput() {
      this.input = null;
    },
    onArrowDown(ev) {
      ev.preventDefault()
      if (this.arrowCounter < this.filteredList.length-1) {
        this.arrowCounter = this.arrowCounter + 1;
        this.fixScrolling();
      }
      this.arrowKey = true;
    },
    onArrowUp(ev) {
      ev.preventDefault()
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling();
      }
      this.arrowKey = true;
    },
    onEnter() {
      this.input = this.filteredList[this.arrowCounter];
      this.arrowCounter = -1;
      this.show_list = false;
      this.$emit("inputValue", this.input);
      this.arrowKey = true;
    },
    fixScrolling()  {
      const liH = this.$refs.options[this.arrowCounter].clientHeight;
      console.log(liH, liH * this.arrowCounter, this.arrowCounter)
      this.$refs.scrollContainer.scrollTop = liH * (this.arrowCounter);
    },
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
