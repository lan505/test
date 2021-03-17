<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.base.taskBase.save)">
                <Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
            </div>
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.taskBaseName" clearable>
                    <span slot="prepend">任务名称</span>
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
        <LxTablePage ref="tablePage" :data="tableData.data" :columns="tableData.columns" :total="tableData.total" :loading="tableData.loading" @onSelect="onSelect" @onSelectCancel="onSelectCancel" @onSelectAll="onSelectAll" @onPageSort="onPageSort" @onPageIndex="onPageIndex" @onPageSize="onPageSize">
        </LxTablePage>
        <TaskBaseNew ref="newDialog" @loadList="loadList"></TaskBaseNew>
    </div>
</template>
<script>
import TaskBaseNew from "./TaskBaseNew";
import TaskBaseDetail from "./TaskBaseDetail";
import { taskBaseList } from "@/assets/js/api/baseModuleApi";
export default {
    created() {
        this.initData();
    },
    data() {
        return {
            searchControlData: {
                taskBaseEnableStatus: null,
            },
            tableData: {
                loading: true,
                remove: {
                    ids: [],
                },
                query: {
                    taskBaseName: null,
                    taskBaseEnableStatus: null,
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
                        title: "任务名称",
                        key: "taskBaseName",
                        sortable: "custom",
                        render: (h, params) => {
                            return this.renderTaskBaseName(h, params);
                        },
                    },
                    {
                        title: "规则数",
                        key: "ruleBaseNum",
                        sortable: "custom",
                        width: 100,
                    },
                    {
                        title: "域名数",
                        key: "taskBaseItemNum",
                        sortable: "custom",
                        width: 100,
                    },
                    {
                        title: "耗时(秒)",
                        key: "taskBaseExecuteDuration",
                        sortable: "custom",
                        width: 110,
                    },
                    {
                        title: "执行状态",
                        key: "taskBaseStatusCn",
                        sortable: "custom",
                        width: 115,
                        render: (h, params) => {
                            return this.renderTaskBaseStatus(h, params);
                        },
                    },
                    {
                        title: "创建人员",
                        key: "creatorCn",
                        ellipsis: "true",
                        tooltip: "true",
                        width: 100,
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
                        width: 90,
                        render: (h, params) => {
                            return this.renderOperateButton(h, params);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        initData() {
            this.bus.$on("TASK_PROGRESS", msg => this.updateTaskBaseProgress(msg));
            this.loadList();
        },
        loadList() {
            taskBaseList(this.tableData.query).then((res) => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data = res == null ? [] : res.records;
                this.tableData.loading = false;
                this.addTaskPercentProperty(res);
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
        removeBatch() {},
        showNewDialog() {
            this.$refs.newDialog.load();
        },
        showButton(param) {
            return this.globalHelper.hasAuthority(
                this.$route.meta.button,
                param
            );
        },
        onSelect(param, row) {
            this.tableData.remove.ids.push(row.taskBaseId);
        },
        onSelectCancel(param, row) {
            this.tableData.remove.ids.splice(
                this.tableData.remove.ids.findIndex(
                    (item) => item === row.taskBaseId
                ),
                1
            );
        },
        onSelectAll(param) {
            for (let i = 0; i < param.length; i++) {
                this.tableData.remove.ids.push(param[i].taskBaseId);
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
        // 修改任务状态
        updateEnableStatus(taskBaseId, enableStatus) {
            updateEnableStatus({
                taskBaseId: taskBaseId,
                taskBaseEnableStatus: enableStatus,
            }).then((res) => {
                this.loadList();
            });
        },
        // 添加列表任务的进度属性
        addTaskPercentProperty(res) {
            res.records.forEach((item) => {
                let value = 0;
                if (item.taskBaseStatus === 2) {
                    value = 100;
                }
                this.$set(item, 'percent', value);
            });
        },
        // 渲染列表任务名称
        renderTaskBaseName(h, params) {
            return h("div", [
                h(
                    "div",
                    {
                        style: "margin-top: 5px",
                    },
                    params.row.taskBaseName
                ),
                h("Progress", {
                    props: {
                        percent: params.row.percent,
                        strokeColor: ["#108ee9", "#87d068"],
                    },
                }),
            ]);
        },
        // 渲染列表任务状态
        renderTaskBaseStatus(h, params) {
            let color;
            let text;
            if (params.row.taskBaseStatus === 0) {
                color = "default";
                text = "待执行";
            } else if (params.row.taskBaseStatus === 1) {
                color = "warning";
                text = "执行中";
            } else if (params.row.taskBaseStatus === 2) {
                color = "success";
                text = "已完成";
            } else {
            }
            return h("div", [
                h(
                    "Tag",
                    {
                        props: {
                            color: color,
                        },
                    },
                    text
                ),
            ]);
        },
        // 渲染操作列按钮
        renderOperateButton(h, params) {
            let arrButton = [];
            arrButton.push(
                h(
                    "Button",
                    {
                        props: {
                            disabled: params.row.taskBaseStatus != 2,
                        },
                        on: {
                            click: () => {
                                this.showDetailForm(params.row.taskBaseId);
                            },
                        },
                    },
                    "查看"
                )
            );
            return h("div", arrButton);
        },
        updateTaskBaseProgress(data) {
            this.tableData.data[0].percent = data.progressValue;
        }
    },
    components: {
        TaskBaseNew,
        TaskBaseDetail,
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