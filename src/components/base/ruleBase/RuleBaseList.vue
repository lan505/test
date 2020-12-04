<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.base.ruleBase.save)">
                <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
            </div>
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.ruleBaseName" clearable>
                    <span slot="prepend">规则名称</span>
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
        <RuleBaseNew ref="newDialog" @loadList="loadList"></RuleBaseNew>
        <RuleBaseEdit ref="editDialog" @loadList="loadList"></RuleBaseEdit>
        <RuleBaseDetail ref="detailDialog" @loadList="loadList"></RuleBaseDetail>
    </div>
</template>
<script>
import RuleBaseNew from "./RuleBaseNew";
import RuleBaseEdit from "./RuleBaseEdit";
import RuleBaseDetail from "./RuleBaseDetail";
import {
    ruleBaseRemove,
    ruleBaseList,
    updateEnableStatus,
} from "@/assets/js/api/baseModuleApi";
export default {
    created() {
        this.initData();
    },
    data() {
        return {
            searchControlData: {
                ruleBaseEnableStatus: null,
            },
            tableData: {
                loading: true,
                remove: {
                    ids: [],
                },
                query: {
                    ruleBaseName: null,
                    ruleBaseEnableStatus: null,
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
                        title: "规则名称",
                        key: "ruleBaseName",
                        sortable: "custom",
                    },
                    {
                        title: "启用状态",
                        key: "ruleBaseEnableStatus",
                        render: (h, params) => {
                            return h("div", [
                                h("LxSwitch", {
                                    props: {
                                        value: params.row.ruleBaseEnableStatus,
                                        useNumberValue: true,
                                    },
                                    on: {
                                        "update:value": (value) => {
                                            this.updateEnableStatus(params.row.ruleBaseId, value);
                                        },
                                    },
                                }),
                            ]);
                        },
                    },
                    {
                        title: "配置数量",
                        key: "ruleBaseItemNum",
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
                                                this.globalActionUrl.base
                                                    .ruleBase.detail
                                            )
                                                ? "inline"
                                                : "none",
                                        },
                                        on: {
                                            click: () => {
                                                this.showDetailForm(
                                                    params.row.ruleBaseId
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
                                                this.globalActionUrl.base
                                                    .ruleBase.detail
                                            )
                                                ? "inline"
                                                : "none",
                                        },
                                        on: {
                                            click: () => {
                                                this.showEditDialog(
                                                    params.row.ruleBaseId
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
                                                this.globalActionUrl.base
                                                    .ruleBase.remove
                                            )
                                                ? "inline"
                                                : "none",
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(
                                                    params.row.ruleBaseId
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
            ruleBaseList(this.tableData.query).then((res) => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data = res == null ? [] : res.records;
                this.tableData.loading = false;
                this.loadCompleted();
            });
        },
        reset() {
            Object.keys(this.tableData.query).forEach((key) => {
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
                    ruleBaseRemove({ ids: [id] }).then((res) => {
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
                        ruleBaseRemove(this.tableData.remove).then((res) => {
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
            this.tableData.remove.ids.push(row.ruleBaseId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    (item) => item === row.ruleBaseId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].ruleBaseId);
            }
        },
        onPageSort(param) {
            if (param.order != "normal") {
                console.log(this.tableData.query.page);
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
        loadCompleted() {
            this.tableData.query.page.orders = [];
        },
        updateEnableStatus(ruleBaseId, enableStatus) {
            updateEnableStatus({
                ruleBaseId: ruleBaseId,
                ruleBaseEnableStatus: enableStatus,
            }).then((res) => {
                this.loadList();
            });
        },
    },
    components: {
        RuleBaseNew,
        RuleBaseEdit,
        RuleBaseDetail,
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
.hide-check-box {
    display: none;
}
</style>