<template>
    <section class="day">
        <h3>Day Forecast</h3>
        <div class="day__temp">
            <div>{{ maxTemp | round }}</div>
            <div>{{ minTemp | round }}</div>
        </div>
    </section>
</template>

<script>
export default {
    name: "DayForecast",

    props: {
        maxTemp: {
            type: Number,
            default: 0,
            required: true
        },
        minTemp: {
            type: Number,
            default: 0,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .day {  
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: #3A424C;
        min-height: 50px;

        &__temp {
            display: flex;

            div {
                margin-left: 10px;
            }
        }
    }
</style>
