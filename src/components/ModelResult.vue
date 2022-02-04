<template>
  <div class="my-8 flex flex-col items-center">
    <p class="font-semibold mb-4">Results</p>
    <table class="border-l border-r border-b">
      <thead class="bg-gray-3">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-1">#</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-1">
            Antimicrobial Recommendation
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-1">
            Confidence
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key, index) in results" :key="key" class="bg-white">
          <td class="px-6 py-2 text-sm whitespace-nowrap">{{ index + 1 }}</td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            {{ upperFirst(key) }}
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            {{ item.toFixed(2) + "%" }}
          </td>
        </tr>
        <tr v-if="Object.keys(results).length == 0">
          <td
            colspan="3"
            class="text-center text-sm font-medium text-gray-1 p-4"
          >
            No Recommedation
          </td>
        </tr>
      </tbody>
    </table>
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
