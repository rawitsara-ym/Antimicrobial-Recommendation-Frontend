<template>
  <div class="flex flex-col w-full">
    <table class="border-l border-r border-b">
      <thead class="bg-gray-3">
        <tr>
          <th class="px-2 py-3 text-left font-medium text-gray-1"></th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">#</th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">Vitek ID</th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">
            Start Date
          </th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">
            Finish Date
          </th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">Time</th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">Status</th>
          <th class="px-2 py-3 text-left font-medium text-gray-1">File</th>
          <th class="px-2 py-3 text-left font-medium text-gray-1"></th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
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
              v-else
              icon="spinner"
              size="lg"
              class="text-blue-500"
              spin
            />
          </td>
          <td class="px-2 py-2">{{ index + 1 }}</td>
          <td class="px-2 py-2">{{ item.vitekId }}</td>
          <td class="px-2 py-2">{{ item.startDate }}</td>
          <td class="px-2 py-2">{{ item.finishDate }}</td>
          <td class="px-2 py-2">{{ item.time }}</td>
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
              v-else
              icon="circle"
              size="xs"
              class="text-blue-500"
            />
            {{ upperFirst(item.status) }}
          </td>
          <td>
            <button
              @click="viewFiles(item.modelGroupId)"
              class="bg-blue-3 text-gray-1 text-sm font-semibold py-1 px-4 m-2 rounded"
            >
              View
            </button>
          </td>
          <td>
            <button
              v-if="success(item) || fail(item)"
              @click="goToModelDetail"
              :disabled="!success(item)"
              :class="{
                'opacity-50 cursor-not-allowed': !success(item),
              }"
              class="bg-yellow-1 text-gray-1 text-sm font-semibold py-1 px-4 m-2 rounded"
            >
              Model
            </button>
            <button
              v-else
              @click="cancelRetraining"
              class="bg-red-300 text-gray-1 text-sm font-semibold py-1 px-4 m-2 rounded"
            >
              Cancel
            </button>
          </td>
        </tr>
        <tr v-if="logs.length == 0">
          <td
            colspan="9"
            class="text-center text-sm font-medium text-gray-1 p-4"
          >
            No Data
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
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
        <ul class="list-decimal ml-8">
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
import axios from "axios";
import Pagination from "./Pagination.vue";
import Modal from "./Modal.vue";

export default {
  name: "RetrainingLog",
  components: {
    Pagination,
    Modal,
  },
  props: ['host'],
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
    };
  },
  created() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      let params = { page: this.currentPage };
      axios
        .get(`${this.host}/api/logs_retraining`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.logs = response.data.data.logs;
            this.totalRows = response.data.data.total_rows;
            this.totalPages = Math.ceil(this.totalRows / this.perPage);
          }
        });
    },
    viewFiles(modelGroupId) {
      this.openModal(this.files);
      let params = { model_group_id: modelGroupId };
      axios
        .get(`${this.host}/api/view_filename`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.files = response.data.data.files;
            this.openModal(this.files);
          }
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
    goToModelDetail() {
      console.log("Go to Model Detail Page!");
    },
    cancelRetraining() {
      console.log("Cancel Retraining!");
    },
    upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  },
};
</script>
