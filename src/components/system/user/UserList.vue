<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                <Input v-model="tableData.query.account" clearable>
                <span slot="prepend">账号</span>
                </Input>
                </Col>
                <Col span="6">
                <Input v-model="tableData.query.name" clearable>
                <span slot="prepend">名称</span>
                </Input>
                </Col>
                <Col span="6">
                <Input v-model="tableData.query.mobile" clearable>
                <span slot="prepend">手机</span>
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
                <Button type="primary" icon="md-search" @click="reset">重置</Button>
                </Col>
                <Col span="2">
                <Button type="primary" icon="md-search" @click="load">查询</Button>
                </Col>
            </Row>
        </div>
        <TablePage ref="tablePage" :data="tableData.data" :columns="tableData.columns" @onPageSort="onPageSort" @onPageIndex="onPageIndex" @onPageSize="onPageSize"></TablePage>
        <UserNew ref="newForm" @load="load"></UserNew>
        <UserEdit ref="editForm" @load="load"></UserEdit>
        <UserDetail ref="detailForm" @load="load"></UserDetail>
    </div>
</template>
<script>
import UserNew from "./UserNew";
import UserEdit from "./UserEdit";
import UserDetail from "./UserDetail";
export default {
    created() {
        this.load();
    },
    data() {
        return {
            searchControlData: {
                sex: null
            },
            tableData: {
                loading: true,
                remove: {
                    ids: []
                },
                query: {
                    account: null,
                    name: null,
                    mobile: null,
                    usageStatus: null
                },
                page: {
                    current: 1,
                    size: 10,
                    orders: []
                },
                data: [],
                columns: [
                    {
                        title: "头像",
                        key: "avatar",
                        width: 60,
                        render: (h, params) => {
                            return h("div", [
                                h("Avatar", {
                                    props: {
                                        src: params.row.avatar
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: "账号",
                        key: "account",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "名称",
                        key: "name",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "性别",
                        key: "sex",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 60
                    },
                    {
                        title: "手机",
                        key: "mobile",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "出生年月",
                        key: "birthday",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                        width: 105
                    },
                    {
                        title: "状态",
                        key: "usageStatus",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                        width: 80
                    },
                    {
                        title: "创建人员",
                        key: "creator",
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
                                                    params.row.id
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
                                                    params.row.id
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
                                                this.delete(params.row.id);
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
                .post(this.globalActionUrl.user.list, this.tableData.query)
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
                            this.globalActionUrl.user.remove,
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
        UserNew,
        UserEdit,
        UserDetail
    }
};
</script>