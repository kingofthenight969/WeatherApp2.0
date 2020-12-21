<template>
    <div class="forecast">
        <div class="forecast__wrapper"> 
            <div v-if="!isLoading" class="forecast__content">
                <header-forecast
                    :location="current.name"
                />
                <day-forecast
                    :max-temp="daily.temp.max"
                    :min-temp="daily.temp.min"
                />
                <current-forecast
                    :temp="current.main.temp"
                    :location="current.name"
                    :description="current.weather[0].main"
                    :icon="current.weather[0].icon"
                />
                <weekly-forecast
                    :weekly=" weekly"
                />
            </div>
            <div v-else>
                <app-loader/>
            </div>
        </div>
    </div>
</template>

<script>
import defaultLocation from '../defaultLocation'
import axios from "axios"
import AppLoader from "../components/loader/AppLoader"
import HeaderForecast from "../components/headers/HeaderForecast"
import DayForecast from "../components/forecasts/DayForecast"
import CurrentForecast from "../components/forecasts/CurrentForecast"
import WeeklyForecast from "../components/forecasts/WeeklyForecast"

export default {
    name: 'WeatherForecast',

    components: {
        AppLoader,
        HeaderForecast,
        DayForecast,
        CurrentForecast,
        WeeklyForecast
    },

    data() {
        return {
            isLoading: false,
            current: {
                name: '',
                main: {
                    temp: 0
                },
                weather: [
                    {
                        icon: '01d',
                        main: ''
                    }
                ]
            },
            daily: {
                temp: {
                    max: '',
                    min: ''
                }
            },
            weekly: [],
        }
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            this.isLoading = true;

            const geoLocation = sessionStorage.location ? JSON.parse(sessionStorage.location) : null;

            if (geoLocation) {
                this.getWeatherForecast(geoLocation);
            } else {
                this.getAccessGeoLocation();
            }
        },

        getAccessGeoLocation() {
            const accessGeoLocation = () => {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
            }

            accessGeoLocation()
                .then((position) => {
                    sessionStorage.setItem('location', JSON.stringify({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
                })
                .catch((err) => {
                    sessionStorage.setItem('location', JSON.stringify({
                        latitude: defaultLocation.latitude,
                        longitude: defaultLocation.longitude
                    }));
                })
                .finally(() => {
                    const geoLocation = JSON.parse(sessionStorage.location);
                    this.getWeatherForecast(geoLocation);
                });
        },

        getWeatherForecast(location) {
            const KEY = process.env.VUE_APP_API_KEY;
            const BASE_URL = process.env.VUE_APP_API_BASE;

            const getDailyWeather = axios.get(`${BASE_URL}/onecall?lat=${location.latitude}&lon=${location.longitude}&units=metric&exclude=minutely,hourly,current&appid=${KEY}`);
            const getCurrentWeather = axios.get(`${BASE_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${KEY}`);

            Promise.all([getDailyWeather, getCurrentWeather])
                .then(responses => { 
                    const [responseDaily, responseCurrent] = responses;

                    [this.daily, ...this.weekly] = responseDaily.data.daily;
                    this.current = responseCurrent.data;

                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
    }
}
</script>

<style lang="scss" scoped>
    .forecast {
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
        }

        &__content {
            width: 100%;
        }
    }
</style>