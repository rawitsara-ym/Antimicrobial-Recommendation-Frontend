<template>
  <div class="flex flex-col items-center mb-8 w-full">
    <h1 class="text-gray-800 text-2xl font-semibold my-6">
      Model Configuration
    </h1>
    <div class="max-w-full">
      <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-gray-800 max-w-full">
        <p class="font-medium">Train : Test</p>
        <p class="text-gray-600">80 : 20</p>
        <p class="font-medium">Test By Case</p>
        <p class="text-gray-600">10%</p>
        <p class="font-medium">Feature</p>
        <ul class="text-gray-600 list-disc ml-5">
          <li><span class="font-sarabun">ชนิดสัตว์เลี้ยง</span> (Species)</li>
          <li>
            <span class="font-sarabun">สกุลแบคทีเรีย</span> (Bactearia Genus)
          </li>
          <li>
            <span class="font-sarabun">ชนิดของการ์ดที่ใช้ตรวจด้วยเครื่อง</span>
            Vitek (Vitek ID Card)
          </li>
          <li>
            <span class="font-sarabun">ตัวอย่างที่ส่งตรวจ</span> (Submitted
            Sample)
          </li>
          <li>
            <span class="font-sarabun">ผลตรวจความไวต่อยาต้านจุลชีพ</span>
            (S/I/R/POS/NEG)
          </li>
        </ul>
        <p class="font-medium">Classification Alogorithm</p>
        <p class="text-gray-600">XGBoost</p>
        <p class="font-medium">Parameters</p>

        <div class="font-medium text-gray-600">
          <select
            @change="changeParams"
            v-model="vitek_id_params"
            class="border border-solid border-gray-300 rounded px-2"
          >
            <option
              v-for="(item, index) in vitek_id_options"
              :key="index"
              :value="item.id"
            >
              {{ item.name.toUpperCase() }}
            </option>
          </select>
        </div>

        <div class="overflow-x-auto w-full col-span-2">
          <table class="border-l border-r border-b w-full">
            <thead class="bg-gray-3 text-left text-sm text-gray-800">
              <tr>
                <th class="px-4 py-3 font-medium">#</th>
                <th class="px-4 py-3 font-medium">{{ title_params }}</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">
                  Parameters
                </th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-800">
              <tr
                v-for="(item, index) in xgb_params"
                :key="index"
                class="bg-white"
              >
                <td class="px-4 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2">
                  {{ upperFirst(item.name) }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                  {{ item.params }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="font-medium text-gray-800 mt-4">SMOTE Algorithms</p>
        <div class="font-medium text-gray-600 mt-4">
          <select
            @change="changeSmote"
            v-model="vitek_id_smote"
            class="border border-solid border-gray-300 rounded px-2"
          >
            <option
              v-for="(item, index) in vitek_id_options"
              :key="index"
              :value="item.id"
            >
              {{ item.name.toUpperCase() }}
            </option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto w-full mt-4 col-span-2">
        <table class="border-l border-r border-b w-full">
          <thead class="bg-gray-3 text-left text-sm text-gray-800">
            <tr>
              <th class="px-4 py-3 font-medium">#</th>
              <th class="px-4 py-3 font-medium">{{ title_smote }}</th>
              <th class="px-4 py-3 font-medium whitespace-nowrap">
                SMOTE Algorithm
              </th>
            </tr>
          </thead>
          <tbody class="text-sm text-gray-800">
            <tr
              v-for="(item, index) in smote_algo"
              :key="index"
              class="bg-white"
            >
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">
                {{ upperFirst(item.name) }}
              </td>
              <td class="px-4 py-2 whitespace-nowrap">
                {{ item.algo }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigurationPage",
  data() {
    return {
      vitek_id_params: 1,
      vitek_id_smote: 1,
      vitek_id_options: [],
      xgb_params: [],
      smote_algo: [],
      title_params: "Antimicrobial Model (GN)",
      title_smote: "Antimicrobial Model (GP)",
    };
  },
  created() {
    this.getVitekId();
    this.getXgbParams();
    this.getSmote();
  },
  methods: {
    getVitekId() {
      this.axios.get(`${this.host}/api/vitek_id`).then((response) => {
        if (response.data.status == "success") {
          this.vitek_id_options = response.data.data.vitek_id;
        }
      });
    },
    getXgbParams() {
      let params = { vitek_id: this.vitek_id_params };
      this.axios
        .get(`${this.host}/api/configuration_xgb_parameter`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.xgb_params = response.data.data.xgb_params;
          }
        });
    },
    getSmote() {
      let params = { vitek_id: this.vitek_id_smote };
      this.axios
        .get(`${this.host}/api/configuration_smote`, { params })
        .then((response) => {
          if (response.data.status == "success") {
            this.smote_algo = response.data.data.smote;
          }
        });
    },
    changeParams() {
      this.getXgbParams();
      this.title_params = `Antimicrobial Model (${
        this.vitek_id_params == 1 ? "GN" : "GP"
      })`;
    },
    changeSmote() {
      this.getSmote();
      this.title_smote = `Antimicrobial Model (${
        this.vitek_id_smote == 1 ? "GN" : "GP"
      })`;
    },
  },
};
</script>

<style scoped>
.grid-col-2 {
  grid-template-columns: 1fr 3fr;
}
.col-gap {
  column-gap: 60px;
}
</style>
