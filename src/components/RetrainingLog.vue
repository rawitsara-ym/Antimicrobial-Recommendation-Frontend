<template>
  <div class="flex flex-col w-full">
    <div class="overflow-x-auto">
      <table class="border-l border-r border-b w-full">
        <thead class="bg-gray-3 text-left text-gray-800 whitespace-nowrap">
          <tr>
            <th class="px-2 py-3 font-medium"></th>
            <th class="px-2 py-3 font-medium">#</th>
            <th class="px-2 py-3 font-medium">Vitek ID</th>
            <th class="px-2 py-3 font-medium">Start Date</th>
            <th class="px-2 py-3 font-medium">Finish Date</th>
            <th class="px-2 py-3 font-medium">Time</th>
            <th class="px-2 py-3 font-medium">Status</th>
            <th class="px-2 py-3 font-medium">File</th>
            <th class="px-2 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody class="text-gray-800">
          <tr v-for="(item, index) in logs" :key="index">
            <td class="px-2 py-2 text-center">
              <font-awesome-icon
                v-if="success(item)"
                icon="check-circle"
                size="lg"
                class="text-green-500"
              />
              <font-awesome-icon
                v-else-if="fail(item)"
                icon="exclamation-circle"
                size="lg"
                class="text-red-500"
              />
              <font-awesome-icon
                v-else-if="item.status == 'pending'"
                icon="spinner"
                size="lg"
                class="text-gray-500"
                spin
              />
              <font-awesome-icon
                v-else
                icon="spinner"
                size="lg"
                class="text-blue-500"
                spin
              />
            </td>
            <td class="px-2 py-2">{{ index + 1 }}</td>
            <td class="px-2 py-2">{{ item.vitek_name }}</td>
            <td class="px-2 py-2">{{ item.start_date }}</td>
            <td class="px-2 py-2">{{ item.finish_date }}</td>
            <td class="px-2 py-2">
              {{ item.time == "-" ? "-" : convertTime(item.time) }}
            </td>
            <td class="px-2 py-2">
              <font-awesome-icon
                v-if="success(item)"
                icon="circle"
                size="xs"
                class="text-green-500"
              />
              <font-awesome-icon
                v-else-if="fail(item)"
                icon="circle"
                size="xs"
                class="text-red-500"
              />
              <font-awesome-icon
                v-else-if="item.status == 'pending'"
                icon="circle"
                size="xs"
                class="text-gray-500"
              />
              <font-awesome-icon
                v-else
                icon="circle"
                size="xs"
                class="text-blue-500"
              />
              {{ upperFirst(item.status) }}
            </td>
            <td>
              <button
                @click="viewFiles(item.id)"
                class="bg-blue-3 text-sm text-gray-700 font-medium py-1 px-4 m-2 rounded"
              >
                View
              </button>
            </td>
            <td>
              <button
                v-if="success(item) || fail(item)"
                @click="goToModelDashboard(item)"
                :disabled="!success(item)"
                :class="{
                  'opacity-50 cursor-not-allowed': !success(item),
                }"
                class="bg-yellow-1 text-sm text-gray-700 font-medium py-1 px-4 m-2 w-28 rounded"
              >
                Dashboard
              </button>
              <button
                v-else
                @click="showPopUpConfirm"
                class="bg-red-300 text-sm text-gray-700 font-medium py-1 px-4 m-2 w-28 rounded"
              >
                Cancel
              </button>
            </td>
          </tr>
          <tr v-if="logs.length == 0">
            <td colspan="9" class="text-center text-sm font-medium p-4">
              No Data
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      v-show="totalPages != 0"
      :row-on-page="logs.length"
      :total-pages="totalPages"
      :total-rows="totalRows"
      :per-page="perPage"
      :current-page="currentPage"
      :has-more-pages="hasMorePages"
      @pagechanged="showMore"
    />

    <!-- View File Modal -->
    <modal :showModal="showModal" @OnClose="closeModal">
      <template v-slot:modal-header>
        <h3>Files for training the model</h3>
      </template>
      <template v-slot:modal-body>
        <ul class="list-decimal ml-6 font-sarabun">
          <li v-for="(item, index) in modalBody" :key="index">
            {{ item.name }}
            <span class="text-blue-500"> {{ item.timestamp }}</span> (จำนวน {{
              item.amount_row
            }}
            แถว)
          </li>
        </ul>
      </template>
    </modal>

    <!-- Cancel Pop-Up -->
    <pop-up
    :type="'confirm'"
    :showPopUp="show_popup_confirm"
    @OnConfirm="onConfirm"
    @OnCancel="onCancel"
  >
    <template v-slot:popup-header>
      <h2 class="font-bold">Confirm to cancel the model training</h2>
    </template>
    <template v-slot:popup-body>
      <h4 class="font-sarabun">คุณต้องการยกเลิกการเทรนโมเดลใช่หรือไม่?</h4>
    </template>
  </pop-up>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import Modal from "./Modal.vue";
import PopUp from "./PopUp.vue"

export default {
  name: "RetrainingLog",
  components: {
    Pagination,
    Modal,
    PopUp,
  },
  data() {
    return {
      logs: [],
      files: [],
      totalPages: 1,
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
      showModal: false,
      modalBody: {},
      show_popup_confirm: false,
    };
  },
  created() {
    this.getLogs();
    this.timer = setInterval(() => {
      this.getLogs();
    }, 30000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
  methods: {
    getLogs() {
      let params = { page: this.currentPage };
      this.axios
        .get(`${this.host}/api/retraining_logs`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.logs = response.data.data.logs;
            this.totalRows = response.data.data.total;
            this.totalPages = Math.ceil(this.totalRows / this.perPage);
          }
        });
    },
    viewFiles(retrainingLogId) {
      this.openModal(this.files);
      let params = { retraining_log_id: retrainingLogId };
      this.axios
        .get(`${this.host}/api/view_file_retraining_log`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.files = response.data.data.files;
            this.openModal(this.files);
          }
        });
    },
    goToModelDashboard(log) {
      this.$router.push({
        name: "Dashboard",
        params: {
          modelVitekId: log.vitek_id,
          modelVersion: log.version,
        },
      });
    },
    showMore(page) {
      this.currentPage = page;
    },
    success(log) {
      return log.status == "success";
    },
    fail(log) {
      return log.status == "fail";
    },
    closeModal() {
      this.showModal = false;
    },
    openModal(body) {
      this.showModal = true;
      this.modalBody = body;
    },
    cancelRetraining() {
      console.log("Cancel Retraining!");
    },
    showPopUpConfirm() {
      this.show_popup_confirm = true;
    },
    onConfirm() {
      this.show_popup_confirm = false;
      this.cancelRetraining()
    },
    onCancel() {
      this.show_popup_confirm = false;
    },
  },
  watch: {
    currentPage() {
      this.getLogs();
    },
  },
};
</script>
