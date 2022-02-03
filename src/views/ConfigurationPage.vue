<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-2xl font-semibold my-6">Model Configuration</h1>
    <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-gray-900">
      <p class="font-semibold">Classification Alogorithm</p>
      <div class="text-gray-600">
        <p>XGBoost</p>
        <p>Parameter : n_estimators =1000, learning_rate = 0.1</p>
      </div>
      <p class="font-semibold">Train : Test</p>
      <p class="text-gray-600">80 : 20</p>
      <p class="font-semibold">Test By Case</p>
      <p class="text-gray-600">10%</p>
      <p class="font-semibold">Feature</p>
      <ul class="text-gray-600 list-disc ml-5">
        <li>ชนิดสัตว์เลี้ยง (Species)</li>
        <li>สกุลแบคทีเรีย (Bactearia Genus)</li>
        <li>ชนิดของการ์ดที่ใช้ตรวจด้วยเครื่อง Vitek (Vitek ID Card)</li>
        <li>ตัวอย่างที่ส่งตรวจ (Submitted Sample)</li>
        <li>ผลตรวจความไวต่อยาต้านจุลชีพ (S/I/R)</li>
      </ul>
      <p class="font-semibold">SMOTE Algorithms</p>
      <p></p>
      <table class="border-l border-r border-b">
        <thead class="bg-gray-3">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-1">
              #
            </th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-1">
              Antimicrobial Model (GN)
            </th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-1">
              SMOTE Algorithm
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in gn_anti" :key="index" class="bg-white">
            <td class="px-4 py-2 text-sm">{{ index + 1 }}</td>
            <td class="px-4 py-2 text-sm">
              {{ upperFirst(item.antimicrobial) }}
            </td>
            <td class="px-4 py-2 text-sm">
              {{ item.smote }}
            </td>
          </tr>
        </tbody>
      </table>

      <table class="border-l border-r border-b">
        <thead class="bg-gray-3">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-1">
              #
            </th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-1">
              Antimicrobial Model (GP)
            </th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-1">
              SMOTE Algorithm
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in gp_anti" :key="index" class="bg-white">
            <td class="px-4 py-2 text-sm">{{ index + 1 }}</td>
            <td class="px-4 py-2 text-sm">
              {{ upperFirst(item.antimicrobial) }}
            </td>
            <td class="px-4 py-2 text-sm">
              {{ item.smote }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigurationPage",
  data() {
    return {
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
        { antimicrobial: "gentamicin", smote: "R-SVM-SMOTE" },
        { antimicrobial: "imipenem", smote: "R-SMOTE" },
        { antimicrobial: "marbofloxacin", smote: "R-SVM-SMOTE" },
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
        { antimicrobial: "gentamicin", smote: "R-SVM-SMOTE" },
        { antimicrobial: "imipenem", smote: "R-SMOTE" },
        { antimicrobial: "marbofloxacin", smote: "R-SVM-SMOTE" },
        { antimicrobial: "nitrofurantoin", smote: "R-SMOTE" },
        { antimicrobial: "trimethoprim/sulfamethoxazole", smote: "R-SMOTE" },
      ],
    };
  },
  methods: {
    upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  },
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
