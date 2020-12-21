<template>
    <div class="location">
        <div class="location__wrapper">
            <header-location
                @update="saveLocation"
                :location="locationName"
                :is-disabled="!selectedCity"
            />
            <div class="location__search">
                <div class="search">
                    <input 
                        type="text"
                        v-model="searchValue"
                        @input="searchCity" 
                    />
                    <button type="button" @click="clearSearch">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                            <polygon points="512 86.78 425.22 0 256 169.22 86.78 0 0 86.78 169.22 256 0 425.22 86.78 512 256 342.78 425.22 511.99 512 425.22 342.78 256 512 86.78" fill="#5b5b5f"/>
                        </svg>
                    </button>
                    <div class="search__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
                            <path d="M503.4,438.34l-152-152.21a188.91,188.91,0,0,0,26.81-95.48C378.89,86.09,294.84.75,190.4,0S.75,83.43,0,188,83.3,377.91,187.72,378.65a187.94,187.94,0,0,0,98.83-27.34L438.44,503.39a29.63,29.63,0,0,0,41.77,0l23.2-23.21A29.7,29.7,0,0,0,503.4,438.34ZM188,335.3c-80.54-.55-145.34-66.37-144.76-147s66.3-145.53,146.84-145,145.33,66.38,144.76,147A146.07,146.07,0,0,1,188,335.3Z" fill="#EEEEEE"/>
                        </svg>
                    </div>
                </div>
            </div>
            <virtual-list class="virtual-list"
                :data-key="'id'"
                :data-sources="filteredCities"
                :data-component="itemComponent"
                :extra-props="{ search: searchValue, onItemClick: selectCity }"
            />
        </div>
    </div>
</template>

<script>
import cities from "../city.list.min.json"
import axios from "axios"
import HeaderLocation from "../components/headers/HeaderLocation"
import VirtualList from 'vue-virtual-scroll-list' 
import ListItem from "../components/list/ListItem"

export default {
    name: "SelectLocation",

    components: {
        VirtualList,
        HeaderLocation
    },

    data() {
        return {
            locationName: '',
            searchValue: '',
            selectedCity: null,
            filteredCities: [],
            itemComponent: ListItem,
        }
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            const location = JSON.parse(sessionStorage.location);
            const KEY = process.env.VUE_APP_API_KEY;
            const BASE_URL = process.env.VUE_APP_API_BASE;

            axios.get(`${BASE_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${KEY}`)
                .then(response => {
                    this.locationName = response.data.name;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        searchCity() {
            this.filteredCities = cities.filter(city => city.name.toUpperCase().includes(this.searchValue.toUpperCase()));
        },
        
        saveLocation() {
            sessionStorage.setItem('location', JSON.stringify({
              latitude: this.selectedCity.coord.lat,
              longitude: this.selectedCity.coord.lon
            }));

            this.$router.push({ name: "WeatherForecast" })
        },

        selectCity(city) {
            this.selectedCity = city;
            this.searchValue = this.selectedCity.name;
            this.filteredCities = [];
        },

        clearSearch() {
            this.searchValue = '';
            this.filteredCities = [];
        }
    }
}
</script>

<style scoped lang="scss">
    .location {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrapper {
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #3A424C;
        }

        &__search {
            width: 100%;
            padding: 6px 12px;
        }
    }

    .search {
        position: relative;
        padding: 6px 32px;
        background: #484F58;
        border: 1px solid  #90C8EA;
        border-radius: 8px;

        input {
            width: 100%;
            background: transparent;
            color: #FFF;
        }

        button {
            position: absolute;
            transform: translate(-50%, -50%);
            right: 0;
            top: 50%;
            width: 20px;
            height: 20px;
            padding: 5px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__icon {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 0;
            top: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            margin-left: 16px;
        }
    }

    .virtual-list {
        width: 100%; 
        height: 360px; 
        overflow-y: auto;
        padding-left: 12px;
        background: #484F58;
    }
</style>