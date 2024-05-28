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
            if (this.current.length === 0) {
                this.current = [data];
            } else if(data.current != true && this.current.length <= 1) {
                this.current.push(data);
            }
            localStorage.setItem('current', JSON.stringify(this.current));
        }
    },
    removeCurrent: function() {
        if (process.client) {
            if (Array.isArray(this.current) && this.current.length === 2) {
                this.current.splice(1, 1);
            }
            localStorage.setItem('current', JSON.stringify(this.current));
        }
    },
    addCurrentToCities: function() {
        this.addOne(this.current[0]);
    },
    checkCurrent: function() {
        const isDuplicate = this.current.some(
            (city) =>
                city.current === true
        );
        if (isDuplicate) {
            return true;
        }else{
            return false;
        }
    },
    findCurrent: function() {
        return this.current[1];
    },
});

LocalStorage.initialize();