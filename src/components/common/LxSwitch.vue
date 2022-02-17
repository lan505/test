<template>
    <div>
        <i-switch v-model="selected" size="large" :true-value="trueValue" :false-value="falseValue" @on-change="onChange">
            <span slot="open">{{openText}}</span>
            <span slot="close">{{closeText}}</span>
        </i-switch>
    </div>
</template>

<script>
export default {
    name: "LxSwitch",
    created() {},
    mounted() {},
    data() {
        return {
            selected: 0,
        };
    },
    props: {
        value: 0,
        openText: {
            type: String,
            default() {
                return "开启";
            },
        },
        closeText: {
            type: String,
            default() {
                return "关闭";
            },
        },
        useNumberValue: {
            type: Boolean,
            default() {
                return false;
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
            immediate: true,
            handler() {
                this.selected = this.value;
            },
        },
    },
    computed: {
        trueValue: function () {
            return this.useNumberValue ? 1 : true;
        },
        falseValue: function () {
            return this.useNumberValue ? 0 : false;
        },
    },
};
</script>

<style scoped>
</style>