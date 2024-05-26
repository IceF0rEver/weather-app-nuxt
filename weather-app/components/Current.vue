<template>
  <!-- Météo instantanée -->
  <section
    v-if="data"
    class="bg-white bg-opacity-75 rounded-lg shadow p-5 mb-6 grow flex flex-col"
    style="flex-grow: 1"
  >
    <header class="mb-4">
      <h2 class="font-bold text-xl">Météo Instantanée</h2>
    </header>
    <article
      class="flex items-center justify-between grow"
      style="flex-grow: 1"
    >
      <div>
        <h3 class="text-lg font-semibold">{{ data.name }}</h3>
        <time class="text-sm text-gray-600" :datetime="data.dt">
          {{
            new Date(data.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}<br />
          {{
            new Date(data.dt * 1000).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          }}
        </time>
      </div>
      <div class="flex">
        <div class="text-right">
          <p class="text-5xl">{{ data.main.temp.toFixed(0) }}°C</p>
          <p class="text-lg text-gray-600">{{ data.weather[0].description }}</p>
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
  </section>
</template>

<script setup>
import { GeoLocation } from "~/composables/geolocation.js";

// const apiKey = "a1141dd0573960bfdabff538fc1dc90c";
const apiKey = useRuntimeConfig().public.API_KEY;
console.log(apiKey)


const coords = await GeoLocation.getCoords();
// const { data } = useFetch(
//   `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&lang=fr&units=metric`
// );

// const currentPosition = await useAsyncData("response", ()=> $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.latitude}&appid=${apiKey}&lang=fr&units=metric`));
</script>
