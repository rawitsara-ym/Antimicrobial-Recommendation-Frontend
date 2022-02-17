<template>
  <div class="flex flex-col w-full">
    <div class="overflow-x-auto">
      <table class="border-l border-r border-b w-full">
        <thead class="bg-gray-3 text-left text-gray-800 whitespace-nowrap">
          <tr>
            <th class="px-6 py-3 font-medium">#</th>
            <th class="px-6 py-3 font-medium">Filename</th>
            <th class="px-6 py-3 font-medium">Vitek ID</th>
            <th class="px-6 py-3 font-medium">
              Uploaded Date
            </th>
            <th class="px-6 py-3 font-medium">
              Total Rows
            </th>
            <th class="px-6 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody class="text-gray-800">
          <tr v-for="(item, index) in files" :key="index" class="bg-white">
            <td class="px-6 py-2">{{ index + 1 }}</td>
            <td class="px-6 py-2">{{ item.filename }}</td>
            <td class="px-6 py-2">{{ item.vitek_id }}</td>
            <td class="px-6 py-2">{{ item.timestamp }}</td>
            <td class="px-6 py-2">{{ item.amountRow }}</td>
            <td class="px-6 py-2">
              <button @click="deleteFile(item.id)">
                <font-awesome-icon icon="trash-alt" class="text-red-400" />
              </button>
            </td>
          </tr>
          <tr v-if="files.length == 0">
            <td
              colspan="6"
              class="text-center text-sm font-medium p-4"
            >
              No File
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

  <pop-up
    :type="'confirm'"
    :showPopUp="show_popup_confirm"
    @OnConfirm="onConfirm"
    @OnCancel="onCancel"
  >
    <template v-slot:popup-header>
      <h2 class="font-bold">Confirm</h2>
    </template>
    <template v-slot:popup-body>
      <h4 class="font-semibold text-lg">Are you sure delete this file?</h4>
      <p class="text-gray-500">
        If you delete the file you can not recover it.
      </p>
    </template>
  </pop-up>

  <pop-up
    :type="'success'"
    :showPopUp="show_popup_success"
    @OnSuccess="onSuccess"
  >
    <p class="text-gray-500">Successfully deleted the file.</p>
  </pop-up>
</template>

<script>
import Pagination from "./Pagination.vue";
import PopUp from "./PopUp.vue";

export default {
  name: "FileManagement",
  components: {
    Pagination,
    PopUp,
  },
  data() {
    return {
      files: [],
      totalPages: 1,
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
      show_popup_confirm: false,
      show_popup_success: false,
    };
  },
  created() {
    this.getFiles();
  },
  methods: {
    getFiles() {
      let params = { page: this.currentPage };
      this.axios
        .get(`${this.host}/api/view_all_files`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.files = response.data.data.files;
            this.totalRows = response.data.data.total_rows;
            this.totalPages = Math.ceil(this.totalRows / this.perPage);
          }
        });
    },
    deleteFile() {
      this.showPopUpConfirm();
    },
    showMore(page) {
      this.currentPage = page;
    },
    showPopUpConfirm() {
      this.show_popup_confirm = true;
    },
    showPopUpSuccess() {
      this.show_popup_success = true;
    },
    onConfirm() {
      this.show_popup_confirm = false;
      this.show_popup_success = true;
    },
    onCancel() {
      this.show_popup_confirm = false;
    },
    onSuccess() {
      this.show_popup_success = false;
    },
  },
};
</script>
