<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-gray-900 text-xl sm:text-2xl font-semibold my-6">Files & Retraining</h1>
    <file-management />
    <button
      @click="retraining"
      class="bg-blue-2 text-white-1 font-semibold py-2 px-6 rounded"
    >
      Retraining Now
    </button>
  </div>
  <pop-up
    :showPopUp="show_popup_confirm"
    @OnConfirm="onConfirm"
    @OnCancel="onCancel"
  >
    <template v-slot:popup-header>
      <h2 class="font-bold">Confirm</h2>
    </template>
    <template v-slot:popup-body>
      <h4 class="font-semibold text-lg">Are you sure training the model?</h4>
      <p>If you confirm, the system will train the model immediately.</p>
    </template>
  </pop-up>

  <pop-up
    :type="'success'"
    :showPopUp="show_popup_success"
    @OnSuccess="onSuccess"
  >
    <p>The system has started training the model now.</p>
  </pop-up>
</template>
<script>
import FileManagement from "../components/FileManagement.vue";
import PopUp from "../components/PopUp.vue";

export default {
  name: "FilesRetrainingPage",
  components: {
    FileManagement,
    PopUp,
  },
  data() {
    return {
      show_popup_confirm: false,
      show_popup_success: false,
    };
  },
  methods: {
    retraining() {
      this.showPopUpConfirm();
    },
    showPopUpConfirm() {
      this.show_popup_confirm = true;
    },
    showPopUpSuccess() {
      this.show_popup_success = true;
    },
    onConfirm() {
      this.show_popup_confirm = false;
      this.showPopUpSuccess();
    },
    onCancel() {
      this.show_popup_confirm = false;
    },
    onSuccess() {
      this.show_popup = false;
      this.$router.push("/retraining-log");
    },
  },
};
</script>
