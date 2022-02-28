<template>
  <div class="flex flex-col w-full">
    <div class="overflow-x-auto">
      <table class="border-l border-r border-b w-full">
        <thead class="bg-gray-3 text-left text-gray-800 whitespace-nowrap">
          <tr>
            <th class="px-6 py-3 font-medium">#</th>
            <th class="px-6 py-3 font-medium">Filename</th>
            <th class="px-6 py-3 font-medium">Vitek ID</th>
            <th class="px-6 py-3 font-medium">Upload Date</th>
            <th class="px-6 py-3 font-medium">Total Rows</th>
            <th class="px-6 py-3 font-medium">Delete</th>
          </tr>
        </thead>
        <tbody class="text-gray-800">
          <tr v-for="(item, index) in files" :key="index" class="bg-white">
            <td class="px-6 py-2">{{ index + 1 }}</td>
            <td class="px-6 py-2">{{ item.name }}</td>
            <td class="px-6 py-2">{{ item.vitek_id }}</td>
            <td class="px-6 py-2 whitespace-nowrap">{{ item.upload_at }}</td>
            <td class="px-6 py-2">{{ item.amount_row }}</td>
            <td class="px-6 py-2">
              <button
                @click="showPopUpConfirm(item)"
                :disabled="!item.can_delete"
                :class="{ 'opacity-50 cursor-not-allowed': !item.can_delete }"
              >
                <font-awesome-icon icon="trash-alt" class="text-red-400" />
              </button>
            </td>
          </tr>
          <tr v-if="files.length == 0">
            <td colspan="6" class="text-center text-sm font-medium p-4">
              <loader v-if="show_loading" />
              <p v-else>No File</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      v-show="totalPages != 0"
      :row-on-page="files.length"
      :total-pages="totalPages"
      :total-rows="totalRows"
      :per-page="perPage"
      :current-page="currentPage"
      :has-more-pages="hasMorePages"
      @pagechanged="showMore"
    />
  </div>

  <!-- Confirm Pop-Up -->
  <pop-up
    :type="'confirm'"
    :showPopUp="show_popup_confirm"
    @OnConfirm="onConfirm"
    @OnCancel="onCancel"
  >
    <template v-slot:popup-header>
      <h2 class="font-bold">Confirm File Deletion</h2>
    </template>
    <template v-slot:popup-body>
      <h4 class="font-sarabun">
        คุณต้องการลบไฟล์ "{{ filename }}" ใช่หรือไม่?
      </h4>
    </template>
  </pop-up>

  <!-- Success Pop-Up -->
  <pop-up
    :type="'success'"
    :showPopUp="show_popup_success"
    @OnSuccess="onSuccess"
  >
    <p class="font-sarabun text-gray-500">ลบไฟล์ "{{filename}}"" สำเร็จ</p>
  </pop-up>

  <!-- Fail Pop-up -->
  <pop-up
    :type="'fail'"
    :showPopUp="show_popup_fail"
    @OnFail="onFail"
  >
    <p class="font-sarabun">ลบไฟล์ "{{ filename }}"" ไม่สำเร็จ</p>
    <p class="font-sarabun">{{ message_fail }}</p>
  </pop-up>

  <!-- Error Pop-up -->
  <pop-up
    :type="'fail'"
    :showPopUp="show_popup_error"
    @OnFail="onError"
  >
    <p class="font-sarabun">ลบไฟล์ "{{ filename }}"" ไม่สำเร็จ</p>
  </pop-up>

  <!-- Loader -->
  <div
    v-if="show_delete_loading"
    class="fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full opacity-25 bg-black"
  >
    <loader />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import PopUp from "./PopUp.vue";
import Loader from "./Loader.vue";

export default {
  name: "FileManagement",
  components: {
    Pagination,
    PopUp,
    Loader,
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
      show_popup_fail: false,
      show_popup_error: false,
      filename: null,
      file_id: null,
      show_delete_loading: false,
      show_loading: false,
      message_fail: null,
    };
  },
  created() {
    this.show_loading = true;
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
            this.totalRows = response.data.data.total_row;
            this.totalPages = this.totalRows == 0 ? 1 : Math.ceil(this.totalRows / this.perPage);
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
    deleteFile() {
      this.show_delete_loading = true;
      let params = { file_id: this.file_id };
      this.axios
        .delete(`${this.host}/api/delete_file`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.show_delete_loading = false;
            this.showPopUpSuccess();
          } else {
            this.message_fail = response.data.data.message;
            this.show_delete_loading = false;
            this.show_popup_fail = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.show_delete_loading = false;
          this.show_popup_error = true;
        });
    },
    showMore(page) {
      this.currentPage = page;
    },
    showPopUpConfirm(file) {
      this.show_popup_confirm = true;
      this.filename = file.name;
      this.file_id = file.id;
    },
    showPopUpSuccess() {
      this.show_popup_success = true;
    },
    onConfirm() {
      this.deleteFile();
      this.show_popup_confirm = false;
    },
    onCancel() {
      this.show_popup_confirm = false;
    },
    onSuccess() {
      this.show_popup_success = false;
      this.getFiles();
    },
    onFail() {
      this.show_popup_fail = false;
    },
    onError() {
      this.show_popup_error = false;
    },
  },
};
</script>
