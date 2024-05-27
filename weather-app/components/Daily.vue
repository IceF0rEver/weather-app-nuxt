<script setup>
import { GeoLocation } from "~/composables/geolocation.js";

const { $forecast } = useNuxtApp();

const coords = await GeoLocation.getCoords();
const results = await $forecast.getByCoord(coords.latitude, coords.longitude);
console.log(results);
const processedResults = ref([]);

if (results.value) {
  let min = 100.0;
  let max = 0.0;
  let weatherIcons = "";
  for (let i = 0; i < results.value.list.length; i++) {
    const currentData = results.value.list[i];

    if (currentData.main.temp_max > max) {
      max = currentData.main.temp_max;
    }
    if (currentData.main.temp_min < min) {
      min = currentData.main.temp_min;
    }

    if (new Date(currentData.dt * 1000).getHours() === 13) {
      weatherIcons = currentData.weather[0].icon;
    }
    if (new Date(currentData.dt * 1000).getHours() === 22) {
      const interpolatedData = {
        dt: currentData.dt,
        main: {
          temp_min: parseFloat(min.toFixed(1)),
          temp_max: parseFloat(max.toFixed(1)),
        },
        icon: weatherIcons,
      };
      processedResults.value.push(interpolatedData);
      min = 100.0;
      max = 0.0;
      weatherIcons = [];
    }
  }
  processedResults.value.splice(0, 1);
}
console.log(processedResults);
</script>

<template>
  <section class="z-10 bg-white dark:bg-black dark:bg-opacity-80 rounded-lg shadow p-5">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">Prochains Jours</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <!-- Afficher les prévisions journalières -->
        <Day
          v-for="processedResult in processedResults"
          :key="processedResult.dt"
          :processedResult="processedResult"
        ></Day>
      </div>
    </div>
  </section>
</template>
