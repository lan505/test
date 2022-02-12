<template>
    <div class="table">
        <Table :row-key="rowKey" :loading="this.tableData.loading" :columns="this.columns" :data="this.tableData.data" height="550"
        :load-data="onLoadChilren"
         @on-sort-change="onPageSort" 
         @on-select="onSelect" 
         @on-select-cancel="onSelectCancel"
         @on-select-all="onSelectAll">
        </Table>
        <Page :total="this.tableData.total" show-sizer show-total prev-text="上一页" next-text="下一页" :style="{marginTop: '20px'}" @on-change="onPageIndex" @on-page-size-change="onPageSize" />
    </div>
</template>

<script>
import axios from "@/assets/js/global/globalAxios";
export default {
    created() {},
    data() {
        return {
            tableData: {
                data: [],
                loading: true,
                total: 0,
                remove: {
                    ids: []
                }
            },
            tablePage: {
                page: {
                    current: 1,
                    size: 10,
                    orders: []
                }
            }
        };
    },
    props: {
        /**
         * 数据源的主键字段名
         */
        rowKey: {
            type: String,
            default() {
                return "id";
            }
        },
        /**
         * 查询参数
         */
        queryParam: {
            type: Object,
            default() {
                return {};
            }
        },
        /**
         * 查询数据url
         */
        queryDataUrl: {
            type: String,
            default() {
                return "";
            }
        },
        /**
         * 查询子节点数据url
         */
        queryChildrenUrl: {
            type: String,
            default() {
                return "";
            }
        },
        /**
         * 删除数据url
         */
        removeDataUrl: {
            type: String,
            default() {
                return "";
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        children: {
            type: Array,
            default() {
                return [];
            }
        },
        /**
         * 渲染表格数据方法
         */
        renderTableData: {
            type: Function,
            default(data) {
                return data;
            }
        }
    },
    methods: {
        loadTableData(param) {
            axios({
                url: this.queryDataUrl,
                method: "post",
                data: { ...this.queryParam, ...this.tablePage, ...param }
            })
                .then(res => {
                    this.tableData.total = res == null ? 0 : res.total;
                    this.tableData.data = this.renderTableData(res.records);
                    this.resetPageOrder();
                    this.resetRemoveIds();
                    this.resetLoadingStatus();
                })
                .catch(error => {
                    console.error(error);
                    this.resetLoadingStatus();
                });
        },
        resetLoadingStatus() {
            this.tableData.loading = false;
        },
        resetPageOrder() {
            this.tablePage.page.orders = [];
        },
        resetRemoveIds() {
            this.tableData.remove.ids = [];
        },
        removeTableData(...id) {
            if (id != null && id.filter(Boolean).length > 0) {
                this.tableData.remove.ids.push(...id);
            }
            if (this.tableData.remove.ids.length > 0) {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否删除当前数据?",
                    onOk: () => {
                        axios({
                            url: this.removeDataUrl,
                            method: "post",
                            data: this.tableData.remove
                        }).then(res => {
                            this.tableData.remove.ids = [];
                            this.$Message.success("删除成功");
                            this.loadTableData();
                        });
                    }
                });
            } else {
                this.$Message.info("请选择要删除的数据");
            }
        },
        onSelect(param, row) {
            this.tableData.remove.ids.push(row[this.rowKey]);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    item => item === row[this.rowKey]
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i][this.rowKey]);
            }
        },
        onPageSort(param) {
            if (param.order != "normal") {
                this.tablePage.page.orders.push({
                    column: param.key,
                    asc: param.order == "asc"
                });
            }
            this.loadTableData();
        },
        onPageIndex(param) {
            this.tablePage.page.current = param;
            this.loadTableData();
        },
        onPageSize(param) {
            this.tablePage.page.size = param;
            this.loadTableData();
        },
        // 加载table的子数据
        onLoadChilren(item, callback) {
            axios({
                url: this.queryChildrenUrl,
                method: "get",
                params: { treeParentId: item[this.rowKey] }
            }).then(res => {
                this.renderTableData(res);
                console.log(res);
                callback(res);
            });
        }
    }
};
</script>

<style scoped>
.table {
    width: 100%;
}
</style>
