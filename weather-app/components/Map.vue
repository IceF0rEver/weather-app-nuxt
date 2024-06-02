<template>
  <div class="overflow-hidden">
    <iframe class="mt-[-80px] mb-[-117px] ml-[-45px]" :src="'https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=' + local.latitude + '&lon=' + local.longitude + '&zoom=10'" width="600" height="400"></iframe>
  </div>
</template>

<script setup>
import { LocalStorage } from "~/composables/local.js";
const local = LocalStorage.findCurrent();
</script>
