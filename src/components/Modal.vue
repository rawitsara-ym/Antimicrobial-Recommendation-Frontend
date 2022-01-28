<template>
  <div
    v-if="showModal"
    class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full"
  >
    <div class="relative px-4 w-full max-w-4xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-center p-5 rounded-t border-b">
          <h3 class="text-xl font-medium text-gray-900">
            {{ title }}
          </h3>
          <button
            class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="onClose"
          >
            <font-awesome-icon icon="times" size="lg" />
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6 text-base leading-relaxed">
          <slot></slot>
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
  </div>
  <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['OnClose'],
  methods: {
    onClose() {
      this.$emit('OnClose');
    },
  },
};
</script>
