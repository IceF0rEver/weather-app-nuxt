export const LocalStorage = reactive({
    cities: [],
    current: [],
    initialize: function() {
        if (process.client) {
            this.cities = JSON.parse(localStorage.getItem("cities")) || [];
            this.current = JSON.parse(localStorage.getItem("current")) || [];
        }
    },
    findAll: function() {
        return this.cities;
    },
    addOne: function(data) {
        const isDuplicate = this.cities.some(
            (city) =>
                city.city === data.city &&
                city.country === data.country
        );

        if (!isDuplicate) {
            this.cities.push(data);
            this.save();
        }
    },
    removeOne: function(cityName, countryName) {
        const index = this.cities.findIndex((city) => city.city === cityName && city.country === countryName);
        if (index !== -1) {
            this.cities.splice(index, 1);
            this.save();
        }
    },
    save: function() {
        if (process.client) {
            localStorage.setItem('cities', JSON.stringify(this.cities));
        }
    },
    addCurrent: function(data) {
        if (process.client) {
            if (!Array.isArray(this.current)) {
                this.current = [];
            }
            this.current = [data];
            localStorage.setItem('current', JSON.stringify(this.current));
        }
    },
    addCurrentToCities: function() {
        this.addOne(this.current[0]);
    },
});

LocalStorage.initialize();