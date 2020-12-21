<template>
    <div class="item" @click="onItemClick(source)">
        <span>{{ start }}</span>
        <span class="item__search">{{ searchValue }}</span>
        <span>{{ end }}</span>
    </div>
</template>

<script>
export default {
    name: 'ListItem',

    props: {
        source: { 
            type: Object,
            default() {
                return {}
            }
        },
        onItemClick: {
            type: Function
        },
        search: {
            type: String,
            default: '',
        }
    },

    data() {
        return {
            searchValue: '',
            start: '',
            end: ''
        }
    },

    created() {
        this.formatValue(this.source.name, this.search);
    },

    watch: {
        search: function (val) {
            this.formatValue(this.source.name, val);
        },
    },

    methods: {
        formatValue(name, search) {
            const index = name.toUpperCase().indexOf(search.toUpperCase());
            this.start = name.slice(0, index);
            this.searchValue = name.slice(index, index + search.length);
            this.end = name.slice(index + search.length, name.length);
        }
    }
}
</script>

<style scoped lang="scss">
    .item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #4c535c;

        &__search {
            color: #90C8EA;
        }
    }

    .item:hover {
        cursor: pointer;
    }
</style>