<template>
  <div class="w-full">
    <p class="text-left text-2xl font-semibold my-8">File Upload Log</p>
    <div class="flex flex-col">
      <table class="border-l border-r border-b">
        <thead class="bg-gray-3">
          <tr>
            <th class="px-2 py-3 text-left font-medium text-gray-1"></th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">#</th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Filename
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Start Date
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Finish Date
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">Time</th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">Rows</th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">Status</th>
            <th class="px-2 py-3 text-left font-medium text-gray-1"></th>
          </tr>
        </thead>
        <tbody>
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
            <td class="px-2 py-2">{{ item.filename }}</td>
            <td class="px-2 py-2">{{ item.start_date }}</td>
            <td class="px-2 py-2">{{ item.finish_date }}</td>
            <td class="px-2 py-2">{{ item.time }}</td>
            <td class="px-2 py-2">{{ item.amount_row }}</td>
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
              {{ item.result.status }}
            </td>
            <td>
              <button
                @click="openModal(item)"
                :disabled="!success(item) && !fail(item)"
                :class="{
                  'opacity-50 cursor-not-allowed':
                    !success(item) && !fail(item),
                }"
                class="bg-yellow-1 text-gray-1 text-sm font-semibold py-1 px-4 m-2 rounded"
              >
                Result
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
        :total="total"
        :per-page="perPage"
        :current-page="currentPage"
        :has-more-pages="hasMorePages"
        @pagechanged="showMore"
      />
    </div>

    <!-- result modal -->
    <modal :showModal="showModal" @OnClose="closeModal">
      <template v-slot:modal-header>
        <h3>
          Upload Your File
          <span
            v-if="modalBody.result.status == 'success'"
            class="text-green-500"
            >Success!</span
          >
          <span v-else class="text-red-500">Fail!</span>
        </h3>
      </template>
      <template v-slot:modal-body>
        <div v-if="modalBody.result.status == 'success'">
          <p>Your file is valid according to the specified conditions.</p>
          <div class="flex items-center mt-2">
            <font-awesome-icon
              icon="check-circle"
              size="lg"
              class="text-green-500 mr-2"
            />
            <p>Successfully uploaded {{ modalBody.amount_row }} rows.</p>
          </div>
        </div>
        <div v-else>
          <p>
            Your file is
            <span class="text-red-500">invalid</span> according to the specified
            conditions.
          </p>
          <div
            v-if="modalBody.result.type == 'size'"
            class="flex items-center mt-2"
          >
            <font-awesome-icon
              icon="exclamation-circle"
              size="lg"
              class="text-red-500 mr-2"
            />
            <p>Your file has less than 500 rows.</p>
          </div>
          <div v-else-if="modalBody.result.type == 'columns'" class="flex mt-2">
            <font-awesome-icon
              icon="exclamation-circle"
              size="lg"
              class="text-red-500 mr-2"
            />
            <p>
              The columns must be named as follows:
              <span class="text-gray-2"
                >hn, date_of_submission, report_issued_date, species,
                bacteria_species, submitted_sample, vitek_id,
                S/I/R_{antimicrobial}, ans_{antimicrobial}
              </span>
            </p>
          </div>
          <div v-else>
            <div class="flex items-center mt-2">
              <font-awesome-icon
                icon="exclamation-circle"
                size="lg"
                class="text-red-500 mr-2"
              />
              <p>
                Conditionally
                <span class="text-red-500">invalid rows</span> are as follows:
              </p>
            </div>
            <ul class="list-disc ml-14">
              <li v-for="(item, index) in modalBody.result.messages" :key="index">
                {{ item.slice(0, item.indexOf(":")) }}
                <span class="text-gray-2">
                  {{ item.slice(item.indexOf(":")) }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "./Pagination.vue";
import Modal from "./Modal.vue";

export default {
  name: "FileUploadLog",
  components: {
    Pagination,
    Modal,
  },
  data() {
    return {
      host: "http://localhost:8000",
      logs: [
        {
          filename: "Dataset_2022.csv",
          start_date: "20-JUN-2023 08:03:00",
          finish_date: "-",
          time: "-",
          amount_row: "-",
          result: {
            status: "pending",
            type: "",
            messages: [],
          },
        },
        {
          filename: "Dataset_2022.csv",
          start_date: "20-JUN-2023 08:03:00",
          finish_date: "20-JUN-2023 16:10:00",
          time: "6m 22s",
          amount_row: 550,
          result: {
            status: "success",
            type: "",
            messages: [],
          },
        },
        {
          filename: "Dataset_2021.csv",
          start_date: "20-JUN-2022 08:03:00",
          finish_date: "20-JUN-2022 16:10:00",
          time: "5m 22s",
          amount_row: 500,
          result: {
            status: "fail",
            type: "",
            messages: [
              'S/I/R_{antimicrobial} must be "S", "I", "R", "+", "-" or " ": 33, 34',
              'ans_{antimicrobial} must be "True" or "False": 40',
              "duplicate rows 10 rows: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19",
            ],
          },
        },
      ],
      showModal: false,
      // page: 1,
      totalPages: 4,
      total: 40,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
      modalBody: {},
    };
  },
  methods: {
    showMore(page) {
      // this.page = page;
      this.currentPage = page;
    },
    getLogs() {
      let params = { page: this.currentPage };
      axios.get(`${this.host}/api/logs_upload`, { params }).then((response) => {
        this.logs = response.data.data;
        this.totalPages = 4;
        this.total = 40;
      });
    },
    success(log) {
      return log.result.status == "success";
    },
    fail(log) {
      return log.result.status == "fail";
    },
    closeModal() {
      this.showModal = false;
    },
    openModal(body) {
      this.showModal = true;
      this.modalBody = body;
    },
  },
};
</script>
