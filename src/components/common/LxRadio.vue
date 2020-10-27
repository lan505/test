<template>
    <div>
        <RadioGroup v-model="value" @on-change="onChange">
            <Radio v-for="item in data" :label="item.key" :key="item.key">{{item.value}}</Radio>
        </RadioGroup>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            
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
};
</script>

<style scoped>
</style>