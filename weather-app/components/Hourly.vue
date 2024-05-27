<script setup>
import { GeoLocation } from "~/composables/geolocation.js";

const { $forecast } = useNuxtApp();

const coords = await GeoLocation.getCoords();
const results = await $forecast.getByCoord(coords.latitude, coords.longitude);

const processedResults = ref([]);

if (results.value) {
  for (let i = 0; i < results.value.list.length; i++) {
  const currentData = results.value.list[i];
  const nextData = results.value.list[i + 1];
  processedResults.value.push(currentData);
  if (nextData) {
    const numberOfIntervals = 3;

    for (let j = 1; j < numberOfIntervals; j++) {
      const interpolatedData = {
        dt:
          currentData.dt +
          (j * (nextData.dt - currentData.dt)) / numberOfIntervals,
        main: {
          temp: parseFloat(
            (
              currentData.main.temp +
              (j * (nextData.main.temp - currentData.main.temp)) /
                numberOfIntervals
            ).toFixed(2)
          ),
        },
        weather: [...currentData.weather],
      };
      processedResults.value.push(interpolatedData);
      if (processedResults.value.length >= 12) {
        break;
      }
    }
  }
  if (processedResults.value.length >= 12) {
    break;
  }
}  
console.log(processedResults);
}
</script>

<template>
  <section class="bg-white dark:bg-black dark:bg-opacity-80 rounded-lg shadow p-5 mb-6">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">Prochaines Heures</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <Hour
          v-for="processedResult in processedResults"
          :key="processedResult.dt"
          :processedResult="processedResult"
        ></Hour>
      </div>
    </div>
  </section>
</template>
