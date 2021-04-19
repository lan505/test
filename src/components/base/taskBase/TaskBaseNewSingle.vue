<template>
    <Card>
        <div class="content">
            <div class="title">
                域名检测识别
            </div>
            <div class="search">
                <Input v-model="form.domain" search enter-button="开始识别" size="large" :autofocus="true"
                    @on-search="save"></Input>
            </div>
            <div class="result">
                <div class="load" v-if="loading">
                    <Spin size="large"></Spin>
                </div>
                <Form :label-width="100">
                    <FormItem :label="item.key" v-for="(item, index) in result" :key="item.key">
                        {{item.value}}
                    </FormItem>
                </Form>
            </div>
        </div>
    </Card>
</template>
<script>
import {
    saveSingle,
} from "@/assets/js/api/baseModuleApi";
export default {
    created() {
        this.load();
    },
    mounted() {},
    data() {
        return {
            form: {
                domain: null,
            },
            loading: false,
            // 执行的信息结果
            result: []
        };
    },
    methods: {
        // 初始化
        load() {
            this.bus.$on("TASK_SINGLE_PROGRESS", (msg) =>
                this.updateTaskBaseProgress(msg)
            );
        },
        save() {
            if (this.form.domain != null) {
                this.loading = true;
                saveSingle(this.form).then((res) => {
                    this.clear();
                });
            }
        },
        // 清空历史数据
        clear() {
            this.loading = false;
            this.result = [];
        },
        // 修改任务状态
        updateTaskBaseProgress(data) {
            this.result.push({key: "执行时间(秒)", value: data.taskBaseExecuteDuration});
            this.result.push({key: "命中规则", value: data.ruleBaseSimpVO == null ? "无" : data.ruleBaseSimpVO.ruleBaseName});
            this.result.push({key: "风险等级", value: data.ruleBaseSimpVO == null ? "低风险" : data.ruleBaseSimpVO.ruleBaseLevelCn});
        },
    },
    components: {},
};
</script>
<style scorep>
.content {
    height: 650px;
}
.title {
    width: 550px;
    margin: auto;
    margin-top: 100px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #353535;
}
.search {
    width: 550px;
    margin: auto;
    margin-top: 20px;
}
.result {
    width: 550px;
    margin: auto;
    margin-top: 10px;
}
.load {
    width: 40px;
    height: 40px;
    margin: auto;
}
</style>
