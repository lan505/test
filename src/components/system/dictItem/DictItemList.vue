<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                <Input v-model="tableData.queryParams.name" clearable>
                <span slot="prepend">字典类别名称</span>
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
                <Button type="primary" icon="md-queryParams" @click="load">查询</Button>
                </Col>
            </Row>
        </div>
        <TablePage ref="tablePage" :url="this.globalActionUrl.dictItem.list" :columns="tableData.page.columns"></TablePage>
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
            searchControlData: {
                
            },
            tableData: {
                loading: false,
                remove: {
                    ids: []
                },
                queryParams: {
                    name: null,
                },
                page: {
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
                            tooltip: "true",
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
                                                icon: "md-search",
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
                                                icon: "md-create",
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
                                                icon: "md-trash",
                                            },
                                            on: {
                                                click: () => {
                                                    this.delete(params.row.dictItemId);
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
        load() {
            this.$refs.tablePage.load(this.tableData.queryParams);
        },
        reset() {
            Object.keys(this.tableData.queryParams).forEach(
                key => (this.tableData.queryParams[key] = null)
            );
            this.$refs.tablePage.load();
        },
        refresh() {
            this.$refs.tablePage.load(this.tableData.queryParams);
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
        DictItemNew,
        DictItemEdit,
        DictItemDetail
    }
};
</script>
<style scoped>

</style>
