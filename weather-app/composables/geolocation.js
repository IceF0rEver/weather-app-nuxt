function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("Geolocation is not supported by this browser."));
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }
    });
}

export const GeoLocation = reactive({
    getCoords: async function() {
        try {
            const position = await getCurrentPosition();
            return { 
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude,
                city:'',
                country:'',
                current: true,
            };
        } catch (err) {
            return {
                latitude: 50.8504, 
                longitude: 4.3488,
                city:'',
                country:'',
                current: true,
            };
        }
    }
});