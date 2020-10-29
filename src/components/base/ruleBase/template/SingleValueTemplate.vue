<template>
    <div class="sub-template">
        <Form ref="form" :model="form" :label-width="80" :rules="validate">
            <div class="sub-panel">
                <div class="target-type">
                    <LxSelect :value.sync="form.targetType" :data="targetTypeDataSource" bindKey="targetType" bindValue="targetText" :clearable="false"></LxSelect>
                </div>
                <div class="target-logic">
                    <LxSelect :value.sync="form.targetLogic" :data="targetLogicDataSource" bindKey="logicType" bindValue="logicText" :clearable="false"></LxSelect>
                </div>
            </div>
            <FormItem label="" prop="targetValue">
                <InputNumber class="target-value" v-model="form.targetValue" :min="0"></InputNumber>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    created() {},
    data() {
        return {
            targetLogicDataSource: [
                {
                    logicType: ">",
                    logicText: ">",
                },
                {
                    logicType: "<",
                    logicText: "<",
                },
                {
                    logicType: "=",
                    logicText: "=",
                },
            ],
            form: {
                targetType: "DOMAIN_LENGTH",
                targetLogic: ">",
                targetValue: null,
            },
            validate: {
                targetValue: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: {
        targetTypeDataSource: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {},
    components: {},
};
</script>
<style scorep>
.sub-template {
    width: 100%;
}
.sub-panel {
    width: 100%;
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    justify-content: space-between;
}
.target-type {
    width: calc(100% - 80px);
}
.target-logic {
    width: 70px;
    height: 40px;
}
.target-value {
    width: 100%;
}
</style>
