<template>
  <!-- Météo instantanée -->
  <section  v-if="pending">
    <div>Loading...</div>
  </section>
  <section v-else-if="error">
    <div>Error: {{ error.message }}</div>
  </section>
  <section
    v-else
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
        <!-- <h3 class="text-lg font-semibold">{{ weatherData.name }}</h3>
        <time class="text-sm text-gray-600" :datetime="weatherData.dt">
          {{ new Date(weatherData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}<br />
          {{ new Date(weatherData.dt * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }}
        </time> -->
      </div>
      <div class="flex">
        <!-- <div class="text-right">
          <p class="text-5xl">{{ weatherData.main.temp.toFixed(1) }}°C</p>
          <p class="text-lg text-gray-600">{{ weatherData.weather[0].description }}</p>
        </div>
        <div class="ml-2 w-20 h-20 bg-blue-300 rounded-full">
          <img :src="'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'">
        </div> -->
      </div>
    </article>
  </section>
</template>

<script setup>
import { useGeolocation } from '@vueuse/core'

const { coords } = useGeolocation()
const apiKey = 'a1141dd0573960bfdabff538fc1dc90c';

const lat = 50.6724352;
const lon = 5.5246848;

const weatherData = ref(null)
const pending = ref(true)
const error = ref(null)

watchEffect(async () => {
  if (coords.value.latitude && coords.value.longitude) {
    try {
      const { data } = await useFetch('weatherCurrentPosition', () =>
        $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.value.latitude}&lon=${coords.value.longitude}&appid=${apiKey}&lang=fr&units=metric`)
      )
      weatherData.value = data.value
    } catch (err) {
      error.value = err
    } finally {
      pending.value = false
    }
  }
})

// const currentPosition = await useAsyncData("response", ()=> $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.latitude}&appid=${apiKey}&lang=fr&units=metric`));

</script>
