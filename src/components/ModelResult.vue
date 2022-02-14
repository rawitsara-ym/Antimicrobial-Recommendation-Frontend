<template>
  <div class="my-8 flex flex-col items-center max-w-full">
    <p class="font-semibold mb-4">Results</p>
    <div class="overflow-x-auto max-w-full">
      <table class="border-l border-r border-b">
        <thead class="bg-gray-3 text-left text-sm text-gray-800">
          <tr>
            <th class="px-6 py-3 font-medium">
              #
            </th>
            <th class="px-6 py-3 font-medium">
              Antimicrobial Recommendation
            </th>
            <th class="px-6 py-3 font-medium">
              Confidence
            </th>
          </tr>
        </thead>
        <tbody class="text-sm text-gray-800 whitespace-nowrap">
          <tr v-for="(item, key, index) in results" :key="key" class="bg-white">
            <td class="px-6 py-2">{{ index + 1 }}</td>
            <td class="px-6 py-2">
              {{ upperFirst(key) }}
            </td>
            <td class="px-6 py-2">
              {{ item.toFixed(2) + "%" }}
            </td>
          </tr>
          <tr v-if="Object.keys(results).length == 0">
            <td
              colspan="3"
              class="text-center font-medium p-4"
            >
              No Recommedation
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelResult",
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
};
</script>
