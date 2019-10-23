<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                    <Input v-model="tableData.query.name" clearable>
                        <span slot="prepend">菜单名称</span>
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
        <MenuNew ref="newForm" @load="load"></MenuNew>
        <MenuEdit ref="editForm" @load="load"></MenuEdit>
        <MenuDetail ref="detailForm" @load="load"></MenuDetail>
    </div>
</template>
<script>
import MenuNew from "./MenuNew";
import MenuEdit from "./MenuEdit";
import MenuDetail from "./MenuDetail";
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
                        title: "父级菜单",
                        key: "pidCn",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "名称",
                        key: "name",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "URL",
                        key: "url",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "图标",
                        key: "icon",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "子数量",
                        key: "subNum",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "路由",
                        key: "router",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "类型",
                        key: "menuTypeCn",
                        ellipsis: "true",
                        tooltip: "true"
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
                                                    params.row.menuId
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
                                                    params.row.menuId
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
                                                this.delete(params.row.menuId);
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
                .post(this.globalActionUrl.menu.list, this.tableData.query)
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
                            this.globalActionUrl.menu.remove,
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
        MenuNew,
        MenuEdit,
        MenuDetail
    }
};
</script>
<style scoped>
</style>