<template>
    <div>
        <DatePicker :type="type" :format="format" v-model="selected" :confirm="true" @on-change="onChange"></DatePicker>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            selected: null
        };
    },
    props: {
        value: null,
        type: {
            type: String,
            default() {
                return "date";
            },
            validator(value) {
                return (
                    [
                        "date",
                        "daterange",
                        "datetime",
                        "datetimerange",
                        "year",
                        "month"
                    ].indexOf(value) !== -1
                );
            }
        },
        format: {
            type: String,
            default() {
                return "yyyy-MM-dd";
            },
            validator(value) {
                if (this.type === "date" || this.type === "daterange") {
                    return value === "yyyy-MM-dd";
                } else if (
                    this.type === "datetime" ||
                    this.type === "datetimerange"
                ) {
                    return value === "yyyy-MM-dd HH:mm:ss";
                } else if (this.type === "year") {
                    return value === "yyyy";
                } else if (this.type === "month") {
                    return value === "yyyy-MM";
                } else {
                    return false;
                }
            }
        }
    },
    methods: {
        onChange(data, type) {
            this.$emit("update:value", data);
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.selected = this.value;
            }
        }
    }
};
</script>

<style scoped>
</style>
