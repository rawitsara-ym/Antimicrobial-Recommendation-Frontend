<template>
  <div class="w-full">
    <p class="text-left text-xl md:text-2xl font-semibold my-8">File Upload Log</p>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <table class="border-l border-r border-b w-full">
          <thead class="bg-gray-3 text-left text-gray-800 whitespace-nowrap">
            <tr>
              <th class="px-2 py-3 font-medium"></th>
              <th class="px-2 py-3 font-medium">#</th>
              <th class="px-2 py-3 font-medium">
                Filename
              </th>
              <th class="px-2 py-3 font-medium">
                Start Date
              </th>
              <th class="px-2 py-3 font-medium">
                Finish Date
              </th>
              <th class="px-2 py-3 font-medium">Time</th>
              <th class="px-2 py-3 font-medium">
                Total Rows
              </th>
              <th class="px-2 py-3 font-medium">Status</th>
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
                {{ upperFirst(item.result.status) }}
              </td>
              <td>
                <button
                  @click="openModal(item)"
                  :disabled="!success(item) && !fail(item)"
                  :class="{
                    'opacity-50 cursor-not-allowed':
                      !success(item) && !fail(item),
                  }"
                  class="bg-yellow-1 text-sm font-semibold py-1 px-4 m-2 rounded"
                >
                  Result
                </button>
              </td>
            </tr>
            <tr v-if="logs.length == 0">
              <td
                colspan="9"
                class="text-center text-sm font-medium p-4"
              >
                No Data
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination
        :row-on-page="logs.length"
        :total-pages="totalPages"
        :total-rows="totalRows"
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
              <li
                v-for="(item, index) in modalBody.result.messages"
                :key="index"
              >
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
      logs: [],
      showModal: false,
      // page: 1,
      totalPages: 1,
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
      modalBody: {},
    };
  },
  created() {
    this.getLogs();
  },
  methods: {
    showMore(page) {
      // this.page = page;
      this.currentPage = page;
    },
    getLogs() {
      let params = { page: this.currentPage };
      this.axios.get(`${this.host}/api/logs_upload`, { params }).then((response) => {
        if (response.data.status == "success") {
          this.logs = response.data.data.logs;
          this.totalRows = response.data.data.total_rows;
          this.totalPages = Math.ceil(this.totalRows / this.perPage);
        }
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
