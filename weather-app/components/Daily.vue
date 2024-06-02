<template>
  <section class="z-10 bg-white dark:bg-black dark:bg-opacity-80 rounded-lg shadow p-5">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">{{$t('title.daily')}}</h2>
    <div class="overflow-x-auto">
      <div class="flex flex-col space-x-8">
        <div class="dark:bg-white rounded-lg p-1">
          <ChartDay :labels="labelArray" :minData="minArray" :maxData="maxArray" class="sm:px-10 md:px-16 lg:px-20 pb-2"/>
          <div class="flex justify-between bg-blue-300 rounded-lg">
            <div
            v-for="processedResult in processedResults"
            :key="processedResult.dt"
            >
              <img
              :src="`https://openweathermap.org/img/wn/${processedResult.icon}@4x.png`"
              alt="weather icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { GeoLocation } from "~/composables/geolocation.js";

const { locale } = useI18n();
const { $forecast } = useNuxtApp();

const results = ref(null);
const processedResults = ref([]);

onMounted(async () => {
  if (!LocalStorage.checkCurrent()) {
    const coords = await GeoLocation.getCoords();
    results.value = await $forecast.getByCoord(coords.latitude, coords.longitude, locale);
  } else {
    const local = LocalStorage.findCurrent();
    results.value = await $forecast.getByCoord(local.latitude, local.longitude, locale);
  }
  if (results.value) {
    processedResults.value = processWeatherData(results.value.list);
  }
});

const minArray = ref([]);
const maxArray = ref([]);
const labelArray = ref([]);

function processWeatherData(data) {
  const dailyData = {};

  data.forEach(entry => {
    const date = new Date(entry.dt * 1000).setHours(0, 0, 0, 0);
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: entry.dt,
        temp_min: entry.main.temp_min.toFixed(0),
        temp_max: entry.main.temp_max.toFixed(0),
        icon: entry.weather[0].icon,
      };
    } else {
      dailyData[date].temp_min = Math.min(dailyData[date].temp_min, entry.main.temp_min).toFixed(0);
      dailyData[date].temp_max = Math.max(dailyData[date].temp_max, entry.main.temp_max).toFixed(0);
    }
  });

  const processedData = Object.values(dailyData);

  processedData.forEach(day => {
    minArray.value.push(day.temp_min);
    maxArray.value.push(day.temp_max);
    labelArray.value.push(day.dt);
  });

  return processedData;
}
</script>