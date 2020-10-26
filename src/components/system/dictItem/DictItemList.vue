<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.dictItem.save)">
                <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
            </div>
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <LxSelect :value.sync="tableData.query.dictItemCode" :url="this.globalActionUrl.system.dictItem.listDictIndexCode"></LxSelect>
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
        <DictItemNew ref="newForm" @loadList="loadList"></DictItemNew>
        <DictItemEdit ref="editForm" @loadList="loadList"></DictItemEdit>
        <DictItemDetail ref="detailForm" @loadList="loadList"></DictItemDetail>
    </div>
</template>
<script>
import DictItemNew from "./DictItemNew";
import DictItemEdit from "./DictItemEdit";
import DictItemDetail from "./DictItemDetail";
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
                    dictItemCode: null,
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
                        title: "字典类别",
                        key: "dictItemCode",
                        ellipsis: "true",
                        tooltip: "true",
                    },
                    {
                        title: "字典键",
                        key: "dictItemKey",
                        ellipsis: "true",
                        tooltip: "true",
                    },
                    {
                        title: "字典值",
                        key: "dictItemValue",
                        ellipsis: "true",
                        tooltip: "true",
                    },
                    {
                        title: "层级",
                        key: "dictItemLevel",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                    },
                    {
                        title: "子节点数",
                        key: "dictItemSubNum",
                        ellipsis: "true",
                        tooltip: "true",
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
                        width: 250,
                        render: (h, params) => {
                            return h("div", [
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
                                                this.globalActionUrl.system
                                                    .dictItem.detail
                                            )
                                                ? "inline"
                                                : "none",
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetailForm(
                                                    params.row.dictItemId
                                                );
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
                                                this.globalActionUrl.system
                                                    .dictItem.detail
                                            )
                                                ? "inline"
                                                : "none",
                                        },
                                        on: {
                                            click: () => {
                                                this.showEditForm(
                                                    params.row.dictItemId
                                                );
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
                                            icon: "md-trash",
                                        },
                                        style: {
                                            marginRight: "5px",
                                            display: this.showButton(
                                                this.globalActionUrl.system
                                                    .dictItem.remove
                                            )
                                                ? "inline"
                                                : "none",
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(
                                                    params.row.dictItemId
                                                );
                                            },
                                        },
                                    },
                                    "删除"
                                ),
                            ]);
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
            this.axios
                .post(
                    this.globalActionUrl.system.dictItem.list,
                    this.tableData.query
                )
                .then((res) => {
                    this.tableData.total = res == null ? 0 : res.total;
                    this.tableData.data = res == null ? [] : res.records;
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
                    this.axios
                        .post(this.globalActionUrl.system.dictItem.remove, {
                            ids: [id],
                        })
                        .then((res) => {
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
                        this.axios
                            .post(
                                this.globalActionUrl.system.dictItem.remove,
                                this.tableData.remove
                            )
                            .then((res) => {
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
            this.tableData.remove.ids.push(row.dictItemId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    (item) => item === row.dictItemId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].dictItemId);
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
    },
    components: {
        DictItemNew,
        DictItemEdit,
        DictItemDetail,
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