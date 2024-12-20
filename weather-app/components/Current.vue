<template>
  <section
    v-if="data"
    class="z-10 bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 mb-6 grow flex flex-col"
    style="flex-grow: 1"
  >
    <header class="mb-4">
      <h2 class="font-bold text-xl dark:text-gray-50"> {{$t('title.current')}}</h2>
    </header>
    <article
      class="flex items-center justify-between grow"
      style="flex-grow: 1"
    >
      <div>
        <h3 class="text-lg font-semibold dark:text-gray-50">{{ data.name }}</h3>
        <time class="text-sm text-gray-600 dark:text-gray-300" :datetime="data.dt">
          {{
            new Date(data.dt * 1000).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}<br />
          {{
            new Date(data.dt * 1000).toLocaleDateString(locale, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          }}
        </time>
      </div>
      <div class="flex">
        <div class="text-right">
          <p class="text-5xl dark:text-gray-50">{{ data.main.temp.toFixed(0) }}°C</p>
          <p class="text-lg text-gray-600 dark:text-gray-300">{{ data.weather[0].description }}</p>
        </div>
        <div class="ml-2 w-20 h-20 bg-blue-300 rounded-full">
          <img
            :src="
              'https://openweathermap.org/img/wn/' +
              data.weather[0].icon +
              '@2x.png'
            "
          />
        </div>
      </div>
    </article>
    <article class="pt-4">
      <Map></Map>
    </article>
  </section>
</template>

<script setup lang="ts">
import { GeoLocation } from "~/composables/geolocation.js";
import { LocalStorage } from "~/composables/local.js";

const { locale } = useI18n();
const { $forecast } = useNuxtApp();

const data = ref(null);

const fetchData = async () => {
  if (!LocalStorage.checkCurrent()) {
    const coords = await GeoLocation.getCoords();
    const weatherData = await $forecast.getCurrent(coords.latitude, coords.longitude, locale);
    coords['city'] = weatherData.name;
    coords['country'] = weatherData.sys.country;
    LocalStorage.addCurrent(coords);
    const cityData = {
      latitude: coords['latitude'],
      longitude: coords['longitude'],
      city: weatherData.name,
      country: weatherData.sys.country,
      current: false
    };
    LocalStorage.addCurrent(cityData);
    data.value = weatherData;
  } else {
    const local = LocalStorage.findCurrent();
    data.value = await $forecast.getCurrent(local.latitude, local.longitude, locale);
  }
};
onMounted(fetchData);

watch(locale, () => {
  fetchData();
});

</script>