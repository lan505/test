<template>
    <div>
        <div class="row" style="height: 32px;">
            <Form ref="formInline" inline>
                <FormItem prop="password">
                    <Input v-model="tableData.query.name" clearable>
                        <span slot="prepend">名称</span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="default" icon="md-search" @click="load">查询</Button>
                </FormItem>
                <FormItem>
                    <Button type="default" icon="md-refresh" @click="refresh">刷新</Button>
                </FormItem>
                <FormItem>
                    <Button type="default" icon="md-search" @click="reset">重置</Button>
                </FormItem>
            </Form>
        </div>
        <div class="row" style="height: 32px;">
            <Form ref="formInline" inline>
                <FormItem>
                    <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
                </FormItem>
            </Form>
        </div>
        <TablePage
            ref="tablePage"
            :data="tableData.data"
            :columns="tableData.columns"
            :total="tableData.total"
            @onPageSort="onPageSort"
            @onPageIndex="onPageIndex"
            @onPageSize="onPageSize"
        ></TablePage>
        <DictItemNew ref="newForm" @load="load"></DictItemNew>
        <DictItemEdit ref="editForm" @load="load"></DictItemEdit>
        <DictItemDetail ref="detailForm" @load="load"></DictItemDetail>
    </div>
</template>
<script>
import DictItemNew from "./DictItemNew";
import DictItemEdit from "./DictItemEdit";
import DictItemDetail from "./DictItemDetail";
export default {
    created() {
        this.load();
    },
    data() {
        return {
            searchControlData: {},
            tableData: {
                loading: true,
                remove: {
                    ids: []
                },
                query: {
                    name: null
                },
                page: {
                    current: 1,
                    size: 10,
                    orders: []
                },
                total: 0,
                data: [],
                columns: [
                    {
                        title: "字典类别",
                        key: "codeName",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "父级",
                        key: "parentValueName",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "值",
                        key: "value",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "名称",
                        key: "name",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "层级",
                        key: "level",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "子节点数",
                        key: "subNum",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "创建人员",
                        key: "creator",
                        ellipsis: "true",
                        tooltip: "true",
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 245,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            icon: "md-search"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetailForm(
                                                    params.row.dictItemId
                                                );
                                            }
                                        }
                                    },
                                    "查看"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            icon: "md-create"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.showEditForm(
                                                    params.row.dictItemId
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small",
                                            icon: "md-trash"
                                        },
                                        on: {
                                            click: () => {
                                                this.delete(
                                                    params.row.dictItemId
                                                );
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ]
            }
        };
    },
    methods: {
        load() {
            this.axios
                .post(this.globalActionUrl.dictItem.list, this.tableData.query)
                .then(res => {
                    this.tableData.total = res == null ? 0 : res.total;
                    this.tableData.data = res == null ? [] : res.records;
                    this.tableData.loading = false;
                    this.loadCompleted();
                });
        },
        reset() {
            Object.keys(this.tableData.query).forEach(
                key => (this.tableData.query[key] = null)
            );
            this.load();
        },
        refresh() {
            this.load();
        },
        delete(id) {
            this.tableData.remove.ids.push(id);
            this.$Modal.confirm({
                title: "提示框",
                content: "是否删除当前数据?",
                onOk: () => {
                    this.axios
                        .post(
                            this.globalActionUrl.dictItem.remove,
                            this.tableData.remove
                        )
                        .then(res => {
                            this.$Message.success("删除成功");
                            this.load();
                        });
                }
            });
        },
        showNewForm() {
            this.$refs.newForm.load();
        },
        showEditForm(id) {
            this.$refs.editForm.load(id);
        },
        showDetailForm(id) {
            this.$refs.detailForm.load(id);
        },
        onPageSort(param) {
            if (param.order != "normal") {
                this.tableData.page.orders.push({
                    column: param.key,
                    asc: param.order == "asc"
                });
            }
            this.load();
        },
        onPageIndex(param) {
            this.tableData.page.current = param;
            this.load();
        },
        onPageSize(param) {
            this.tableData.page.size = param;
            this.load();
        },
        loadCompleted() {
            this.tableData.page.orders = [];
        }
    },
    components: {
        DictItemNew,
        DictItemEdit,
        DictItemDetail
    }
};
</script>
<style scoped>
</style>
