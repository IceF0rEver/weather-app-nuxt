export default defineNuxtPlugin((nuxtApp) => {
  const apiKey = useRuntimeConfig().public.API_KEY
  
  const getCurrent = (latitude, longitude, lang) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`)
    return data
  }

  const getByCoord = (latitude, longitude, lang) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`)
    return data
  }

  const getByLocation = (country, lang) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=${lang}&units=metric`)
    return data
  }

  const getLocationByActualPosition = (latitude, longitude, lang) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`)
    return data
  }

  nuxtApp.provide('forecast', {
    getCurrent,
    getByCoord,
    getByLocation,
    getLocationByActualPosition,
  })
})