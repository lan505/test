<template>
    <Card>
        <div>
            <div class="cm-flex row" style="width: 100%;">
                <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.role.save)">
                    <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
                </div>
                <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                    <div class="search-btn">
                        <Input v-model="tableData.query.roleName" clearable>
                        <span slot="prepend">名称</span>
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
            <RoleNew ref="newDialog" @loadList="loadList"></RoleNew>
            <RoleEdit ref="editDialog" @loadList="loadList"></RoleEdit>
            <RoleDetail ref="detailDialog" @loadList="loadList"></RoleDetail>
            <RoleAuthority ref="authorityForm" @loadList="loadList"></RoleAuthority>
        </div>
    </Card>
</template>
<script>
import RoleNew from "./RoleNew";
import RoleEdit from "./RoleEdit";
import RoleDetail from "./RoleDetail";
import RoleAuthority from "./RoleAuthority";
import { roleRemove, roleList } from "@/assets/js/api/requestSystem";
export default {
    created() {
        this.initData();
    },
    data() {
        return {
            searchControlData: {},
            tableData: {
                loading: true,
                remove: {
                    ids: [],
                },
                query: {
                    roleName: null,
                    page: {
                        current: 1,
                        size: 10,
                        orders: [],
                    },
                },
                total: 0,
                data: [],
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                    },
                    {
                        title: "角色编号",
                        key: "roleCode",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                    },
                    {
                        title: "角色名称",
                        key: "roleName",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                    },
                    {
                        title: "创建人员",
                        key: "creator",
                        ellipsis: "true",
                        tooltip: "true",
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 170,
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 320,
                        render: (h, params) => {
                            return this.initOperateButton(h, params);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        initData() {
            this.loadList();
        },
        loadList() {
            roleList(this.tableData.query).then((res) => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data = res == null ? [] : res.records.map(function (value) {
                    value._disabled = value.roleDefaultStatus == 1;
                    return value;
                });
                this.tableData.loading = false;
                this.loadCompleted();
            });
        },
        reset() {
            Object.keys(this.tableData.query).forEach(
                (key) => (this.tableData.query[key] = null)
            );
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
                    roleRemove({ ids: [id] }).then((res) => {
                        this.tableData.remove.ids = [];
                        this.$Message.success("删除成功");
                        this.loadList();
                    });
                },
            });
        },
        removeBatch() {
            if (this.tableData.remove.ids.length > 0) {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否删除当前数据?",
                    onOk: () => {
                        roleRemove(this.tableData.remove).then((res) => {
                            this.tableData.remove.ids = [];
                            this.$Message.success("删除成功");
                            this.loadList();
                        });
                    },
                });
            } else {
                this.$Message.info("请选择要删除的数据");
            }
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
        showAuthorityForm(id) {
            this.$refs.authorityForm.load(id);
        },
        showButton(param) {
            return this.globalHelper.hasAuthority(
                this.$route.meta.button,
                param
            );
        },
        onSelect(param, row) {
            this.tableData.remove.ids.push(row.roleId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    (item) => item === row.roleId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].roleId);
            }
        },
        onPageSort(param) {
            if (param.order != "normal") {
                this.tableData.query.page.orders.push({
                    column: param.key,
                    asc: param.order == "asc",
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
        initOperateButton(h, params) {
            let buttons = [
                h(
                    "Button",
                    {
                        props: {
                            type: "default",
                            size: "small",
                            icon: "md-search",
                        },
                        style: {
                            marginRight: "5px",
                            display: this.showButton(
                                this.globalActionUrl.system.role.detail
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showDetailForm(params.row.roleId);
                            },
                        },
                    },
                    "查看"
                ),
                h(
                    "Button",
                    {
                        props: {
                            type: "default",
                            size: "small",
                            icon: "md-create",
                        },
                        style: {
                            marginRight: "5px",
                            display: this.showButton(
                                this.globalActionUrl.system.role.edit
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showEditDialog(params.row.roleId);
                            },
                        },
                    },
                    "编辑"
                ),
                h(
                    "Button",
                    {
                        props: {
                            type: "default",
                            size: "small",
                            icon: "md-key",
                        },
                        style: {
                            marginRight: "5px",
                            display: this.showButton(
                                this.globalActionUrl.system.role.assignAuthority
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showAuthorityForm(params.row.roleId);
                            },
                        },
                    },
                    "权限"
                ),
            ];
            if (params.row.roleDefaultStatus == 0) {
                buttons.push(
                    h(
                        "Button",
                        {
                            props: {
                                type: "default",
                                size: "small",
                                icon: "md-trash",
                            },
                            style: {
                                marginRight: "5px",
                                display: this.showButton(
                                    this.globalActionUrl.system.role.remove
                                )
                                    ? "inline"
                                    : "none",
                            },
                            on: {
                                click: () => {
                                    this.remove(params.row.roleId);
                                },
                            },
                        },
                        "删除"
                    )
                );
            }
            return h("div", { style: { float: "left" } }, buttons);
        },
    },
    components: {
        RoleNew,
        RoleEdit,
        RoleDetail,
        RoleAuthority,
    },
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
</style>