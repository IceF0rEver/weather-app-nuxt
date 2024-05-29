<template>
  <section class="z-10 bg-white dark:bg-black dark:bg-opacity-80 rounded-lg shadow p-5">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">{{$t('title.daily')}}</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <!-- Afficher les prévisions journalières -->
        <!-- <Day
          v-for="processedResult in processedResults"
          :key="processedResult.list.dt"
          :processedResult="processedResult"
        ></Day> -->
        <div
          v-for="processedResult in processedResults"
          :key="processedResult.dt"
        >
          <p>{{ new Date(processedResult.dt * 1000).toLocaleDateString(locale, { weekday: 'short', day: 'numeric' }) }}</p>
          <p>Max: {{ processedResult.temp_max }}°C</p>
          <p>Min: {{ processedResult.temp_min }}°C</p>
          <img
            :src="`https://openweathermap.org/img/wn/${processedResult.icon}@2x.png`"
            alt="weather icon"
          />
        </div>
      </div>
        <div class="dark:bg-white max-w-3xl">
          <Chart />
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
    const test = new Date(processedResults.value[0].dt * 1000).toLocaleDateString(locale, { weekday: 'short', day: 'numeric' })
    console.log(test)
  }
});

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

  return Object.values(dailyData);
}
</script>