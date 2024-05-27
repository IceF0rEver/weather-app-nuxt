export default defineNuxtPlugin((nuxtApp) => {
  const apiKey = useRuntimeConfig().public.API_KEY
  
  const getCurrent = (latitude, longitude) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`)
    return data
  }

  const getByCoord = (latitude, longitude) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`)
    return data
  }

  const getByLocation = (country) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=fr&units=metric`)
    return data
  }

  const getLocationByActualPosition = (latitude, longitude) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`)
    return data
  }

  nuxtApp.provide('forecast', {
    getCurrent,
    getByCoord,
    getByLocation,
    getLocationByActualPosition,
  })
})