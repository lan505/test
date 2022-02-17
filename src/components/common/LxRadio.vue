<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-17 15:39:46
-->
<template>
    <div>
        <RadioGroup v-model="selected" @on-change="onChange">
            <Radio v-for="item in data" :label="item.key" :key="item.key">{{item.value}}</Radio>
        </RadioGroup>
    </div>
</template>

<script>
export default {
    name: "LxRadio",
    created() {},
    mounted() {},
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
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.selected = this.value;
            }
        }
    },
    methods: {
        onChange(data) {
			console.log(data);
            this.$emit("update:value", data);
        }
    }
};
</script>

<style scoped>
</style>
