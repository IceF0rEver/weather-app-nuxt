<template>
  <section class="z-10 bg-white dark:bg-black dark:bg-opacity-80 rounded-lg shadow p-5 mb-6">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">{{$t('title.daily')}}</h2>
    <div class="overflow-x-auto">
      <div class="flex flex-col space-x-8">
        <div class="dark:bg-white rounded-lg p-1">
          <ChartHour :labels="labelArray" :maxData="maxArray" class="sm:px-10 md:px-16 lg:px-20 pb-2"/>
          <div class="flex justify-between bg-blue-300 rounded-lg">
            <div
            v-for="processedResult in processedResults"
            :key="processedResult.dt"
            >
              <NuxtImg 
              :src="`https://openweathermap.org/img/wn/${processedResult.icon}@4x.png`"
              alt="weather icon"
              />
              <div class="flex content-center justify-center">
                <Icon name="ic:twotone-water-drop" class="text-black" size="15" />
                <p class="text-xs pb-2 text-black">{{ processedResult.humidity }}%</p>
              </div>
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
    const test = new Date(processedResults.value[0].dt * 1000).toLocaleDateString(locale, { weekday: 'short', day: 'numeric' })
  }
});

const minArray = ref([]);
const maxArray = ref([]);
const labelArray = ref([]);

function processWeatherData(data) {
  const dailyData = [];
  let count = 0;

  data.forEach(entry => {
    if (count < 6) {
      dailyData.push({
        dt: entry.dt,
        temp_max: entry.main.temp_max.toFixed(0),
        icon: entry.weather[0].icon,
        humidity: entry.main.humidity.toFixed(0),
      });
      count++;
    }
  });

  const processedData = dailyData.slice(0, 6);

  processedData.forEach(day => {
    maxArray.value.push(day.temp_max);
    labelArray.value.push(day.dt);
  });

  return processedData;
}
</script>