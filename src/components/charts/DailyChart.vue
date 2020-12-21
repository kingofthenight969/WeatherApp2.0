<template>
    <div class="chart">
        <div class="chart__max">
            <div :style="{ height: `${Math.abs(Math.round(maxTemp) * 5)}px` }"></div>
        </div>
        <div class="chart__min">
            <div :style="{ height: `${Math.abs(Math.round(minTemp) * 5)}px` }"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DailyChart",

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
        },
    },
}
</script>

<style lang="scss" scoped>
    .chart {
        width: 100%;
        display: flex;

        &__max {
            width: 50%;
            align-self: flex-end;

            div {
                width: 100%;
                background: #AB8149;
            }
        }

        &__min {
            width: 50%;
            align-self: flex-end;

            div {
                width: 100%;
                background:#697B92;
            }
        }
    }
</style>