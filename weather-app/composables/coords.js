import { GeoLocation } from "~/composables/geolocation.js";

export const Coords = reactive({
    latitude: null,
    longitude: null,
    currentLatitude: null,
    currentLongitude: null,
});

export const fetchCoords = async () => {
    if (Coords.latitude == null && Coords.longitude == null) {
        try {
            const newCoords = await GeoLocation.getCoords();
            Coords.latitude = newCoords.latitude;
            Coords.longitude = newCoords.longitude;
            Coords.currentLatitude = newCoords.latitude;
            Coords.currentLongitude = newCoords.longitude;
        } catch (err) {
            console.error(err.message);
        }
    }
};
