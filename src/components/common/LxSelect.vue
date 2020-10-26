<template>
    <div>
        <Select v-model="selected" style="width:200px" clearable @on-change="onChange">
            <Option v-for="item in dataSource" :value="item[bindKey]" :key="item[bindKey]">{{ item[bindValue] }}</Option>
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
        bindKey: {
            type: String,
            default() {
                return "key"
            }
        },
        bindValue: {
            type: String,
            default() {
                return "value"
            }
        }
    },
    methods: {
        getKey(data) {

        },
        getValue(data) {

        },
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