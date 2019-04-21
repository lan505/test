<template>
    <div>
        <div class="row">
            <Row :gutter="16">
                <Col span="6">
                <Input v-model="listData.search.account" clearable>
                <span slot="prepend">账号</span>
                </Input>
                </Col>
                <Col span="6">
                <Input v-model="listData.search.name" clearable>
                <span slot="prepend">名称</span>
                </Input>
                </Col>
                <Col span="6">
                <Input v-model="listData.search.mobile" clearable>
                <span slot="prepend">手机</span>
                </Input>
                </Col>
                <Col span="6">
                <Input v-model="listData.search.account" clearable>
                <span slot="prepend">身份证号</span>
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
        console.log(this.$route.path);
        this.load();
        this.getControlData(this.globalConstant.dict.sex);
    },
    data() {
        return {
            controlData: {
                sex: null
            },
            listData: {
                loading: false,
                remove: {
                    ids: []
                },
                search: {
                    account: null,
                    name: null,
                    mobile: null,
                    isDelete: null
                },
                page: {
                    total: 0,
                    data: [],
                    columns: [
                        {
                            title: "头像",
                            key: "avatar",
                            width: 50,
                            render: (h, params) => {
                                return h("div", [
                                    h("Avatar", {
                                        props: {
                                            src:
                                                "https://i.loli.net/2017/08/21/599a521472424.jpg"
                                        }
                                    })
                                ]);
                            }
                        },
                        {
                            title: "用户名",
                            key: "account",
                            ellipsis: "true",
                            tooltip: "true",
                            sortable: "custom",
                            width: 90,
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
                            width: 60,
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
                            sortable: "custom",
                            ellipsis: "true",
                            tooltip: "true",
                            width: 110,
                        },
                        {
                            title: "用户状态",
                            key: "deleteStatus",
                            ellipsis: "true",
                            tooltip: "true",
                            width: 100,
                        },
                        {
                            title: "创建人员",
                            key: "creator",
                            ellipsis: "true",
                            tooltip: "true",
                            width: 100,
                        },
                        {
                            title: "创建时间",
                            key: "createTime",
                            ellipsis: "true",
                            tooltip: "true",
                            width: 150,
                        },
                        {
                            title: "操作",
                            key: "action",
                            width: 170,
                            align: "center",
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
                .get(this.globalActionUrl.userList, { params: this.listData.search })
                .then(res => {
                    this.listData.page.total = res == null ? 0 : res.total;
                    this.listData.page.data = res == null ? [] : res.records;
                    this.listData.loading = false;
                });
        },
        reset() {
            Object.keys(this.listData.search).forEach(key => this.listData.search[key] = null);
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
                        .post(this.globalActionUrl.userRemove, this.listData.remove)
                        .then(res => {
                            this.$Message.success("删除成功");
                            this.load();
                        });
                }
            });
        },
        getControlData(data) {
            this.axios
                .get(this.globalActionUrl.dictItemListKeyValue, {
                    params: { name: data }
                })
                .then(res => {
                    this.controlData.sex = res;
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
        }
    },
    components: {
        UserNew,
        UserEdit,
        UserDetail
    }
};
</script>