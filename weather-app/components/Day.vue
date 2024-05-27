<template>
      <div class="text-center">
        <p class="text-lg">
          <time class="text-gray-600" :datetime="processedResult.dt">
            {{ new Date(processedResult.dt * 1000).toLocaleTimeString([], { weekday: 'long' }).split(' ')[0] }}
          </time>
        </p>
        <div class="w-10 h-10 bg-blue-300 rounded-full mx-auto my-2">
          <img :src="'https://openweathermap.org/img/wn/' + processedResult.icon + '@2x.png'">
        </div>
        <p class="text-sm text-blue-500">{{processedResult.main.temp_min.toFixed(1)}}°C</p>
        <p class="text-sm text-red-600">{{processedResult.main.temp_max.toFixed(1)}}°C</p>
      </div>
</template>
<script setup lang="ts">
interface ProcessedResult {
  dt: any;
  icon: string;
  main: { temp_min: number,temp_max: number };
}
const props = defineProps<{
  processedResult: ProcessedResult;
}>();
</script>