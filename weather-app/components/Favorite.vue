<template>
  <div v-if="data" class="bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg p-4 flex justify-between items-center">
    <NuxtLink to="/" @click="handleClick(city.latitude, city.longitude, city.city, city.country)">
      <div>
        {{ city.city }}, {{ city.country }} - {{ data.main.temp.toFixed(0) }}°C
      </div>
    </NuxtLink>
    <div>
      <button
        @click="LocalStorage.removeOne(city.city, city.country)"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        <Icon name="akar-icons:cross" class="text-black dark:text-white" size="25" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LocalStorage } from "~/composables/local.js";

const data = ref(null);

const { locale } = useI18n();
const { $forecast } = useNuxtApp();

const props = defineProps<Props>()
interface Props {
  city: Object;
}

const handleClick = (latitude: null, longitude: null, city: null, country: null) => {
  const cityData = {
      latitude: latitude,
      longitude: longitude,
      city: city,
      country: country,
      current: false
    };
  LocalStorage.removeCurrent();
  LocalStorage.addCurrent(cityData);

};

onMounted(async () => {
  const weatherData = await $forecast.getCurrent(props.city.latitude, props.city.longitude, locale);
  data.value = weatherData;
});
</script>
