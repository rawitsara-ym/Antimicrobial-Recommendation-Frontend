<template>
  <div class="w-full">
    <p class="text-left text-2xl font-semibold my-8">File Upload Log</p>
    <div class="flex flex-col">
      <table class="border-l border-r border-b">
        <thead class="bg-gray-3">
          <tr>
            <th class="px-2 py-3 text-left font-medium text-gray-1"></th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              #
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Filename
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Start Date
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Finish Date
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Time
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Rows
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1">
              Status
            </th>
            <th class="px-2 py-3 text-left font-medium text-gray-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in logs" :key="index">
            <td class="px-2 py-2 text-center">
              <font-awesome-icon v-if="success(item)" icon="check-circle" size="lg" class="text-green-500"/>
              <font-awesome-icon v-else-if="fail(item)" icon="exclamation-circle" size="lg" class="text-red-500"/>
              <font-awesome-icon v-else icon="spinner" size="lg" class="text-blue-500" spin />
            </td>
            <td class="px-2 py-2">{{ index + 1 }}</td>
            <td class="px-2 py-2">{{ item.filename }}</td>
            <td class="px-2 py-2">{{ item.start_date }}</td>
            <td class="px-2 py-2">{{ item.finish_date }}</td>
            <td class="px-2 py-2">{{ item.time }}</td>
            <td class="px-2 py-2">{{ item.amount_row }}</td>
            <td class="px-2 py-2">
              <font-awesome-icon v-if="success(item)" icon="circle" size="xs" class="text-green-500"/>
              <font-awesome-icon v-else-if="fail(item)" icon="circle" size="xs" class="text-red-500"/>
              <font-awesome-icon v-else icon="circle" size="xs" class="text-blue-500" />
              {{ item.result.status }}
            </td>
            <td>
              <button
                @click="openResult"
                :disabled="!success(item) && !fail(item)"
                :class="{ 'opacity-50 cursor-not-allowed': !success(item) && !fail(item)}"
                class="bg-yellow-1 text-gray-1 text-sm font-semibold py-2 px-6 m-2 rounded"
              >
                Result
              </button>
            </td>
          </tr>
          <tr v-if="logs.length == 0">
            <td
              colspan="7"
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
      >
      </pagination>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from './Pagination.vue';

export default {
  name: "FileUploadLog",
  components: {
    Pagination,
  },
  data() {
    return {
      host: 'http://localhost:8000',
      logs: [
        {
          filename: "Dataset_2022.csv",
          start_date: "20-JUN-2023 08:03:00",
          finish_date: "20-JUN-2023 16:10:00",
          time: "5m 22s",
          amount_row: 500,
          result: {
            status: "success",
            type: "",
            messages: [],
          },
        },
      ],
      // page: 1,
      totalPages: 4,
      total: 40,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
    };
  },
  methods: {
    showMore(page) {
      // this.page = page;
      this.currentPage = page;
    },
    getLogs() {
      let params = { page: this.currentPage };
      axios.get(`${this.host}/api/logs_upload`, { params })
        .then((response) => {
        this.logs = response.data.data;
        this.totalPages = 4;
        this.total = 40;
      })
    },
    success(log) {
      return log.result.status == 'success';
    },
    fail(log) {
      return log.result.status == 'fail';
    },
  },
};
</script>
