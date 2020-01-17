<template>
    <div>
        <div class="row" style="height: 32px;">
            <Form ref="formInline" inline>
                <FormItem prop="user">
                    <Input v-model="tableData.query.userAccount" clearable>
                        <span slot="prepend">账号</span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="tableData.query.userName" clearable>
                        <span slot="prepend">名称</span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="tableData.query.usermobile" clearable>
                        <span slot="prepend">手机</span>
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
            <Form ref="formInline" inline v-show="this.showButton(this.globalActionUrl.user.save)">
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
            :loading="tableData.loading"
            @onPageSort="onPageSort"
            @onPageIndex="onPageIndex"
            @onPageSize="onPageSize"
        ></TablePage>
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
                userSex: null
            },
            tableData: {
                loading: true,
                remove: {
                    ids: []
                },
                query: {
                    userAccount: null,
                    userName: null,
                    usermobile: null,
                    userUsageStatus: null,
                    page: {
                        current: 1,
                        size: 10,
                        orders: []
                    },
                },
                total: 0,
                data: [],
                columns: [
                    {
                        title: "头像",
                        key: "userAvatar",
                        width: 70,
                        render: (h, params) => {
                            
                            return h("div", [
                                h("Avatar", {
                                    props: {
                                        src: this.initAvatar(params.row.userAvatar)
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: "账号",
                        key: "userAccount",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "名称",
                        key: "userName",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "性别",
                        key: "userSex",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "手机",
                        key: "userMobile",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "出生年月",
                        key: "userBirthday",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "状态",
                        key: "userUsageStatus",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "创建人员",
                        key: "creator",
                        ellipsis: "true",
                        tooltip: "true"
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 170
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 250,
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
                                            marginRight: "5px",
                                            display: this.showButton(this.globalActionUrl.user.detail) ? "inline" : "none"
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetailForm(
                                                    params.row.userId
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
                                            marginRight: "5px",
                                            display: this.showButton(this.globalActionUrl.user.edit) ? "inline" : "none"
                                        },
                                        on: {
                                            click: () => {
                                                this.showEditForm(
                                                    params.row.userId
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
                                        style: {
                                            marginRight: "5px",
                                            display: this.showButton(this.globalActionUrl.user.remove) ? "inline" : "none"
                                        },
                                        on: {
                                            click: () => {
                                                this.delete(params.row.userId);
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
        showButton(param) {
            return this.buttonAuthority(this, param);
        },
        onPageSort(param) {
            if (param.order != "normal") {
                this.tableData.query.page.orders.push({
                    column: param.key,
                    asc: param.order == "asc"
                });
            }
            this.load();
        },
        onPageIndex(param) {
            this.tableData.query.page.current = param;
            this.load();
        },
        onPageSize(param) {
            this.tableData.query.page.size = param;
            this.load();
        },
        loadCompleted() {
            this.tableData.query.page.orders = [];
        },
        initAvatar(param) {
            if(param){
                return param;
            }else{
                return require("../../../assets/images/default-user.png");
            }
        }
    },
    components: {
        UserNew,
        UserEdit,
        UserDetail
    }
};
</script>