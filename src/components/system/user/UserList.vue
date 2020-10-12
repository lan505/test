<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.user.save)">
                <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
            </div>
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.userAccount" clearable>
                    <span slot="prepend">账号</span>
                    </Input>
                </div>
                <div class="search-btn">
                    <Input v-model="tableData.query.userName" clearable>
                    <span slot="prepend">名称</span>
                    </Input>
                </div>
                <div class="search-btn">
                    <Input v-model="tableData.query.userMobile" clearable>
                    <span slot="prepend">手机</span>
                    </Input>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-search" @click="loadList()">查询</Button>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-refresh" @click="refresh()">刷新</Button>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-search" @click="reset()">重置</Button>
                </div>
                <div class="search-btn">
                    <Button type="error" icon="md-trash" @click="removeBatch()">删除</Button>
                </div>
            </div>
        </div>
        <LxTablePage ref="tablePage" :data="tableData.data" :columns="tableData.columns" :total="tableData.total" :loading="tableData.loading" @onSelect="onSelect" @onSelectCancel="onSelectCancel" @onSelectAll="onSelectAll" @onPageSort="onPageSort" @onPageIndex="onPageIndex" @onPageSize="onPageSize"></LxTablePage>
        <UserNew ref="newForm" @loadList="loadList"></UserNew>
        <UserEdit ref="editForm" @loadList="loadList"></UserEdit>
        <UserDetail ref="detailForm" @loadList="loadList"></UserDetail>
    </div>
</template>
<script>
import UserNew from "./UserNew";
import UserEdit from "./UserEdit";
import UserDetail from "./UserDetail";
import { userRemove, userList } from "@/assets/js/global/systemModuleApi";
export default {
    created() {
        this.initData();
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
                    userMobile: null,
                    userUsageStatus: null,
                    page: {
                        current: 1,
                        size: 10,
                        orders: []
                    }
                },
                total: 0,
                data: [],
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "头像",
                        key: "userAvatar",
                        width: 70,
                        render: (h, params) => {
                            return h("div", [
                                h("Avatar", {
                                    props: {
                                        src: this.initAvatar(
                                            params.row.userAvatar
                                        )
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
                        key: "userSexCn",
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
                        key: "userUsageStatusCn",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom"
                    },
                    {
                        title: "创建人员",
                        key: "creatorCn",
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
                            return this.initRoleOperateStatusButton(h, params);
                        }
                    }
                ]
            }
        };
    },
    methods: {
        initData() {
            this.loadList();
        },
        loadList() {
            userList(this.tableData.query).then(res => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data =
                    res == null
                        ? []
                        : res.records.map(function(value) {
                              value._disabled = value.userOperateStatus == 0;
                              return value;
                          });
                this.tableData.loading = false;
                this.loadCompleted();
            });
        },
        reset() {
            Object.keys(this.tableData.query).forEach(key => {
                console.log(key);
                this.tableData.query[key] = null;
            });
            this.loadList();
        },
        refresh() {
            this.loadList();
        },
        remove(id) {
            this.$Modal.confirm({
                title: "提示框",
                content: "是否删除当前数据?",
                onOk: () => {
                    userRemove({ ids: [id] }).then(res => {
                        this.tableData.remove.ids = [];
                        this.$Message.success("删除成功");
                        this.loadList();
                    });
                }
            });
        },
        removeBatch() {
            if (this.tableData.remove.ids.length > 0) {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否删除当前数据?",
                    onOk: () => {
                        userRemove(this.tableData.remove).then(res => {
                            this.tableData.remove.ids = [];
                            this.$Message.success("删除成功");
                            this.loadList();
                        });
                    }
                });
            } else {
                this.$Message.info("请选择要删除的数据");
            }
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
            return this.globalHelper.hasAuthority(
                this.$route.meta.button,
                param
            );
        },
        onSelect(param, row) {
            this.tableData.remove.ids.push(row.userId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    item => item === row.userId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].userId);
            }
        },
        onPageSort(param) {
            if (param.order != "normal") {
                this.tableData.query.page.orders.push({
                    column: param.key,
                    asc: param.order == "asc"
                });
            }
            this.loadList();
        },
        onPageIndex(param) {
            this.tableData.query.page.current = param;
            this.loadList();
        },
        onPageSize(param) {
            this.tableData.query.page.size = param;
            this.loadList();
        },
        loadCompleted() {
            this.tableData.query.page.orders = [];
        },
        initAvatar(avatar) {
            return avatar == null || avatar == ""
                ? require("../../../assets/images/default-user.png")
                : this.globalConsts.system.base64Prefix + avatar;
        },
        initRoleOperateStatusButton(h, params) {
            let childButtons = [
                h(
                    "Button",
                    {
                        props: {
                            type: "default",
                            size: "small",
                            icon: "md-search"
                        },
                        style: {
                            marginRight: "5px",
                            display: this.showButton(
                                this.globalActionUrl.system.user.detail
                            )
                                ? "inline"
                                : "none"
                        },
                        on: {
                            click: () => {
                                this.showDetailForm(params.row.userId);
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
                            size: "small",
                            icon: "md-create"
                        },
                        style: {
                            marginRight: "5px",
                            display: this.showButton(
                                this.globalActionUrl.system.user.edit
                            )
                                ? "inline"
                                : "none"
                        },
                        on: {
                            click: () => {
                                this.showEditForm(params.row.userId);
                            }
                        }
                    },
                    "编辑"
                )
            ];

            if (params.row.userOperateStatus == 1) {
                childButtons.push(
                    h(
                        "Button",
                        {
                            props: {
                                type: "default",
                                size: "small",
                                icon: "md-trash"
                            },
                            style: {
                                marginRight: "5px",
                                display: this.showButton(
                                    this.globalActionUrl.system.user.remove
                                )
                                    ? "inline"
                                    : "none"
                            },
                            on: {
                                click: () => {
                                    this.remove(params.row.userId);
                                }
                            }
                        },
                        "删除"
                    )
                );
            }
            return h("div", { style: { float: "left" } }, childButtons);
        }
    },
    components: {
        UserNew,
        UserEdit,
        UserDetail
    }
};
</script>
<style scoped>
.save-btn {
    width: 10%;
    float: left;
}
.search-tool {
    width: 90%;
    text-align: right;
}
.search-btn {
    margin-left: 10px;
}
.hide-check-box {
    display: none;
}
</style>