<template>
    <div>
        <RadioGroup v-model="selected" @on-change="onChange">
            <Radio v-for="item in dataSource" :label="item.key" :key="item.key">{{item.value}}</Radio>
        </RadioGroup>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            selected: null,
            dataSource: [],
        };
    },
    props: {
        value: null,
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {
        onChange(data) {
            this.$emit("update:value", data);
        },
    },
    watch: {
        value(val) {
            this.selected = val;
        },
        data(val) {
            this.dataSource = val;
        },
    },
};
</script>

<style scoped>
</style>