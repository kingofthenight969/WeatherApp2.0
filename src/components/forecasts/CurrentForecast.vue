<template>
    <section class="current">
        <div class="current__wrapper">
            <div class="current__temp">{{ temp | round }}</div>
            <div class="current__city">{{ location }}</div>
            <div class="current__weather">{{ description }}</div>
            <img :src="`http://openweathermap.org/img/w/${icon}.png`" alt="Weather icon"/>
        </div>
    </section>  
</template>

<script>
export default {
    name: "CurrentForecast",

    props: {
        temp: {
            type: Number,
            default: 0,
            required: true
        },
        location: {
            type: String,
            default: '',
            reqiured: true
        },
        description: {
            type: String,
            default: '',
            reqiured: true
        },
        icon: {
            type: String,
            default: '',
            reqiured: true
        }
    }
}
</script>

<style scoped lang="scss">
    .current {
        min-height: 400px;
        background: #697B92;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrapper {
            text-align: center;
        }

        &__temp {
            font-size: 80px;
            letter-spacing: 3px;
            margin-bottom: 20px;
        }

        &__temp:after {
            content: "\00B0";
        }

        &__city {
            font-size: 24px;
        }
    }
</style>