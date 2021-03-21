<template>
    <div class="context-box">
        <div class="index-title">
            <div class="index-card">
                <Card>
                    <div class="data">
                        {{taskTotalData.taskTotal}}
                    </div>
                    <div class="desc">
                        今日任务
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card>
                    <div class="data">
                        {{taskTotalData.domainTotal}}
                    </div>
                    <div class="desc">
                        今日域名
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card class="">
                    <div class="data">
                        {{taskTotalData.hightLevelTotal}}
                    </div>
                    <div class="desc">
                        今日高风险
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card class="">
                    <div class="data">
                        {{taskTotalData.middleLevelTotal}}
                    </div>
                    <div class="desc">
                        今日中风险
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card class="">
                    <div class="data">
                        {{taskTotalData.lowLevelTotal}}
                    </div>
                    <div class="desc">
                        今日低风险
                    </div>
                </Card>
            </div>
        </div>
        <div class="task-month">
            <Card>
                <VChart class="chart" :option="taskMonthOption"></VChart>
            </Card>
        </div>
    </div>
</template>
<script>
import { today, month } from "@/assets/js/api/statistics"
import * as echarts from "echarts/core";
import VChart from "vue-echarts";
import {
    BarChart,
    LineChart
} from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';

echarts.use([
    BarChart,
    LineChart,
    CanvasRenderer,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
]);
export default {
    data() {
        return {
            taskTotalData: {
                // 任务总数
                taskTotal: 0,
                // 域名总数
                domainTotal: 0,
                // 高风险总数
                hightLevelTotal: 0,
                // 中风险总数
                middleLevelTotal: 0,
                // 低风险总数
                lowLevelTotal: 0,
            },
            // 任务月度数据
            taskMonth: {
                domainCount: [],
                hightLevelTotal: [],
                middleLevelTotal: [],
                lowLevelTotal: [],
            },
            taskMonthOption: {
                color: ["#2db7f5", "#ed4014", "#ff9900", "#19be6b"],
                title: {
                    text: '域名质检趋势'
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                legend: {
                    data: ['域名数量', '高风险', '中风险', '低风险']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data:  ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '域名数量',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '高风险',
                        type: 'bar',
                        stack: '规则级别',
                        emphasis: {
                            focus: 'series'
                        },
                        barWidth: 20,
                        data: []
                    },
                    {
                        name: '中风险',
                        type: 'bar',
                        stack: '规则级别',
                        emphasis: {
                            focus: 'series'
                        },
                        barWidth: 20,
                        data: []
                    },
                    {
                        name: '低风险',
                        type: 'bar',
                        stack: '规则级别',
                        emphasis: {
                            focus: 'series'
                        },
                        barWidth: 20,
                        data: []
                    },
                ]
            },
        };
    },
    created() {
        this.initData();
    },
    methods: {
        // 初始化数据
        initData() {
            today().then((res) => {
                this.taskTotalData = res;
            });
            month().then((res) => {
                this.taskMonth = res;
            });
        }
    },
    components: {
        VChart
    }
};
</script>
<style scoped>
.context-box {
    width: 100%;
}
.index-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
.index-card {
    width: 220px;
}
.data {
    color: #17233d;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
}
.desc {
    color: #515a6e;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}
.task-month {
    width: 100%;
    margin-top: 20px;
}
.chart {
    height: 400px;
}
</style>
