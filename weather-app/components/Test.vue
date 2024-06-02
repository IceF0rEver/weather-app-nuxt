<template>
  <div class="overflow-hidden">
    <div class="map-wrap max-h-64 mb-[-35px]">
      <div class="map" ref="mapContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer } from '@maptiler/weather';
import { LocalStorage } from "~/composables/local.js";
const local = LocalStorage.findCurrent();

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
  config.apiKey = useRuntimeConfig().public.API_MAP;

  const initialState = { lng: local.longitude, lat: local.latitude, zoom: 11 };

  map.value = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  }));

  // Ajouter la couche radar météo
  const weatherLayer = new RadarLayer();
  map.value.addLayer(weatherLayer);

  // Optionnel : obtenir la valeur radar pour une coordonnée spécifique
  const radarValue = weatherLayer.pickAt(local.latitude, local.longitude);
  console.log('Radar value:', radarValue);

}),
onUnmounted(() => {
  map.value?.remove();
});
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
