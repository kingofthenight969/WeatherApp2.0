<template>
    <div class="daily">
        <div class="daily__info">
            <div>
                {{ dayOfWeek }}
            </div>
            <div class="daily__icon">
                <img :src="`http://openweathermap.org/img/w/${icon}.png`" alt="Weather icon"/>
            </div>
            <div class="daily__temp">
                <div class="daily__max-temp">
                    {{ maxTemp | round }}
                </div>
                <div class="daily__min-temp">
                    {{ minTemp | round }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DailyForecast",
    
    props: {
        date: {
            type: Number,
            default: 0,
            required: true
        },
        maxTemp: {
            type: Number,
            default: 0,
            required: true
        },
        minTemp: {
            type: Number,
            default: 0,
            required: true
        },
        icon: {
            type: String,
            default: '01d',
            required: true
        }
    },

    computed: {
        dayOfWeek() {
            const dayNumber = new Date(this.date * 1000).getUTCDay();
            let dayString = '';

            switch (dayNumber) {
                case 0:
                    dayString = 'SUN';
                    break;
                case 1:
                    dayString = 'MON';
                    break;
                case 2:
                    dayString = 'TUE';
                    break;
                case 3:
                    dayString = 'WED';
                    break;
                case 4:
                    dayString = 'THU';
                    break;
                case 5:
                    dayString = 'FRI';
                    break;
                case 6:
                    dayString = 'SAT';
                    break;                
            }

            return dayString;
        }
    }
}
</script>

<style lang="scss" scoped>
    .daily {
        width: 100%;
    
        &__info {
            padding: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__temp {
            display: flex;
            width: 100%;

            div:first-child {
                margin-right: 4px;
            }
        }

        &__min-temp, &__max-temp {
            width: 50%;
            text-align: center;
        }

        &__icon {
            width: 35px;
            height: 35px;

            img {
                max-width: 100%;
                object-fit: cover;
            }
        }
    }
</style>