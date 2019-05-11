<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                <Input v-model="listData.search.name" clearable>
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
                <Button type="primary" icon="md-search" @click="load">查询</Button>
                </Col>
            </Row>
        </div>
        <TablePage :loading="listData.loading" :columns="listData.page.columns" :data="listData.page.data" :total="listData.page.total" @load="load"></TablePage>
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
            controlData: {
                
            },
            listData: {
                loading: false,
                remove: {
                    ids: []
                },
                search: {
                    name: null,
                },
                page: {
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
                            width: 170,
                            render: (h, params) => {
                                return h("div", [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "default",
                                                size: "small"
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
                                                type: "default",
                                                size: "small"
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
                                                size: "small"
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
            }
        };
    },
    methods: {
        load(params) {
            this.listData.loading = true;
            Object.assign(this.listData.search, params);
            this.axios
                .get(this.globalActionUrl.roleList, {
                    params: this.listData.search
                })
                .then(res => {
                    this.listData.page.total = res == null ? 0 : res.total;
                    this.listData.page.data = res == null ? [] : res.records;
                    this.listData.loading = false;
                });
        },
        reset() {
            Object.keys(this.listData.search).forEach(
                key => (this.listData.search[key] = null)
            );
            this.load();
        },
        refresh() {
            this.load();
        },
        delete(id) {
            this.listData.remove.ids.push(id);
            this.$Modal.confirm({
                title: "提示框",
                content: "是否删除当前数据?",
                onOk: () => {
                    this.axios
                        .post(
                            this.globalActionUrl.roleRemove,
                            this.listData.remove
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
    },
    components: {
        RoleNew,
        RoleEdit,
        RoleDetail
    }
};
</script>