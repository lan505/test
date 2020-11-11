<template>
    <div>
        <RadioGroup v-model="selected" @on-change="onChange">
            <Radio v-for="item in data" :label="item.key" :key="item.key">{{item.value}}</Radio>
        </RadioGroup>
    </div>
</template>

<script>
export default {
    created() {
        console.log("打印value：" + this.value);
        this.init();
    },
    data() {
        return {
            selected: null
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
    watch: {
        value() {
            console.log("Radio Value改变了：" + this.value);
            this.selected = this.value;
        }
    },
    methods: {
        init() {
            this.selected = this.value;
        },
        onChange(data) {
            this.$emit("update:value", data);
        },
    },
};
</script>

<style scoped>
</style>