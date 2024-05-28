<template>
  <div class="bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg p-4 flex justify-between items-center">
    <div>
      <NuxtLink :to="localePath({ name: 'index' })" @click="handleClick(city.latitude, city.logitude)">
        {{ city.city }}, {{ city.country }}
      </NuxtLink>
    </div>
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
import { Coords } from "~/composables/coords.js";
const localePath = useLocalePath();

const props = defineProps<Props>()
interface Props {
  city: Array<string>;
}

const handleClick = (latitude: null, longitude: null) => {
  Coords.latitude = latitude;
  Coords.longitude = longitude;
};

// a utiliser pour passer de favoris à index

// const test = useState("location", () => [
//   latitude = city.latitude,
//   longitude = city.longitude,
// ]);

</script>
