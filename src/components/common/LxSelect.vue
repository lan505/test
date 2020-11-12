<template>
    <div>
        <Select v-model="this.selected" style="width:100%" :clearable="clearable" :width="width" @on-change="onChange">
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
            selected: 123123123,
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