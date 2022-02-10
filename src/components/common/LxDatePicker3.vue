<template>
    <div>
        <DatePicker type="date" format="yyyy-MM-dd" v-model="selected" :confirm="true" @on-change="onChange"></DatePicker>
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
        value2: null,
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
            // validator(value) {
            //     if (type === "date" || type === "daterange") {
            //         return value === "yyyy-MM-dd";
            //     } else if (type === "datetime" || type === "datetimerange") {
            //         return value === "yyyy-MM-dd HH:mm:ss";
            //     } else if (type === "year") {
            //         return value === "yyyy";
            //     } else if (type === "month") {
            //         return value === "yyyy-MM";
            //     } else {
            //         return false;
            //     }
            // }
        }
    },
    methods: {
        onChange(data, type) {
            this.$emit("update:value2", data);
        }
    },
    watch: {
        value2: {
            immediate: true,
            handler() {
                this.selected = this.value2;
            }
        }
    }
};
</script>

<style scoped>
</style>
