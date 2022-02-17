<template>
  <div class="w-full flex flex-col items-center md:items-start">
    <div class="flex flex-col md:items-end md:flex-row gap-x-6 gap-y-6 text-gray-800">
      <div class="grid grid-rows-2 gap-y-2 ml-7 md:ml-0 font-medium">
        <label for="vitek_id">Vitek ID</label>
        <select
          @change="emitForm"
          v-model="vitek_id"
          class="border border-solid border-gray-300 rounded px-2"
        >
          <option
            v-for="(item, index) in vitek_id_options"
            :key="index"
            :value="item.id"
          >
            {{ item.name.toUpperCase() }}
          </option>
        </select>
      </div>
      <div class="flex flex-col md:flex-row gap-x-6 gap-y-4 font-medium">
        <div class="flex">
          <input
            type="radio"
            :value="'version'"
            v-model="dashboard_type"
            class="mt-1 mx-2 cursor-pointer"
          />
          <div class="grid grid-rows-2 gap-y-2 w-full">
            <label for="dashboard-version">Version</label>
            <select
              @change="emitForm"
              :disabled="disableVersion"
              v-model="version"
              class="border border-solid border-gray-300 rounded px-2"
              :class="{
                'opacity-50 bg-gray-300 cursor-not-allowed': disableVersion,
              }"
            >
              <option
                v-for="(item, index) in version_options"
                :key="index"
                :value="item"
              >
                {{ item == 0 ? "Current" : item }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex">
          <input
            type="radio"
            :value="'antimicrobial'"
            v-model="dashboard_type"
            class="mt-1 mx-2 cursor-pointer"
          />
          <div class="grid grid-rows-2 gap-y-2 w-full">
            <label for="dashboard-antimicrobial">Antimicrobial Model</label>
            <select
              @change="emitForm"
              :disabled="disableAntimicrobial"
              v-model="antimicrobial"
              class="border border-solid border-gray-300 rounded px-2"
              :class="{
                'opacity-50 bg-gray-300 cursor-not-allowed':
                  disableAntimicrobial,
              }"
            >
              <option
                v-for="(item, index) in antimicrobial_options"
                :key="index"
                :value="item.id"
              >
                {{ upperFirst(item.name) }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex items-end justify-center ml-7 md:ml-0">
        <button
          @click="viewFiles(item.model_group_id)"
          :disabled="disableViewFiles"
          :class="{ 'opacity-50 cursor-not-allowed': disableViewFiles }"
          class="bg-blue-3 text-gray-800 text-sm font-medium py-1 px-6 rounded"
        >
          View Files
        </button>
      </div>
    </div>

    <div v-show="version != null || antimicrobial" class="flex justify-end mt-8 w-full">
      <div class="w-full md:w-36">
        <button
          @click="showPerformance"
          :class="{
            'bg-gray-400 text-white': mode === 1,
            'bg-white text-gray-500': mode === 2,
          }"
          class="text-sm font-medium py-1 px-4 border-2 border-gray-400 rounded-l w-full"
        >
          Performance
        </button>
      </div>
      <div class="w-full md:w-36">
        <button
          @click="showDataset"
          :disabled="disableViewFiles"
          :class="{
            'opacity-50 cursor-not-allowed': disableViewFiles,
            'bg-gray-400 text-white': mode === 2,
            'bg-white text-gray-500': mode === 1,
          }"
          class="text-sm font-medium py-1 px-4 border-b-2 border-t-2 border-r-2 border-gray-400 rounded-r w-full"
        >
          Dataset
        </button>
      </div>
    </div>

    <!-- View File Modal -->
    <modal :showModal="showModal" @OnClose="closeModal">
      <template v-slot:modal-header>
        <h3>Files for training the model</h3>
      </template>
      <template v-slot:modal-body>
        <ul class="list-decimal">
          <li v-for="(item, index) in modalBody" :key="index">
            {{ item.filename }}
            <span class="text-blue-500"> {{ item.timestamp }}</span> ({{
              item.amountRow
            }}
            rows)
          </li>
        </ul>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "SelectDashboard",
  components: {
    Modal,
  },
  emits: ["EmitForm", "ShowMode"],
  data() {
    return {
      dashboard_type: "version",
      vitek_id: 1,
      version: 0,
      antimicrobial: null,
      vitek_id_options: [],
      version_options: [],
      antimicrobial_options: [],
      files: [],
      showModal: false,
      modalBody: "",
      form: {},
      mode: 1,
    };
  },
  created() {
    this.getVitekId();
    this.getVersion();
    this.getAntimicrobial();
    this.emitForm();
  },
  methods: {
    getVitekId() {
      this.axios.get(`${this.host}/api/vitek_id`).then((response) => {
        if (response.data.status == "success") {
          this.vitek_id_options = response.data.data.vitek_id;
        }
      });
    },
    getVersion() {
      let params = { vitek_id: this.vitek_id };
      this.axios
        .get(`${this.host}/api/lastest_version`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            let lastest_version = response.data.data.lastest_version;
            this.version_options = [...Array(lastest_version + 1).keys()];
          }
        });
    },
    getAntimicrobial() {
      let params = { vitek_id: this.vitek_id };
      this.axios
        .get(`${this.host}/api/antimicrobial_model`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.antimicrobial_options = response.data.data.antimicrobial;
          }
        });
    },
    viewFiles(modelGroupId) {
      this.openModal(this.files);
      let params = { model_group_id: modelGroupId };
      this.axios
        .get(`${this.host}/api/view_filename`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.files = response.data.data.files;
            this.openModal(this.files);
          }
        });
    },
    emitForm() {
      this.form = {
        vitek_id: this.vitek_id,
        version: this.version,
        antimicrobial: this.antimicrobial,
      };
      this.$emit("EmitForm", this.form);
    },
    closeModal() {
      this.showModal = false;
    },
    openModal(body) {
      this.showModal = true;
      this.modalBody = body;
    },
    showPerformance() {
      this.mode = 1;
      this.$emit("ShowMode", 1);
    },
    showDataset() {
      this.mode = 2;
      this.$emit("ShowMode", 2);
    },
  },
  computed: {
    disableViewFiles() {
      return (
        this.dashboard_type === "antimicrobial" ||
        this.version === 0 ||
        !this.version
      );
    },
    disableAntimicrobial() {
      return this.dashboard_type === "version";
    },
    disableVersion() {
      return this.dashboard_type === "antimicrobial";
    },
  },
  watch: {
    vitek_id() {
      this.antimicrobial = null;
      this.version = null;
      this.showPerformance();
      this.emitForm();
    },
    dashboard_type() {
      this.antimicrobial = null;
      this.version = null;
      this.showPerformance();
      this.emitForm();
    },
    version(value) {
      if (value === 0) {
        this.showPerformance();
      }
    },
  },
};
</script>
