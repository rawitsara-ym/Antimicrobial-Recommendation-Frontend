<template>
  <div class="flex flex-col w-full">
    <table class="border-l border-r border-b">
      <thead class="bg-gray-3">
        <tr>
          <th class="px-6 py-3 text-left font-medium text-gray-1">#</th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">Filename</th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">Vitek ID</th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">
            Uploaded Date
          </th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">
            Total Rows
          </th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">Delete</th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr v-for="(item, index) in files" :key="index" class="bg-white">
          <td class="px-6 py-2">{{ index + 1 }}</td>
          <td class="px-6 py-2">{{ item.filename }}</td>
          <td class="px-6 py-2">{{ item.vitek_id }}</td>
          <td class="px-6 py-2">{{ item.timestamp }}</td>
          <td class="px-6 py-2">{{ item.amountRow }}</td>
          <td class="px-6 py-2">
            <button @click="deleteFile">
              <font-awesome-icon icon="trash-alt" class="text-red-400" />
            </button>
          </td>
        </tr>
        <tr v-if="files.length == 0">
          <td
            colspan="6"
            class="text-center text-sm font-medium text-gray-1 p-4"
          >
            No File
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      :row-on-page="files.length"
      :total-pages="totalPages"
      :total-rows="totalRows"
      :per-page="perPage"
      :current-page="currentPage"
      :has-more-pages="hasMorePages"
      @pagechanged="showMore"
    />
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "./Pagination.vue";

export default {
  name: "FileManagement",
  components: {
    Pagination,
  },
  data() {
    return {
      files: [],
      totalPages: 1,
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
    };
  },
  created() {
    this.getFiles();
  },
  methods: {
    getFiles() {
      let params = { page: this.currentPage };
      axios
        .get(`${this.host}/api/view_all_files`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.files = response.data.data.files;
            this.totalRows = response.data.data.total_rows;
            this.totalPages = Math.ceil(this.totalRows / this.perPage);
          }
        });
    },
    showMore(page) {
      this.currentPage = page;
    },
  },
};
</script>
