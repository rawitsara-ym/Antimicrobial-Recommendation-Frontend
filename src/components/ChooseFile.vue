<template>
  <div class="flex flex-col items-center w-full">
    <div
      @dragover.prevent
      @drop.prevent
      @drop="dragFile"
      class="flex flex-col items-center w-3/6 border-dashed border-2 rounded p-4"
    >
      <font-awesome-icon icon="copy" size="5x" class="text-blue-200" />
      <div class="flex items-center mt-4">
        <p class="text-gray-1 text-center">Drag and Drop a File here</p>
        <font-awesome-icon
          @click="openModal"
          icon="info-circle"
          class="text-gray-2 ml-2 cursor-pointer"
        />
      </div>
      <label class="flex flex-col items-center my-4">
        <span
          class="bg-yellow-1 text-gray-1 font-semibold py-2 px-6 cursor-pointer rounded"
          >Choose a File</span
        >
        <input type="file" accept=".csv" @change="handleFileChange" class="hidden" />
      </label>
      <div class="h-4">
        <p v-if="file" class="text-gray-2 text-sm">{{ file.name }}</p>
      </div>
    </div>
    <div class="flex m-4">
      <div v-for='(item, index) in vitek_id_options' :key="index" class="mx-4">
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
        <h3>File Format</h3>
      </template>
      <template v-slot:modal-body>
        <div class="flex items-center">
          <font-awesome-icon
            icon="info-circle"
            size="lg"
            class="text-gray-2 mr-2"
          />
          <p>
            The uploaded file must be valid according to the specified
            conditions.
          </p>
        </div>
        <ul class="list-disc ml-14">
          <li>File format: <span class="text-gray-2">CSV File</span></li>
          <li>
            The number of rows in the file:<span class="text-gray-2">
              Minimum 500 rows.</span
            >
          </li>
          <li>
            The columns must be named as follows:
            <span class="text-gray-2"
              >hn, date_of_submission, report_issued_date, species,
              bacteria_species, submitted_sample, S/I/R_{antimicrobial},
              ans_{antimicrobial}</span
            >
          </li>
          <li>Date format: <span class="text-gray-2">yyyy-mm-dd</span></li>
          <li>
            The Column "ans_{antimicrobial}" must contain:
            <span class="text-gray-2">True, False</span>
          </li>
          <li>The file must not contain duplicate rows.</li>
        </ul>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal.vue';
export default {
  name: 'ChooseFile',
  components: {
    Modal,
  },
  props: ['host'],
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
      axios.get(`${this.host}/api/vitek_id`).then((response) => {
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
  },
};
</script>
