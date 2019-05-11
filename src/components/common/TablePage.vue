<template>
    <div>
        <Table :loading="loading" :columns="columns" :data="data" height="550" style="box-sizing:border-box;" @on-sort-change="sort">
        </Table>
        <Page :total="total" show-sizer show-total prev-text="上一页" next-text="下一页" :style="{marginTop: '20px'}" @on-change="pageNum" @on-page-size-change="pageSize" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: {
                ascs: [],
                descs: [],
                current: 1,
                size: 10
            }
        };
    },
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        data: {
            type: Array,
            default() {
                return {};
            }
        },
        total: {
            type: Number,
            default() {
                return 0;
            }
        },
        loading: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    methods: {
        sort(params) {
            this.clearSort();
            if (params.order == "asc") {
                this.page.ascs.push(params.key);
            }
            if (params.order == "desc") {
                this.page.descs.push(params.key);
            }
            this.load();
        },
        pageNum(params) {
            this.page.current = params;
            this.load();
        },
        pageSize(params) {
            this.page.size = params;
            this.load();
        },
        clearSort() {
            this.page.ascs = [];
            this.page.descs = [];
        },
        load() {
            this.$emit("load", this.page);
        }
    }
};
</script>

<style scoped>
</style>
