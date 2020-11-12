<template>
    <div>
        <CheckboxGroup v-model="selected" @on-change="onChange">
            <Checkbox v-for="item in dataSource" :label="item.key" :key="item.key">{{ item.value }}</Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            selected: [],
            dataSource: [],
        };
    },
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },
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
        value: {
            immediate:true,
            handler() {
                this.selected = this.value;
            }
        }
    },
};
</script>

<style scoped>
</style>