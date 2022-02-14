<template>
  <div
    v-if="showModal"
    class="fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full"
  >
    <div class="relative px-4 w-full max-w-4xl h-auto z-40">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-center p-5 rounded-t border-b">
          <div class="text-xl font-medium text-gray-900">
            <slot name="modal-header"></slot>
          </div>
          <button
            class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="onClose"
          >
            <font-awesome-icon icon="times" size="lg" />
          </button>
        </div>
        <!-- Modal body -->
        <div
          class="max-h-80 overflow-y-auto overflow-x-hidden p-6 space-y-2 text-base leading-relaxed"
        >
          <slot name="modal-body"></slot>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-end p-5 space-x-2 rounded-b border-t border-gray-200"
        >
          <button
            @click="onClose"
            class="text-white bg-blue-2 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            close
          </button>
        </div>
      </div>
    </div>
    <div @click="onClose()" class="opacity-25 fixed inset-0 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ["OnClose"],
  methods: {
    onClose() {
      this.$emit("OnClose");
    },
  },
  watch: {
    showModal: function () {
      if (this.showModal) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>
