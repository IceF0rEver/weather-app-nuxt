<script setup>
import { LocalStorage } from "~/composables/local.js";

const { $forecast } = useNuxtApp();
const { locale } = useI18n();

const cityName = ref("");

const getCoord = async () => {
  try {
    const data = await $forecast.getByLocation(cityName.value, locale);
    const cityData = {
      latitude: data.city.coord.lat,
      longitude: data.city.coord.lon,
      city: data.city.name,
      country: data.city.country,
      current: false,
    };
    LocalStorage.addOne(cityData);
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <section class="z-10 bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 mb-4">
    <h2 class="font-bold text-xl mb-4 dark:text-gray-50">{{$t('title.addLocation')}}</h2>
    <form @submit.prevent="getCoord">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300" for="location">
          {{$t('label.addLocation')}}
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          placeholder="Paris, France"
          v-model="cityName"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
        {{$t('button.add')}}
        </button>
        <button 
          @click="LocalStorage.addCurrentToCities"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {{$t('button.addCurrentLocation')}}
        </button>
      </div>
    </form>
  </section>
</template>
