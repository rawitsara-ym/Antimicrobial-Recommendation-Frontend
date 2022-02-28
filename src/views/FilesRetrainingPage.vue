<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-gray-800 text-xl sm:text-2xl font-semibold my-6">
      Files & Retraining
    </h1>
    <file-management />
    <button
      @click="showPopUpConfirm"
      class="bg-blue-2 text-white-1 font-medium py-2 px-6 rounded"
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
      <h2 class="font-sarabun font-bold">Confirm Model Retraining</h2>
    </template>
    <template v-slot:popup-body>
      <h4 class="font-sarabun">คุณต้องการที่จะเทรนโมเดลใหม่ใช่หรือไม่?</h4>
      <p class="font-sarabun">
        ถ้าคุณคลิกปุ่ม Confirm ระบบจะทำการเทรนโมเดลใหม่โดยทันที
      </p>
    </template>
  </pop-up>

  <!-- SUCCESS -->
  <pop-up
    :type="'success'"
    :showPopUp="show_popup_success"
    @OnSuccess="onSuccess"
  >
    <p class="font-sarabun">{{ message }}</p>
  </pop-up>

  <!-- FAIL -->
  <pop-up
    :type="'fail'"
    :showPopUp="show_popup_fail"
    @OnFail="onFail"
  >
    <p class="font-sarabun">{{ message }}</p>
  </pop-up>

  <!-- ERROR -->
  <pop-up
    :type="'fail'"
    :showPopUp="show_popup_error"
    @OnFail="onError"
  >
    <p class="font-sarabun">ไม่สามารถเทรนโมเดลได้ในขณะนี้</p>
  </pop-up>

  <!-- Loader -->
  <div
    v-if="show_loading"
    class="fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full opacity-25 bg-black"
  >
    <loader />
  </div>
</template>
<script>
import FileManagement from "../components/FileManagement.vue";
import PopUp from "../components/PopUp.vue";
import Loader from "../components/Loader.vue"

export default {
  name: "FilesRetrainingPage",
  components: {
    FileManagement,
    PopUp,
    Loader,
  },
  data() {
    return {
      show_popup_confirm: false,
      show_popup_success: false,
      show_popup_fail: false,
      show_popup_error: false,
      show_loading: false,
      message: "",
    };
  },
  methods: {
    retraining() {
      this.show_loading = true;
      this.axios
        .post(`${this.host}/api/retraining`)
        .then((response) => {
          if (response.data.status == "success") {
            this.show_loading = false;
            this.message = response.data.data.message;
            if (response.data.data.status == "success") {
              this.showPopUpSuccess();
            } else {
              this.showPopUpFail();
            }
          } else {
            this.show_loading = false;
            this.show_popup_error = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.show_loading = false;
          this.show_popup_error = true;
        });
    },
    showPopUpConfirm() {
      this.show_popup_confirm = true;
    },
    showPopUpSuccess() {
      this.show_popup_success = true;
    },
    showPopUpFail() {
      this.show_popup_fail = true;
    },
    onConfirm() {
      this.retraining();
      this.show_popup_confirm = false;
    },
    onCancel() {
      this.show_popup_confirm = false;
    },
    onSuccess() {
      this.show_popup_success = false;
      this.$router.push("/retraining-log");
    },
    onFail() {
      this.show_popup_fail = false;
    },
    onError() {
      this.show_popup_error = false;
    },
  },
};
</script>
