<template>
<div
  :style="{ background: 'url(/images/' + img + ')'}"
  class="mx-auto min-h-screen flex flex-col pb-24"
  style="background-size: cover"
>
    <div class="absolute w-full h-full dark:bg-black dark:opacity-50"></div>
    <div class="flex flex-row px-4 pt-4">
      <ChangeLang/>
      <DarkMode/>
    </div>
    <div class="flex flex-col p-4">
      <!-- Météo instantanée -->
      <Current @bgWeather="bgWeather"></Current>
      
      <!-- Prévisions par tranches de 1 heures -->
      <Hourly></Hourly>
      
      <!-- Prévisions pour les jours suivants -->
      <Daily></Daily>
    </div>

    <div class=" inset-x-0 bottom-0 pb-4 flex justify-center">
      <NuxtLink :to="localePath({ name: 'favorites' })">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-8 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
        >
          +
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

const img = useState<string>("image", () => "sunny_day.jpg");


const bgWeather = (main: any) => {
  switch (main) {
    case "Clouds":
      img.value = "cloudy_day.jpg";
      break;
    case "Thunderstorm":
      img.value = "cloudy_day.jpg";
      break;
    case "Rain":
      img.value = "rain.jpg";
      break;
    case "Drizzle":
      img.value = "rain.jpg";
      break;
    default:
      img.value = "sunny_day.jpg";
  }
};
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('current');
});
window.addEventListener('unload', function () {
    localStorage.removeItem('current');
});
</script>

<style lang="scss" scoped></style>
