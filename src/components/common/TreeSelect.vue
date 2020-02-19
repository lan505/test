<template>
    <div>
        <Table :loading="loading" :columns="columns" :data="data" height="550" style="box-sizing:border-box;" @on-sort-change="onPageSort">
        </Table>
        <Page :total="total" show-sizer show-total prev-text="上一页" next-text="下一页" :style="{marginTop: '20px'}" @on-change="onPageIndex" @on-page-size-change="onPageSize" />
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
        loading: {
            type: Boolean,
            default() {
                return false;
            }
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        total: {
            type: Number,
            default() {
                return 0;
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        onPageSort(param) {
            console.log(param);
            this.$emit('onPageSort', param);
        },
        onPageIndex(param) {
            this.$emit('onPageIndex', param);
        },
        onPageSize(param) {
            this.$emit('onPageSize', param);
        },
        // sort(params) {
        //     this.page.orders.push({
        //         column: params.key,
        //         asc: params.order == "asc"
        //     });
        //     this.load();
        //     this.clearSort();
        // },
        // pageNum(params) {
        //     this.page.current = params;
        //     this.load();
        // },
        // pageSize(params) {
        //     this.page.size = params;
        //     this.load();
        // },
        // clearSort() {
        //     this.page.orders = [];
        // }
    }
};
</script>

<style scoped>
</style>
