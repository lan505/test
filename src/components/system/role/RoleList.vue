<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                    <Input v-model="tableData.query.name" clearable>
                        <span slot="prepend">角色名称</span>
                    </Input>
                </Col>
            </Row>
        </div>
        <div class="row">
            <Row :gutter="16">
                <Col span="2">
                    <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
                </Col>
                <Col span="2">
                    <Button type="primary" icon="md-refresh" @click="refresh">刷新</Button>
                </Col>
                <Col span="2">
                    <Button type="primary" icon="md-refresh" @click="reset">重置</Button>
                </Col>
                <Col span="2">
                    <Button type="primary" icon="md-query" @click="load">查询</Button>
                </Col>
            </Row>
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
        <RoleNew ref="newForm" @load="load"></RoleNew>
        <RoleEdit ref="editForm" @load="load"></RoleEdit>
        <RoleDetail ref="detailForm" @load="load"></RoleDetail>
    </div>
</template>
<script>
import RoleNew from "./RoleNew";
import RoleEdit from "./RoleEdit";
import RoleDetail from "./RoleDetail";
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
                        title: "角色编号",
                        key: "code",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "角色名称",
                        key: "name",
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
                        width: 225,
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
                                                    params.row.roleId
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
                                                    params.row.roleId
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
                                                this.delete(params.row.roleId);
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
                .post(this.globalActionUrl.role.list, this.tableData.query)
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
            this.$refs.tablePage.load();
        },
        refresh() {
            this.$refs.tablePage.load(this.tableData.query);
        },
        delete(id) {
            this.tableData.remove.ids.push(id);
            this.$Modal.confirm({
                title: "提示框",
                content: "是否删除当前数据?",
                onOk: () => {
                    this.axios
                        .post(
                            this.globalActionUrl.role.remove,
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
            this.$refs.newForm.load(true);
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
        RoleNew,
        RoleEdit,
        RoleDetail
    }
};
</script>