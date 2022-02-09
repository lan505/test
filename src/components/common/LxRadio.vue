<template>
    <div>
        <RadioGroup v-model="selected" @on-change="onChange">
            <Radio v-for="item in data" :label="item.key" :key="item.key">{{item.value}}</Radio>
        </RadioGroup>
    </div>
</template>

<script>
export default {
    methods: {
        // 重写方法
        change(data) {
            this.bindParentValue();
            this.currentValue = data.value;
            this.updateValue();
            this.$emit("input", data.value);
            this.$emit("on-change", data.value);
            this.dispatch("FormItem", "on-form-change", data.value);
        },
        // 自定义绑定父组件value方法
        bindParentValue(data) {
            this.$emit("update:value", data.value);
        }
    }
    // created() {},
    // data() {
    //     return {
    //         selected: null
    //     };
    // },
    // props: {
    //     value: null,
    //     data: {
    //         type: Array,
    //         default() {
    //             return [];
    //         }
    //     }
    // },
    // watch: {
    //     value: {
    //         immediate: true,
    //         handler() {
    //             this.selected = this.value;
    //         }
    //     }
    // },
    // methods: {
    //     onChange(data) {
    //         this.$emit("update:value", data);
    //     }
    // }
};
</script>

<style scoped>
</style>
