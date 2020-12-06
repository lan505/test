<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.dictIndex.save)">
                <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
            </div>
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.name" clearable>
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
        <DictIndexNew ref="newDialog" @loadList="loadList"></DictIndexNew>
        <DictIndexEdit ref="editDialog" @loadList="loadList"></DictIndexEdit>
        <DictItemList ref="dictItemListDialog" @loadList="loadList"></DictItemList>
    </div>
</template>
<script>
import DictIndexNew from "./DictIndexNew";
import DictIndexEdit from "./DictIndexEdit";
import DictItemList from "../dictItem/DictItemList";
import {
    dictIndexList,
    dictIndexRemove,
} from "@/assets/js/api/systemModuleApi";
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
                    dictIndexName: null,
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
                        title: "字典类别编号",
                        key: "dictIndexCode",
                        ellipsis: "true",
                        tooltip: "true",
                    },
                    {
                        title: "字典类别名称",
                        key: "dictIndexName",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                    },
                    {
                        title: "字典项总数",
                        key: "dictIndexSubNum",
                        ellipsis: "true",
                        tooltip: "true",
                        sortable: "custom",
                    },
                    {
                        title: "创建人员",
                        key: "creatorCn",
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
                        width: 270,
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
            dictIndexList(this.tableData.query).then((res) => {
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
                    dictIndexRemove({
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
                        dictIndexRemove(this.tableData.remove).then((res) => {
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
        showDictItemListDialog(dictIndexCode) {
            this.$refs.dictItemListDialog.load(dictIndexCode);
        },
        showButton(param) {
            return this.globalHelper.hasAuthority(
                this.$route.meta.button,
                param
            );
        },
        onSelect(param, row) {
            this.tableData.remove.ids.push(row.dictIndexId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    (item) => item === row.dictIndexId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].dictIndexId);
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
                            icon: "md-create",
                        },
                        style: {
                            marginRight: "5px",
                            display: this.showButton(
                                this.globalActionUrl.system.dictIndex.edit
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showDictItemListDialog(params.row.dictIndexCode);
                            },
                        },
                    },
                    "字典项"
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
                                this.globalActionUrl.system.dictIndex.edit
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showEditDialog(params.row.dictIndexId);
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
                                this.globalActionUrl.system.dictIndex.remove
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.remove(params.row.dictIndexId);
                            },
                        },
                    },
                    "删除"
                ),
            ]
            return h("div", { style: { float: "left" } }, buttons);
        },
    },
    components: {
        DictIndexNew,
        DictIndexEdit,
        DictItemList,
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