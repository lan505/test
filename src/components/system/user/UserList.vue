<template>
    <div>
        <Card> 
            <div class="cm-flex row" style="width: 100%;">
                <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.user.saveUser)">
                    <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
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
                        <Button type="default" icon="md-search" @click="loadTableData()">查询</Button>
                    </div>
                    <div class="search-btn">
                        <Button type="default" icon="md-search" @click="reset()">重置</Button>
                    </div>
                    <div class="search-btn">
                        <Button type="error" icon="md-trash" @click="remove()">删除</Button>
                    </div>
                </div>
            </div>
        </Card>
        <Card class="card">
            <div>
                <LxTablePage ref="tablePage" 
                    :rowKey="this.tableData.rowKey" 
                    :queryParam="this.tableData.query" 
                    :queryDataUrl="this.globalActionUrl.system.user.queryUserPage" 
                    :removeDataUrl="this.globalActionUrl.system.user.removeUser"
                    :renderTableData="this.renderTableData" 
                    :columns="this.tableData.columns">
                </LxTablePage>
                <UserNew ref="newDialog" @loadTableData="loadTableData"></UserNew>
                <UserEdit ref="editDialog" @loadTableData="loadTableData"></UserEdit>
                <UserDetail ref="detailDialog" @loadTableData="loadTableData"></UserDetail>
            </div>
        </Card>
    </div>
</template>
<script>
import UserNew from "./UserNew";
import UserEdit from "./UserEdit";
import UserDetail from "./UserDetail";
export default {
    created() {},
    mounted() {
        this.initData();
    },
    data() {
        return {
            searchControlData: {
                userSex: null
            },
            tableData: {
                rowKey: "userId",
                query: {
                    userAccount: null,
                    userName: null,
                    userMobile: null,
                    userUsageStatus: null
                },
                columns: [
                    {
                        type: "selection",
                        align: "center",
                        width: 60
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
                        sortable: "custom",
                        width: 140,
                        render: (h, params) => {
                            return this.initUserName(h, params);
                        }
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
                        sortable: "custom",
                        width: 130
                    },
                    {
                        title: "出生年月",
                        key: "userBirthday",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                        width: 140
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
                        tooltip: "true",
                        width: 100
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
                        fixed: "right",
                        width: 150,
                        render: (h, params) => {
                            return this.initOperateButton(h, params);
                        }
                    }
                ]
            }
        };
    },
    methods: {
        initData() {
            this.loadTableData();
        },
        loadTableData() {
            this.$refs.tablePage.loadTableData();
        },
        reset() {
            Object.keys(this.tableData.query).forEach(key => {
                this.tableData.query[key] = null;
            });
            this.loadTableData();
        },
        remove(id) {
            this.$refs.tablePage.removeTableData(id);
        },
        showNewDialog() {
            this.$refs.newDialog.load();
        },
        showEditDialog(id) {
            this.$refs.editDialog.load(id);
        },
        showDetailForm(id) {
            this.$refs.detailDialog.load(id);
        },
        showButton(param) {
            return this.globalHelper.hasAuthority(
                this.$route.meta.button,
                param
            );
        },
        initAvatar(avatar) {
            return avatar == null || avatar == ""
                ? require("@/assets/images/default-user.png")
                : avatar;
        },
        initUserName(h, params) {
            let result = [h("span", params.row.userName)];
            if (params.row.userDefaultStatus == 1) {
                result.push(
                    h(
                        "Tag",
                        {
                            props: {
                                color: "primary"
                            },
                            style: {
                                marginLeft: "10px"
                            }
                        },
                        "默认"
                    )
                );
            }
            return h("span", result);
        },
        initOperateButton(h, params) {
            let buttons = [
                h(
                    "a",
                    {
                        style: {
                            marginRight: "10px",
                            display: this.showButton(
                                this.globalActionUrl.system.user.detailUser
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
                    "a",
                    {
                        style: {
                            marginRight: "10px",
                            display: this.showButton(
                                this.globalActionUrl.system.user.editUser
                            )
                                ? "inline"
                                : "none"
                        },
                        on: {
                            click: () => {
                                this.showEditDialog(params.row.userId);
                            }
                        }
                    },
                    "编辑"
                )
            ];
            if (params.row.userDefaultStatus == 0) {
                buttons.push(
                    h(
                        "a",
                        {
                            style: {
                                marginRight: "10px",
                                display: this.showButton(
                                    this.globalActionUrl.system.user.removeUser
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
            return h("div", { style: { float: "left" } }, buttons);
        },
        renderTableData(data) {
            return data == null
                ? []
                : data.map(function(value) {
                      value._disabled = value.userDefaultStatus == 1;
                      return value;
                  });
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
.card {
    margin-top: 16px;
}
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
