<template>
  <div class="flex flex-col items-center w-full">
    <div
      @dragover.prevent
      @drop.prevent
      @drop="dragFile"
      class="flex flex-col items-center w-5/6 md:w-4/6 lg:w-3/6 border-dashed border-2 rounded p-4"
    >
      <font-awesome-icon icon="copy" size="5x" class="text-blue-200" />
      <div class="flex items-center mt-4">
        <p class="text-gray-800 text-center">Drag and Drop a File here</p>
        <font-awesome-icon
          @click="openModal"
          icon="info-circle"
          class="text-gray-400 ml-2 cursor-pointer"
        />
      </div>
      <label class="flex flex-col items-center my-4">
        <span
          class="bg-yellow-1 text-gray-700 font-medium py-2 px-6 cursor-pointer rounded"
          >Choose a File</span
        >
        <input
          ref="inputFile"
          type="file"
          accept=".csv"
          @change="handleFileChange"
          class="hidden"
        />
      </label>
      <div class="h-4">
        <p v-if="file" class="text-gray-400 text-sm hidden sm:block">{{ truncate(file.name, 40)}}</p>
        <p v-if="file" class="text-gray-400 text-sm sm:hidden">{{ truncate(file.name, 20)}}</p>
      </div>
    </div>
    <div class="flex m-4">
      <div v-for="(item, index) in vitek_id_options" :key="index" class="mx-4">
        <input
          @change="emitVitekId"
          type="radio"
          :value="item.id"
          v-model="vitek_id"
          class="mx-2 cursor-pointer"
        />
        <label for="item.name">{{ item.name }}</label>
      </div>
    </div>

    <!-- File Format Modal -->
    <modal :showModal="show_modal" @OnClose="closeModal">
      <template v-slot:modal-header>
        <h3 class="font-sarabun font-bold">File Format</h3>
      </template>
      <template v-slot:modal-body>
        <div class="flex items-center font-sarabun">
          <font-awesome-icon
            icon="info-circle"
            size="lg"
            class="text-gray-400 mr-2"
          />
          <p>
            ไฟล์ที่อัปโหลดจะต้องตรงตามเงื่อนไข ดังนี้
          </p>
        </div>
        <ul class="list-disc ml-14 font-sarabun">
          <li>รูปแบบไฟล์: <span class="text-gray-400">CSV File</span></li>
          <li>
            จำนวนแถวของไฟล์:<span class="text-gray-400">
              อย่างน้อย 300 แถว</span
            >
          </li>
          <li>
            ต้องประกอบไปด้วยคอลัมน์ ดังนี้:
            <span class="text-gray-400"
              >hn, date_of_submission, report_issued_date, species,
              bacteria_genus, submitted_sample, vitek_id, S/I/R_ชื่อยาต้านจุลชีพ,
              ans_ชื่อยาต้านจุลชีพ</span
            >
          </li>
          <li>รูปแบบวันที่: <span class="text-gray-400">yyyy-mm-dd</span></li>
          <li>
            คอลัมน์ "ans_ชื่อยาต้านจุลชีพ" จะต้องมีค่า:
            <span class="text-gray-400">True หรือ False</span>
          </li>
          <li>ต้องไม่มีแถวซ้ำกันในไฟล์และในฐานข้อมูล</li>
        </ul>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  name: "ChooseFile",
  components: {
    Modal,
  },
  data() {
    return {
      file: null,
      vitek_id: null,
      vitek_id_options: [],
      show_modal: false,
    };
  },
  created() {
    this.getVitekId();
  },
  methods: {
    handleFileChange(e) {
      this.file = e.target.files[0];
      this.$emit("AddFile", e.target.files[0]);
    },
    getVitekId() {
      this.axios.get(`${this.host}/api/vitek_id`).then((response) => {
        if (response.data.status == "success") {
          this.vitek_id_options = response.data.data.vitek_id;
        }
      });
    },
    dragFile(e) {
      this.file = e.dataTransfer.files[0];
      this.$emit("AddFile", e.target.files[0]);
    },
    emitVitekId() {
      this.$emit("VitekId", this.vitek_id);
    },
    closeModal() {
      this.show_modal = false;
    },
    openModal() {
      this.show_modal = true;
    },
    truncate(str, limit) {
      if (str.length <= limit + 10) {
        return str;
      }
      return str.slice(0, limit) + "..." + str.slice(-7);
    },
    clearFile() {
      this.file = null;
      this.vitek_id = null;
      this.$refs.inputFile.value = null;
      this.$emit("VitekId", this.vitek_id);
      this.$emit("AddFile", null);
    }
  },
};
</script>
