<template>
    <div>
        <Select v-model="selected" style="width:200px" clearable @on-change="onChange">
            <Option v-for="item in dataSource" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
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