<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-2xl font-semibold my-6">Uplaod File</h1>
    <choose-file @VitekId="getVitekId" @AddFile="getFile" />
    <button
      @click="uploadFile"
      :disabled="!file || !vitek_id"
      :class="{ 'opacity-50 cursor-not-allowed': !file || !vitek_id }"
      class="bg-blue-2 text-white-1 font-semibold py-2 px-6 rounded"
    >
      Upload
    </button>
    <file-upload-log />
  </div>
</template>

<script>
import axios from "axios";
import ChooseFile from "../components/ChooseFile.vue";
import FileUploadLog from "../components/FileUploadLog.vue";

export default {
  name: "UploadFilePage",
  components: {
    ChooseFile,
    FileUploadLog,
  },
  data() {
    return {
      file: null,
      vitek_id: null,
    };
  },
  methods: {
    getVitekId(vitek_id) {
      this.vitek_id = vitek_id;
      // console.log(this.vitek_id)
    },
    getFile(file) {
      this.file = file;
      // console.log(this.file)
    },
    uploadFile() {
      let params = { vitek_id: this.vitek_id };
      let formData = new FormData();
      formData.append("in_file", this.file);
      axios
        .post(`${this.host}/api/upload`, formData, { params })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data.data);
          }
        });
    },
  },
};
</script>

<style scoped></style>
