<template>
  <div class="flex justify-between py-2 my-2">
    <p class="text-gray-800 text-xs sm:text-sm">
      Showing {{ startShowing }} to {{ startShowing == 0 ? 0 : startShowing + rowOnPage - 1  }} of {{ totalRows }} entries
    </p>
    <ul class="flex bg-white gap-x-1">
      <li>
        <button
          @click="onClickFirstPage"
          class="border border-gray-200 px-2 sm:px-3 h-7 sm:h-8 text-gray-600 no-underline rounded"
          :class="{
            'opacity-50': isInFirstPage,
            'hover:bg-gray-100': !isInFirstPage,
          }"
        >
          <font-awesome-icon icon="angle-double-left" class="text-sm" />
        </button>
      </li>

      <li>
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="border border-gray-200 px-2 sm:px-3 h-7 sm:h-8 text-gray-600 no-underline text-sm rounded"
          :class="{
            'opacity-50': isInFirstPage,
            'hover:bg-gray-100': !isInFirstPage,
          }"
        >
          <font-awesome-icon icon="angle-left" class="text-sm" />
        </button>
      </li>

      <li v-for="page in pages" :key="page.name">
        <button
          class="text-xs sm:text-sm border border-gray-200 px-2 sm:px-3 h-7 sm:h-8 text-gray-600 no-underline rounded"
          @click="onClickPage(page.name)"
          :class="{
            'bg-blue-100': isPageActive(page.name),
            'hover:bg-gray-100': !isPageActive(page.name),
          }"
        >
          {{ page.name }}
        </button>
      </li>

      <li>
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          class="border border-gray-200 px-2 sm:px-3 h-7 sm:h-8 text-gray-600 no-underline text-sm rounded"
          :class="{
            'opacity-50': isInLastPage,
            'hover:bg-gray-100': !isInLastPage,
          }"
        >
          <font-awesome-icon icon="angle-right" class="text-sm" />
        </button>
      </li>

      <li>
        <button
          class="border border-gray-200 px-2 sm:px-3 h-7 sm:h-8 text-gray-600 no-underline rounded"
          @click="onClickLastPage"
          :disabled="isInLastPage"
          :class="{
            'opacity-50': isInLastPage,
            'hover:bg-gray-100': !isInLastPage,
          }"
        >
          <font-awesome-icon icon="angle-double-right" class="text-sm" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    rowOnPage: {
      type: Number,
      required: true,
    },

    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    totalPages: {
      type: Number,
      required: true,
    },

    totalRows: {
      type: Number,
      required: true,
    },

    perPage: {
      type: Number,
      required: true,
    },

    currentPage: {
      type: Number,
      required: true,
    },

    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        if (this.totalPages >= this.maxVisibleButtons) {
          return this.totalPages - this.maxVisibleButtons + 1;
        }
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startShowing() {
      if (this.totalRows != 0) {
        return 1 + this.currentPage * 10 - 10;
      }
      return 0;
    },
  },

  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
