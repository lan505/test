<template>
    <div>
        <Table :row-key="rowKey" :loading="loading" :columns="columns" :data="data" height="550"
        :load-data="onLoadChilren"
         @on-sort-change="onPageSort" 
         @on-select="onSelect" 
         @on-select-cancel="onSelectCancel"
         @on-select-all="onSelectAll">
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
        },
        rowKey: {
            type: String,
            default() {
                return "idaa";
            }
        },
        children: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        onSelect(param, row) {
            this.$emit('onSelect', param, row);
        },
        onSelectCancel(param, row) {
            this.$emit('onSelectCancel', param, row);
        },
        onSelectAll(param) {
            this.$emit('onSelectAll', param);
        },
        onPageSort(param) {
            this.$emit('onPageSort', param);
        },
        onPageIndex(param) {
            this.$emit('onPageIndex', param);
        },
        onPageSize(param) {
            this.$emit('onPageSize', param);
        },
        // 加载table的子数据
        onLoadChilren(item, callback) {
            // this.$emit('onLoadChilren', item, callback);
            
                var a = JSON.parse('[{"dictItemId":54,"treeParentId":"2","dictItemKey":"23","dictItemValue":"女人-1","treeLevel":2,"treeSubNum":2}]');
                a[0].dictItemId = item.dictItemId + 100;
                this.$set(a[0], '_loading', false);
                this.$set(a[0], 'children', []);
                console.log(a);
                callback(a);
        },
    }
};
</script>

<style scoped>
</style>