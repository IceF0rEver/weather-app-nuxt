import { useGeolocation } from '@vueuse/core'
const { coords } = useGeolocation()

export const CoordsStore = reactive({
    latitude: coords.value.latitude,
    longitude: coords.value.longitude,
    currentLatitude: coords.value.latitude,
    currentLongitude: coords.value.longitude,
});