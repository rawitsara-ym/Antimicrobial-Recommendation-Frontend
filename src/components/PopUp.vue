<template>
  <div
    v-if="showPopUp"
    class="fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 sm:h-full"
  >
    <!-- CONFIRM TYPE -->
    <div
      v-if="type == 'confirm'"
      class="relative px-4 w-full max-w-xl h-full md:h-auto z-40"
    >
      <!-- PopUp content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- PopUp header -->
        <div class="flex justify-between items-center px-5 py-4 rounded-t">
          <div class="text-xl font-medium text-gray-900">
            <slot name="popup-header"></slot>
          </div>
          <button
            class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="onCancel"
          >
            <font-awesome-icon icon="times" size="lg" />
          </button>
        </div>
        <!-- PopUp body -->
        <div
          class="max-h-80 overflow-y-auto overflow-x-hidden px-5 text-base text-gray-500 leading-relaxed"
        >
          <slot name="popup-body"></slot>
        </div>
        <!-- PopUp footer -->
        <div class="flex justify-end px-5 py-4 space-x-2 rounded-b">
          <button
            @click="onConfirm"
            class="w-24 text-white bg-green-500 focus:ring-4 focus:ring-blue-200 font-bold rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Confirm
          </button>
          <button
            @click="onCancel"
            class="w-24 text-white bg-red-500 focus:ring-4 focus:ring-blue-200 font-bold rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- SUCCESS TYPE -->
    <div
      v-else-if="type == 'success'"
      class="relative px-4 w-full max-w-xl h-full md:h-auto z-40"
    >
      <!-- PopUp content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- PopUp header -->
        <div class="flex justify-between items-center pt-4 rounded-t"></div>
        <!-- PopUp body -->
        <div
          class="max-h-80 overflow-y-auto overflow-x-hidden px-5 text-base text-gray-500 text-center leading-relaxed"
        >
          <font-awesome-icon
            icon="check-circle"
            class="text-green-500 text-7xl my-4"
          />
          <slot></slot>
        </div>
        <!-- PopUp footer -->
        <div class="flex justify-end px-5 py-4 space-x-2 rounded-b">
          <button
            @click="onSuccess"
            class="w-24 text-white bg-green-500 focus:ring-4 focus:ring-blue-200 font-bold rounded-lg text-sm px-4 py-2.5 text-center"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <!-- FAIL TYPE -->
    <div v-else class="relative px-4 w-full max-w-xl h-full md:h-auto z-40">
      <!-- PopUp content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- PopUp header -->
        <div class="flex justify-between items-center pt-4 rounded-t"></div>
        <!-- PopUp body -->
        <div
          class="max-h-80 overflow-y-auto overflow-x-hidden px-5 text-base text-gray-500 text-center leading-relaxed"
        >
          <font-awesome-icon
            icon="exclamation-circle"
            class="text-red-500 text-7xl my-4"
          />
          <slot></slot>
        </div>
        <!-- PopUp footer -->
        <div class="flex justify-end px-5 py-4 space-x-2 rounded-b">
          <button
            @click="onFail"
            class="w-24 text-white bg-red-500 focus:ring-4 focus:ring-blue-200 font-bold rounded-lg text-sm px-4 py-2.5 text-center"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <div class="opacity-25 fixed inset-0 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    showPopUp: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "confirm",
    },
  },
  emits: ["OnConfirm", "OnCancel", "OnSuccess", "OnFail"],
  methods: {
    onCancel() {
      this.$emit("OnCancel");
    },
    onConfirm() {
      this.$emit("OnConfirm");
    },
    onSuccess() {
      this.$emit("OnSuccess");
    },
    onFail() {
      this.$emit("OnFail");
    },
  },
  watch: {
    showPopUp: function () {
      if (this.showPopUp) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>
