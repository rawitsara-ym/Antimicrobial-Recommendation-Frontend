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
                class="text-blue-300"
                spin
              />
              <font-awesome-icon
                v-else-if="item.status == 'canceling'"
                icon="spinner"
                size="lg"
                class="text-gray-400"
                spin
              />
              <font-awesome-icon
                v-else-if="item.status == 'cancel'"
                icon="times-circle"
                size="lg"
                class="text-gray-500"
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
            <td class="px-2 py-2 whitespace-nowrap">{{ item.start_date }}</td>
            <td class="px-2 py-2 whitespace-nowrap">{{ item.finish_date }}</td>
            <td class="px-2 py-2 whitespace-nowrap">
              {{ item.time == "-" ? "-" : convertTime(item.time) }}
            </td>
            <td class="px-2 py-2 whitespace-nowrap">
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
                class="text-blue-300"
              />
              <font-awesome-icon
                v-else-if="item.status == 'canceling'"
                icon="circle"
                size="xs"
                class="text-gray-400"
              />
              <font-awesome-icon
                v-else-if="item.status == 'cancel'"
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
              <!-- <span v-if="item.status == 'cancel'">{{
                " " + upperFirst(item.status)
              }}</span>
              <span v-else-if="item.cancel == true"> Canceling</span> -->
              <span>{{ " " + upperFirst(item.status) }}</span>
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
                v-if="item.status != 'training' && item.status != 'pending'"
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
                @click="showPopUpConfirm(item.id)"
                :disabled="item.cancel == false"
                :class="{
                  'opacity-50 cursor-not-allowed': item.cancel == false,
                }"
                class="bg-red-300 text-sm text-gray-700 font-medium py-1 px-4 m-2 w-28 rounded"
              >
                Cancel
              </button>
            </td>
          </tr>
          <tr v-if="logs.length == 0">
            <td colspan="9" class="text-center text-sm font-medium p-4">
              <loader v-if="show_loading" />
              <p v-else>No Data</p>
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
            <span class="text-blue-500"> {{ item.timestamp }}</span> (จำนวน
            {{ item.amount_row }}
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

    <!-- Error Pop-up -->
    <pop-up :type="'fail'" :showPopUp="show_popup_error" @OnFail="onError">
      <p class="font-sarabun">ยกเลิกการเทรนโมเดลไม่สำเร็จ</p>
    </pop-up>

    <!-- Loader -->
    <div
      v-if="show_cancel_loading"
      class="fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full opacity-25 bg-black"
    >
      <loader />
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import Modal from "./Modal.vue";
import PopUp from "./PopUp.vue";
import Loader from "./Loader.vue";

export default {
  name: "RetrainingLog",
  components: {
    Pagination,
    Modal,
    PopUp,
    Loader,
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
      show_popup_error: false,
      show_loading: false,
      show_cancel_loading: false,
      cancel_id: null,
    };
  },
  created() {
    this.show_loading = true;
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
            this.totalPages =
              this.totalRows == 0
                ? 1
                : Math.ceil(this.totalRows / this.perPage);
            this.show_loading = false;
          } else {
            this.show_loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.show_loading = false;
        });
    },
    viewFiles(retrainingLogId) {
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
    cancelRetraining() {
      this.show_cancel_loading = true;
      let params = { retraining_id: this.cancel_id };
      this.axios
        .get(`${this.host}/api/cancel_retraining`, { params })
        .then((response) => {
          this.show_cancel_loading = false;
          if (response.data.status == "success") {
            this.getLogs();
          } else {
            this.show_popup_error = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.show_cancel_loading = false;
          this.show_popup_error = true;
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
    showPopUpConfirm(id) {
      this.show_popup_confirm = true;
      this.cancel_id = id;
    },
    onConfirm() {
      this.show_popup_confirm = false;
      this.cancelRetraining();
    },
    onCancel() {
      this.show_popup_confirm = false;
    },
    onError() {
      this.show_popup_error = false;
      this.getLogs();
    },
  },
  watch: {
    currentPage() {
      this.getLogs();
    },
  },
};
</script>
