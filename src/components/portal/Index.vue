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
        <div class="card">
            <Card>
                <VChart class="month-chart" :option="taskMonthOption"></VChart>
            </Card>
        </div>
        <div class="card">
            <Card>
                <VChart class="world-chart" :option="worldChartOptions"></VChart>
            </Card>
        </div>
    </div>
</template>
<script>
import { today, month, globalDomainHits } from "@/assets/js/api/statistics";
import world from "@/assets/json/world";
import nameMap from "@/assets/js/utils/nameMap";
// 加载highchart图标
import Highcharts from "highcharts";
import mapInit from "highcharts/modules/map";
import * as echarts from "echarts/core";
// 加载echarts图标
import VChart from "vue-echarts";
import { BarChart, LineChart, MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent,
} from "echarts/components";

echarts.registerMap("world", world);
echarts.use([
    BarChart,
    LineChart,
    MapChart,
    CanvasRenderer,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent,
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
            // 任务月度数据对象
            taskMonthOption: {
                color: ["#2db7f5", "#ed4014", "#ff9900", "#19be6b"],
                title: {
                    text: "域名质检趋势",
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                legend: {
                    data: ["域名数量", "高风险", "中风险", "低风险"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月",
                        ],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                    },
                ],
                series: [
                    {
                        name: "域名数量",
                        type: "line",
                        data: [],
                    },
                    {
                        name: "高风险",
                        type: "bar",
                        stack: "规则级别",
                        emphasis: {
                            focus: "series",
                        },
                        barWidth: 20,
                        data: [],
                    },
                    {
                        name: "中风险",
                        type: "bar",
                        stack: "规则级别",
                        emphasis: {
                            focus: "series",
                        },
                        barWidth: 20,
                        data: [],
                    },
                    {
                        name: "低风险",
                        type: "bar",
                        stack: "规则级别",
                        emphasis: {
                            focus: "series",
                        },
                        barWidth: 20,
                        data: [],
                    },
                ],
            },
            // 世界地图数据对象
            worldChartOptions: {
                title: {
                    text: "全球域名命中分布",
                },
                tooltip: {
                    trigger: "item",
                    formatter: '{b}<br/>域名命中数：{c}'
                },
                visualMap: {
                    min: 0,
                    max: 10000,
                    inRange: {
                        color: ['#E0E0E0', '#FFCC66', '#FFCC00', '#FF9900', '#FF6600', '#FF3300', '#FF0000']
                    },
                    text: ['高', '低'],
                    calculable: true
                },
                series: [
                    {
                        type: "map",
                        // 自定义扩展图表类型
                        map: "world",
                        // 开启缩放
                        roam: true,
                        // 缩放级别配置
                        scaleLimit: {
                            min: 1,
                            max: 50,
                        },
                        // 区域高亮
                        emphasis: {
                            itemStyle: {
                                areaColor: '#0066CC'
                            }
                        },
                        data: [
                            
                        ],
                        // 自定义名称映射
                        nameMap: nameMap,
                    },
                ],
            },
        };
    },
    created() {
        this.initData();
    },
    methods: {
        // 初始化数据
        initData() {
            this.loadTodayReport();
            this.loadMonthReport();
            this.loadWorldReport();
        },
        // 加载今日报表
        loadTodayReport() {
            today().then((res) => {
                this.taskTotalData = res;
            });
        },
        // 加载月度报表
        loadMonthReport() {
            month().then((res) => {
                this.taskMonthOption.series.forEach((item) => {
                    if (item.name === "域名数量") {
                        item.data = res.domainCount;
                    } else if (item.name === "高风险") {
                        item.data = res.hightLevelTotal;
                    } else if (item.name === "中风险") {
                        item.data = res.middleLevelTotal;
                    } else if (item.name === "低风险") {
                        item.data = res.lowLevelTotal;
                    } else {
                    }
                });
            });
        },
        // 加载世界地图命中域名报表
        loadWorldReport() {
            globalDomainHits().then((res) => {
                res.forEach((item) => {
                    this.worldChartOptions.series[0].data.push({name: item.key, value: item.value});
                })
            });
        },
    },
    mounted() {},
    components: {
        VChart,
    },
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
.card {
    width: 100%;
    margin-top: 20px;
}
.month-chart {
    height: 400px;
}
.world-chart {
    height: 600px;
}
</style>
