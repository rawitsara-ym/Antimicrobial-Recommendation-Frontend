<template>
  <div class="">
    <table class="border-l border-r border-b">
      <thead class="bg-gray-3">
        <tr>
          <th class="px-6 py-3 text-left font-medium text-gray-1">#</th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">Filename</th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">
            Upload Date
          </th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">
            Amount of Rows
          </th>
          <th class="px-6 py-3 text-left font-medium text-gray-1">Delete</th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr v-for="(item, index) in files" :key="index" class="bg-white">
          <td class="px-6 py-2">{{ index + 1 }}</td>
          <td class="px-6 py-2">{{ item.filename }}</td>
          <td class="px-6 py-2">{{ item.timestamp }}</td>
          <td class="px-6 py-2">{{ item.amount_row }}</td>
          <td class="px-6 py-2 text-center">
            <button @click="deleteFile">
              <font-awesome-icon icon="trash-alt" class="text-red-500" />
            </button>
          </td>
        </tr>
        <tr v-if="files.length == 0">
          <td
            colspan="5"
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
      :total="total"
      :per-page="perPage"
      :current-page="currentPage"
      :has-more-pages="hasMorePages"
      @pagechanged="showMore"
    />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";

export default {
  name: "FileManagement",
  components: {
    Pagination,
  },
  data() {
    return {
      files: [
        {
          filename: "Report_6_2022.csv",
          timestamp: "30-JUN-2022 08:03:00",
          amount_row: 567,
        },
        {
          filename: "Report_12_2021.csv",
          timestamp: "31-DEC-2021 12:12:00",
          amount_row: 689,
        },
      ],
      totalPages: 4,
      total: 40,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
    };
  },
  methods: {
    showMore(page) {
      this.currentPage = page;
    },
  },
};
</script>
