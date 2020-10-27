<template>
    <div>
        <Select v-model="value" style="width:100%" clearable @on-change="onChange">
            <Option v-for="item in data" :value="getKey(item)" :key="getKey(item)">{{ getValue(item) }}</Option>
            <!-- <Option v-for="item in data" :value="item.type" :key="item.type">{{ item.title }}</Option> -->
        </Select>
    </div>
</template>

<script>
export default {
    created() {
        
    },
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
            return data[this.bindKey];
        },
        getValue(data) {
            return data[this.bindValue];
        },
        onChange(data) {
            this.$emit("update:value", data);
        },
    },
};
</script>

<style scoped>
</style>