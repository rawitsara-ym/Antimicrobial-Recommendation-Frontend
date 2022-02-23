<template>
  <div class="flex flex-col items-center mb-8 w-full">
    <h1 class="text-gray-800 text-2xl font-semibold my-6">
      Model Configuration
    </h1>
    <div class="max-w-full">
      <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-gray-800">
        <!-- <p class="font-medium">Classification Alogorithm</p>
        <div class="text-gray-600">
          <p>XGBoost</p>
          <p>Parameter : { n_estimators =1000, learning_rate = 0.1 }</p>
        </div> -->
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
      </div>

      <div class="overflow-x-auto w-full mt-4">
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
              v-for="(item, index) in gn_params"
              :key="index"
              class="bg-white"
            >
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">
                {{ upperFirst(item.antimicrobial) }}
              </td>
              <td class="px-4 py-2 whitespace-nowrap">
                {{ item.params }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="font-medium my-4 text-gray-800">SMOTE Algorithms</p>
      <div
        class="flex flex-col lg:flex-row justify-between items-center gap-x-8 gap-y-4 max-w-full"
      >
        <div class="overflow-x-auto max-w-full">
          <table class="border-l border-r border-b">
            <thead class="bg-gray-3 text-left text-sm text-gray-800">
              <tr>
                <th class="px-4 py-3 font-medium">#</th>
                <th class="px-4 py-3 font-medium">Antimicrobial Model (GN)</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">
                  SMOTE Algorithm
                </th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-800">
              <tr
                v-for="(item, index) in gn_anti"
                :key="index"
                class="bg-white"
              >
                <td class="px-4 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2">
                  {{ upperFirst(item.antimicrobial) }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                  {{ item.smote }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="overflow-x-auto max-w-full">
          <table class="border-l border-r border-b">
            <thead class="bg-gray-3 text-left text-sm text-gray-800">
              <tr>
                <th class="px-4 py-3 font-medium">#</th>
                <th class="px-4 py-3 font-medium">Antimicrobial Model (GP)</th>
                <th class="px-4 py-3 font-medium whitespace-nowrap">
                  SMOTE Algorithm
                </th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-800">
              <tr
                v-for="(item, index) in gp_anti"
                :key="index"
                class="bg-white"
              >
                <td class="px-4 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2">
                  {{ upperFirst(item.antimicrobial) }}
                </td>
                <td class="px-4 py-2">
                  {{ item.smote }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      vitek_id_options: [],
      title_params: "Antimicrobial Model (GN)",
      gn_anti: [
        { antimicrobial: "amikacin", smote: "R-SMOTE" },
        {
          antimicrobial: "amoxicillin/clavulanic acid",
          smote: "Borderline-SMOTE",
        },
        { antimicrobial: "cefalexin", smote: "SMOTE" },
        { antimicrobial: "cefovecin", smote: "SMOTE" },
        { antimicrobial: "doxycycline", smote: "Borderline-SMOTE" },
        { antimicrobial: "enrofloxacin", smote: "R-SMOTE" },
        { antimicrobial: "gentamicin", smote: "SVM-SMOTE" },
        { antimicrobial: "imipenem", smote: "R-SMOTE" },
        { antimicrobial: "marbofloxacin", smote: "SVM-SMOTE" },
        { antimicrobial: "nitrofurantoin", smote: "R-SMOTE" },
        { antimicrobial: "trimethoprim/sulfamethoxazole", smote: "R-SMOTE" },
      ],
      gp_anti: [
        { antimicrobial: "amikacin", smote: "R-SMOTE" },
        {
          antimicrobial: "amoxicillin/clavulanic acid",
          smote: "Borderline-SMOTE",
        },
        { antimicrobial: "cefalexin", smote: "SMOTE" },
        { antimicrobial: "cefovecin", smote: "SMOTE" },
        { antimicrobial: "doxycycline", smote: "Borderline-SMOTE" },
        { antimicrobial: "enrofloxacin", smote: "R-SMOTE" },
        { antimicrobial: "gentamicin", smote: "SVM-SMOTE" },
        { antimicrobial: "imipenem", smote: "R-SMOTE" },
        { antimicrobial: "marbofloxacin", smote: "SVM-SMOTE" },
        { antimicrobial: "nitrofurantoin", smote: "R-SMOTE" },
        { antimicrobial: "trimethoprim/sulfamethoxazole", smote: "R-SMOTE" },
      ],
      gn_params: [
        {
          antimicrobial: "amikacin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "amoxicillin/clavulanic acid",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "cefalexin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "cefovecin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "doxycycline",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "enrofloxacin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "gentamicin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "imipenem",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "marbofloxacin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "nitrofurantoin",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
        {
          antimicrobial: "trimethoprim/sulfamethoxazole",
          params: "n_estimators =1000, learning_rate = 0.1",
        },
      ],
    };
  },
  created() {
    this.getVitekId();
  },
  methods: {
    getVitekId() {
      this.axios.get(`${this.host}/api/vitek_id`).then((response) => {
        if (response.data.status == "success") {
          this.vitek_id_options = response.data.data.vitek_id;
        }
      });
    },
    changeParams() {
      this.title_params = `Antimicrobial Model (${(this.vitek_id_params == 1) ? "GN" : "GP"})`
    }
  }
};
</script>

<style scoped>
.grid-col-2 {
  grid-template-columns: 2.5fr 1fr;
}
.col-gap {
  column-gap: 60px;
}
</style>
