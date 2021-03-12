<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.menu.save)">
                <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
            </div>
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.menuName" clearable>
                    <span slot="prepend">名称</span>
                    </Input>
                </div>
                <div class="search-btn">
                    <LxSelect :value.sync="tableData.query.menuType" :url="this.globalActionUrl.system.menu.listMenuType"></LxSelect>
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
        <LxTablePage ref="tablePage" rowKey="menuId" :data="tableData.data" :columns="tableData.columns" :total="tableData.total" :loading="tableData.loading" @onSelect="onSelect" @onSelectCancel="onSelectCancel" @onSelectAll="onSelectAll" @onPageSort="onPageSort" @onPageIndex="onPageIndex" @onPageSize="onPageSize" @onLoadChilren="onLoadChilren"></LxTablePage>
        <MenuNew ref="newDialog" @loadList="loadList"></MenuNew>
        <MenuEdit ref="editDialog" @loadList="loadList"></MenuEdit>
        <MenuDetail ref="detailDialog" @loadList="loadList"></MenuDetail>
    </div>
</template>
<script>
import MenuNew from "./MenuNew";
import MenuEdit from "./MenuEdit";
import MenuDetail from "./MenuDetail";
import { menuList, menuRemove, menuChildren } from "@/assets/js/api/systemModuleApi";
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
                    menuName: null,
                    menuType: null,
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
                        align: "center",
                        width: 60,
                    },
                    {
                        title: "菜单名称",
                        key: "menuName",
                        ellipsis: "true",
                        sortable: "custom",
                        tree: true,
                    },
                    {
                        title: "地址",
                        key: "menuUrl",
                        ellipsis: "true",
                    },
                    {
                        title: "路由",
                        key: "menuRouter",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 140,
                    },
                    {
                        title: "图标",
                        key: "menuIcon",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 100,
                    },
                    {
                        title: "类型",
                        key: "menuType",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 65,
                    },
                    {
                        title: "排序",
                        key: "menuSort",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 65,
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 250,
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
            menuList(this.tableData.query).then((res) => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data = res == null ? [] : res.records;
                this.globalHelper.initTreeDataFields(this, this.tableData.data);
                this.tableData.loading = false;
                this.loadCompleted();
            });
        },
        reset() {
            Object.keys(this.tableData.query).forEach((key) => {
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
                    menuRemove({
                        ids: [id],
                    }).then((res) => {
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
                        menuRemove(this.tableData.remove).then((res) => {
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
        showButton(param) {
            return this.globalHelper.hasAuthority(
                this.$route.meta.button,
                param
            );
        },
        onSelect(param, row) {
            this.tableData.remove.ids.push(row.menuId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    (item) => item === row.menuId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].menuId);
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
        onLoadChilren(item, callback) {
            menuChildren({
                treeParentId: item.menuId
            }).then((res) => {
                this.globalHelper.initTreeDataFields(this, res);
                callback(res);
            });
        },
        loadCompleted() {
            this.tableData.query.page.orders = [];
        },
        loadMenuType() {
            this.axios
                .get(this.globalActionUrl.system.menu.optionMenuType)
                .then((res) => {
                    this.searchControlData.menuType = res;
                });
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
                                this.globalActionUrl.system.menu.detail
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showDetailForm(params.row.menuId);
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
                                this.globalActionUrl.system.menu.edit
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showEditDialog(params.row.menuId);
                            },
                        },
                    },
                    "编辑"
                ),
            ];
            if (params.row.menuDefaultStatus == 0) {
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
                                    this.globalActionUrl.system.menu.remove
                                )
                                    ? "inline"
                                    : "none",
                            },
                            on: {
                                click: () => {
                                    this.remove(params.row.menuId);
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
        MenuNew,
        MenuEdit,
        MenuDetail,
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