<template>
    <div>
        <Select v-model="selected" style="width:100%" :clearable="clearable" :width="width" @on-change="onChange">
            <Option v-for="item in data" :value="getKey(item)" :key="getKey(item)">{{ getValue(item) }}</Option>
        </Select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: null,
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
        clearable: {
            type: Boolean,
            default() {
                return true
            }
        },
        width: {
            default() {
                return null;
            }
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
    watch: {
        value: {
            immediate:true,
            handler() {
                this.selected = this.value;
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