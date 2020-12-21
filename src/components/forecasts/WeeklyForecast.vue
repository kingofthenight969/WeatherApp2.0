<template>
    <section class="weekly">
        <div class="weekly__title">
            <h3>Week Forecast</h3>
        </div>
        <div class="weekly__info">
            <daily-forecast v-for="daily in weekly" :key="daily.dt"
                :date="daily.dt"
                :max-temp="daily.temp.max"
                :min-temp="daily.temp.min"
                :icon="daily.weather[0].icon"
            />
        </div>
        <div class="weekly__chart">
            <daily-chart v-for="daily in weekly" :key="daily.dt"
                :max-temp="daily.temp.max"
                :min-temp="daily.temp.min"
            />
        </div>
    </section>
</template>

<script>
import DailyForecast from "./DailyForecast"
import DailyChart from "../charts/DailyChart"

export default {
    name: "WeeklyForecast",

    components: {
        DailyForecast,
        DailyChart
    },

    props: {
        weekly: {
            type: Array,
            default() {
                return []
            },
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .weekly {
        display: flex;
        flex-direction: column;
        background: #636969;

        &__title {
            background: #3A424C;
            padding: 12px;
            display: flex;
            align-items: center;
            min-height: 50px;
        }
        
        &__info {
            display: flex;
        }

        &__chart {
            display: flex;
        }
    }
</style>