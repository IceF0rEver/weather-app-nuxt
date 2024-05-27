export default defineNuxtPlugin((nuxtApp) => {
  const apiKey = useRuntimeConfig().public.API_KEY
  
  const getCurrent = async (latitude, longitude, lang) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`);
    return await response.json();
  }

  const getByCoord = async (latitude, longitude, lang) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`)
    return await response.json();
  }

  const getByLocation = async (country, lang) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=${lang}&units=metric`)
    return await response.json();
  }

  const getLocationByActualPosition = async (latitude, longitude, lang) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`)
    return await response.json();
  }

  nuxtApp.provide('forecast', {
    getCurrent,
    getByCoord,
    getByLocation,
    getLocationByActualPosition,
  })
})