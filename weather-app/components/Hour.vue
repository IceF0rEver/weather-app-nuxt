<template>
  <div class="z-10 text-center">
    <p class="text-lg">
      <time class="text-gray-600" :datetime="processedResult.dt">
        {{ new Date(processedResult.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </time>
    </p>
    <div class="w-10 h-10 bg-blue-300 rounded-full mx-auto my-2">
      <img :src="'https://openweathermap.org/img/wn/' + processedResult.weather[0].icon + '@2x.png'">
    </div>
    <p class="text-lg">{{ processedResult.main.temp.toFixed(0) }}°C</p>
  </div>
</template>

<script setup lang="ts">
interface ProcessedResult {
  dt: any;
  weather: Array<{ icon: string }>;
  main: { temp: number };
}

const props = defineProps<{
  processedResult: ProcessedResult;
}>();
</script>
