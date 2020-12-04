<template>
    <div>
        <Modal v-model="dialog" title="字典类别新增" :width="1400" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="cm-flex row" style="justify-content: space-between;">
                <div class="cm-flex" style="" v-show="this.showButton(this.globalActionUrl.system.dictItem.save)">
                    <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
                </div>
                <div class="cm-flex" style="">
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
            <LxTablePage ref="tablePage" row-key="id" :data="tableData.data" :columns="tableData.columns" :total="tableData.total" :loading="tableData.loading" @onSelect="onSelect" @onSelectCancel="onSelectCancel" @onSelectAll="onSelectAll" @onPageSort="onPageSort" @onPageIndex="onPageIndex" @onPageSize="onPageSize" @onLoadChilren="onLoadChilren"></LxTablePage>
            <DictItemNew ref="newDialog" @loadList="loadList"></DictItemNew>
            <DictItemEdit ref="editDialog" @loadList="loadList"></DictItemEdit>
            <DictItemDetail ref="detailDialog" @loadList="loadList"></DictItemDetail>
        </Modal>
    </div>
</template>
<script>
import DictItemNew from "./DictItemNew";
import DictItemEdit from "./DictItemEdit";
import DictItemDetail from "./DictItemDetail";
import {
    dictItemList,
    dictItemRemove,
    dictItemChildren,
} from "@/assets/js/api/systemModuleApi";
export default {
    created() {
        
    },
    data() {
        return {
            searchControlData: {},
            dialog: false,
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
                children: null,
                data: [],
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                    },
                    {
                        title: "字典值",
                        key: "dictItemKey",
                        ellipsis: "true",
                    },
                    {
                        title: "字典项",
                        key: "dictItemValue",
                        ellipsis: "true",
                        width: 150,
                        tree: true,
                    },
                    {
                        title: "层级",
                        key: "dictItemLevel",
                        ellipsis: "true",
                        sortable: "custom",
                    },
                    {
                        title: "子节点数",
                        key: "dictItemSubNum",
                        ellipsis: "true",
                    },
                    {
                        title: "创建人员",
                        key: "creatorCn",
                        ellipsis: "true",
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        ellipsis: "true",
                        width: 170,
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 180,
                        render: (h, params) => {
                            return this.initOperateButton(h, params);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        load() {
            this.dialog = true;
            this.loadList();
        },
        close() {
            this.dialog = false;
        },
        loadList() {
            dictItemList(this.tableData.query).then((res) => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data = res == null ? [] : res.records;
                this.tableData.data[0]._loading = false;
                this.tableData.data[0].children = [];
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
                    dictItemRemove({
                        ids: [id],
                    }).then((res) => {
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
                        dictItemRemove(this.tableData.remove).then((res) => {
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
        onLoadChilren(item, callback) {
            dictItemChildren({
                dictIndexCode: item.dictIndexCode,
                dictItemKey: item.dictItemKey,
            }).then((res) => {
                console.log(res);
                callback(res);
            });
        },
        loadCompleted() {
            this.tableData.remove.ids = [];
            this.tableData.query.page.orders = [];
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
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
                                this.globalActionUrl.system.dictItem.detail
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.showEditDialog(params.row.dictItemId);
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
                                this.globalActionUrl.system.dictItem.remove
                            )
                                ? "inline"
                                : "none",
                        },
                        on: {
                            click: () => {
                                this.remove(params.row.dictItemId);
                            },
                        },
                    },
                    "删除"
                ),
            ];
            return h("div", { style: { float: "left" } }, buttons);
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