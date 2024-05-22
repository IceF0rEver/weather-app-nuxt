const apiKey = 'a1141dd0573960bfdabff538fc1dc90c';

import {CoordsStore} from "./store/coords.js";

export const weatherCurrentPosition = useAsyncData('weatherCurrentPosition', async () => {
  await fetchCoords();
  if (!CoordsStore.latitude || !CoordsStore.longitude) {
    throw new Error("Les coordonnées ne sont pas disponibles.");
  }

  try {
    const response = await $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.latitude}&lon=${CoordsStore.longitude}&appid=${apiKey}&lang=fr&units=metric`);
    return response.json();
  } catch (err) {
    throw err;
  }
});

export const weatherForecast = useAsyncData('weatherForecast', async () => {
  await fetchCoords();
  if (!CoordsStore.latitude || !CoordsStore.longitude) {
    throw new Error("Les coordonnées ne sont pas disponibles.");
  }

  try {
    const response = await $fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${CoordsStore.latitude}&lon=${CoordsStore.longitude}&appid=${apiKey}&lang=fr&units=metric`);
    return response.json();
  } catch (err) {
    throw err;
  }
});

export const weatherByLocation = useAsyncData('weatherByLocation', async (country) => {
  try {
    const response = await $fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=fr&units=metric`);
    return response.json();
  } catch (err) {
    throw err;
  }
});

export const weatherCurrentLocation = useAsyncData('weatherCurrentLocation', async () => {
  await fetchCoords();
  if (!CoordsStore.currentLatitude || !CoordsStore.currentLongitude) {
    throw new Error("Les coordonnées ne sont pas disponibles.");
  }

  try {
    const response = await $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.currentLatitude}&lon=${CoordsStore.currentLongitude}&appid=${apiKey}&lang=fr&units=metric`);
    return response.json();
  } catch (err) {
    throw err;
  }
});
