<template>
    <div>
        <Table :loading="loading" :columns="columns" :data="data" height="550" style="box-sizing:border-box;" @on-sort-change="sort">
        </Table>
        <Page :total="total" show-sizer show-total prev-text="上一页" next-text="下一页" :style="{marginTop: '20px'}" @on-change="pageNum" @on-page-size-change="pageSize" />
    </div>
</template>

<script>
export default {
    created() {
        this.load();
    },
    data() {
        return {
            data: [],
            total: 0,
            page: {
                ascs: [],
                descs: [],
                current: 1,
                size: 10
            },
            loading: true,
        };
    },
    props: {
        url: {
            type: String,
            default() {
                return null;
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
    },
    methods: {
        load(param) {
            this.loading = true;
            this.axios
                .get(this.url, {
                    params: {...this.page, ...param}
                })
                .then(res => {
                    this.total = res == null ? 0 : res.total;
                    this.data = res == null ? [] : res.records;
                    this.loading = false;
                });
        },
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
    }
};
</script>

<style scoped>
</style>
