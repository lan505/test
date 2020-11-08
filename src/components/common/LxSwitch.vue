<template>
    <div>
        <i-switch v-model="value" size="large" :true-value="trueValue" :false-value="falseValue" @on-change="onChange">
            <span slot="open">{{openText}}</span>
            <span slot="close">{{closeText}}</span>
        </i-switch>
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
    computed: {
        trueValue: function() {
            return this.useNumberValue ? 1 : true
        },
        falseValue: function() {
            return this.useNumberValue ? 0 : false
        }
    }
};
</script>

<style scoped>
</style>