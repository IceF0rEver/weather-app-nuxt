import {Coords} from "~/composables/coord.js";

export function useforecast() {
    const apiKey = useRuntimeConfig().public.API_KEY;
  
    async function getCurrent() {
        const response = await useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Coords.latitude}&lon=${Coords.longitude}&appid=${apiKey}&lang=fr&units=metric`)
        return response.json()
    }
  
    async function getByCoord() {
        const response = await useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${Coords.latitude}&lon=${Coords.longitude}&appid=${apiKey}&lang=fr&units=metric`)
        return response.json()
    }

    async function getByLocation(country) {
        const response = await useFetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=fr&units=metric`)
        return response.json()
    }

    async function getLocationByActualPosition() {
        const response = await useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Coords.currentLatitude}&lon=${Coords.currentLongitude}&appid=${apiKey}&lang=fr&units=metric`)
        return response.json()
    }
  
    return {
        getCurrent,
        getByCoord,
        getByLocation,
        getLocationByActualPosition,
    }
  }