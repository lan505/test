<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                    <Input v-model="tableData.query.name" clearable>
                        <span slot="prepend">字典类别名称</span>
                    </Input>
                </Col>
            </Row>
        </div>
        <div class="row">
            <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
            <Button type="primary" icon="md-refresh" @click="refresh">刷新</Button>
            <Button type="primary" icon="md-refresh" @click="reset">重置</Button>
            <Button type="primary" icon="md-queryParams" @click="load">查询</Button>
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
        <DictIndexNew ref="newForm" @load="load"></DictIndexNew>
        <DictIndexEdit ref="editForm" @load="load"></DictIndexEdit>
        <DictIndexDetail ref="detailForm" @load="load"></DictIndexDetail>
    </div>
</template>
<script>
import DictIndexNew from "./DictIndexNew";
import DictIndexEdit from "./DictIndexEdit";
import DictIndexDetail from "./DictIndexDetail";
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
                        title: "字典类别编号",
                        key: "code",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "字典类别名称",
                        key: "name",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "字典类别总数",
                        key: "subNum",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "创建人员",
                        key: "creatorCn",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 90
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
                                                    params.row.dictIndexId
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
                                                    params.row.dictIndexId
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
                                                    params.row.dictIndexId
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
                .post(this.globalActionUrl.dictIndex.list, this.tableData.query)
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
                            this.globalActionUrl.dictIndex.remove,
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
        DictIndexNew,
        DictIndexEdit,
        DictIndexDetail
    }
};
</script>
<style scoped>
</style>
