<template>
  <div class="flex flex-col items-center max-w-full mt-8">
    <div class="max-w-full">
      <h5 class="text-sm sm:text-base text-center font-semibold mb-2">
        ตารางแสดงประสิทธิภาพของแต่ละโมเดล
      </h5>
      <div class="overflow-x-auto max-w-full">
        <table class="border-l border-r border-b">
          <thead class="bg-gray-3 text-left text-xs sm:text-sm text-gray-800 whitespace-nowrap">
            <tr>
              <th class="px-4 py-3 font-medium">
                #
              </th>
              <th class="px-4 py-3 font-medium">
                Antimicrobial Model
              </th>
              <th
                v-if="version != 0"
                class="px-4 py-3 font-medium"
              ></th>
              <th class="px-4 py-3 font-medium">
                Version
              </th>
              <th class="px-4 py-3 font-medium">
                Accuracy
              </th>
              <th class="px-4 py-3 font-medium">
                Precision
              </th>
              <th class="px-4 py-3 font-medium">
                Recall
              </th>
              <th class="px-4 py-3 font-medium">
                F1-Score
              </th>
              <th
                v-if="version == 0"
                class="px-4 py-3 font-medium"
              >
                File
              </th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm">
            <tr
              v-for="(item, index) in performances"
              :key="index"
              class="bg-white"
            >
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">
                {{ upperFirst(item.antimicrobial) }}
              </td>
              <td v-if="version != 0" class="px-4 py-2">
                <font-awesome-icon
                  v-if="item.performance == 'better'"
                  icon="arrow-up"
                  size="xs"
                  class="text-green-500"
                />
                <font-awesome-icon
                  v-else-if="item.performance == 'same'"
                  icon="equals"
                  size="xs"
                  class="text-blue-500"
                />
                <font-awesome-icon
                  v-else
                  icon="arrow-down"
                  size="xs"
                  class="text-red-500"
                />
              </td>
              <td class="px-4 py-2">{{ item.version }}</td>
              <td class="px-4 py-2">{{ item.accuracy.toFixed(3) }}</td>
              <td class="px-4 py-2">{{ item.precision.toFixed(3) }}</td>
              <td class="px-4 py-2">{{ item.recall.toFixed(3) }}</td>
              <td class="px-4 py-2">{{ item.f1.toFixed(3) }}</td>
              <td v-if="version == 0" class="px-4 py-2">
                <button
                  @click="viewFile(item.model_group_id)"
                  class="bg-blue-3 text-xs font-semibold py-1 px-4 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="version != 0" class="flex mt-2 text-xs sm:text-sm">
        <p class="mr-2 whitespace-nowrap">*** หมายเหตุ</p>
        <div class="whitespace-nowrap">
          <font-awesome-icon
            icon="arrow-up"
            size="xs"
            class="text-green-500 mr-2"
          />
          <font-awesome-icon icon="equals" size="xs" class="text-blue-500 mr-2" />
          <font-awesome-icon
            icon="arrow-down"
            size="xs"
            class="text-red-500 mr-2"
          />
        </div>
        <p>
          หมายถึง F1-Score เพิ่มขึ้น, เท่าเดิม, ลดลง (ตามลำดับ) จากโมเดลเดิม
        </p>
      </div>
    </div>

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
import Modal from "./Modal.vue";

export default {
  name: "PerformanceTable",
  components: {
    Modal,
  },
  props: {
    version: {
      type: Number,
      required: true,
    },
    performances: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      files: [],
      showModal: false,
      modalBody: "",
    };
  },
  methods: {
    viewFile(modelGroupId) {
      console.log("test");
      this.openModal(this.files);
      let params = { model_group_id: modelGroupId };
      this.axios
        .get(`${this.host}/api/view_filename`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.files = response.data.data.files;
            this.openModal(this.files);
          }
        });
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
