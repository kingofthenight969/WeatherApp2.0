<template>
    <header class="header-location">
        <button type="button"  :disabled="isDisabled" @click="$emit('update')">Done</button>
        <div class="header-location__title">
            <h2>Weather forecast</h2>
            <p>{{ location }}</p>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderLocation",

    props: {
        location: {
            type: String,
            default: '',
            required: true
        },
        isDisabled: {
            type: Boolean,
            default: false,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .header-location {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 12px;
        background: #3A424C;
        position: relative;

        button {
            position: absolute;
            padding: 12px;
            height: 100%;
            left: 0;
            bottom: 0;
            background: transparent;
            color:  #90C8EA;
            font-size: 20px;
        }

        &__title {
            text-align: center;

            p {
                min-height: 18px;
            }
        }
    }
</style>