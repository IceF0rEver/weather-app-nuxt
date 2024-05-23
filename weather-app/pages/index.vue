<template>
  <div
    :style="{ background: 'url(/images/' + img + ')' }"
    class="mx-auto p-4 min-h-screen flex flex-col pb-16"
    style="background-size: cover"
  >
    <!-- Météo instantanée -->
    <Current @bgWeather="bgWeather"></Current>

    <!-- Prévisions par tranches de 2 heures -->
    <Hourly></Hourly>

    <!-- Prévisions pour les jours suivants -->
    <Daily></Daily>

    <div class="fixed inset-x-0 bottom-0 pb-4 flex justify-center">
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

// a utiliser pour passer de favoris à index
// import { useGeolocation } from "@vueuse/core";
// const { coords, isSupported } = useGeolocation();
// const test = useState("location", () => [
//   coords.value.latitude,
//   coords.value.longitude,
// ]);

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
</script>

<style lang="scss" scoped></style>
