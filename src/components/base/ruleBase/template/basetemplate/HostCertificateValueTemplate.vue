<template>
    <div>
        <Form ref="form" :model="targetTemplate" :label-width="90" :rules="validate">
            <FormItem label="生命周期" class="default-form-item">
                <div style="width: 100%;">
                    <div class="select-form-item">
                        <LxSelect :value.sync="targetTemplate.lifeCycle.targetLogic" :data="targetLogicDataSource" :clearable="false" style="background-color: #ffffff;"></LxSelect>
                    </div>
                    <div class="input-number-form-item">
                        <FormItem prop="lifeCycle.targetValue" style="width: 100%;">
                            <InputNumber :min="1" v-model="targetTemplate.lifeCycle.targetValue" style="width: 100%;"></InputNumber>
                        </FormItem>
                    </div>
                </div>
            </FormItem>
            <FormItem label="有效期" class="default-form-item">
                <div style="width: 100%;">
                    <div class="select-form-item">
                        <LxSelect :value.sync="targetTemplate.validDate.targetLogic" :data="targetLogicDataSource" :clearable="false" style="background-color: #ffffff;"></LxSelect>
                    </div>
                    <div class="input-number-form-item">
                        <FormItem prop="validDate.targetValue" style="width: 100%;">
                            <InputNumber :min="1" v-model="targetTemplate.validDate.targetValue" style="width: 100%;"></InputNumber>
                        </FormItem>
                    </div>
                </div>
            </FormItem>
            <FormItem label="DNS数量" class="default-form-item">
                <div style="width: 100%;">
                    <div class="select-form-item">
                        <LxSelect :value.sync="targetTemplate.dnsNameCount.targetLogic" :data="targetLogicDataSource" :clearable="false" style="background-color: #ffffff;"></LxSelect>
                    </div>
                    <div class="input-number-form-item">
                        <FormItem prop="dnsNameCount.targetValue" style="width: 100%;">
                            <InputNumber :min="1" v-model="targetTemplate.dnsNameCount.targetValue" style="width: 100%;"></InputNumber>
                        </FormItem>
                    </div>
                </div>
            </FormItem>
            <FormItem label="泛域名证书" class="default-form-item">
                <LxSwitch :value.sync="targetTemplate.wildcardDomain" openText="是" closeText="否" :useNumberValue="true"></LxSwitch>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    created() {
        this.initData();
    },
    data() {
        return {
            targetLogicDataSource: [
                {
                    key: ">",
                    value: "大于(>)",
                },
                {
                    key: "<",
                    value: "小于(<)",
                },
                {
                    key: "=",
                    value: "等于(=)",
                },
                {
                    key: ">=",
                    value: "大于等于(>=)",
                },
                {
                    key: "<=",
                    value: "小于等于(<=)",
                },
            ],
            form: {
                lifeCycle: {
                    targetLogic: ">",
                    targetValue: null,
                },
                validDate: {
                    targetLogic: ">",
                    targetValue: null,
                },
                dnsNameCount: {
                    targetLogic: ">",
                    targetValue: null,
                },
                wildcardDomain: 0,
            },
            validate: {
                "lifeCycle.targetValue": [
                    {
                        required: true,
                        type: "number",
                        message: "请输入生命周期",
                        trigger: "blur",
                    },
                ],
                "validDate.targetValue": [
                    {
                        required: true,
                        type: "number",
                        message: "请输入有效期",
                        trigger: "blur",
                    },
                ],
                "dnsNameCount.targetValue": [
                    {
                        required: true,
                        type: "number",
                        message: "请输入DNS数量",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: {
        // 选择的targetType
        selectedTargetType: null,
        // 目标模板数据对象
        targetTemplate: Object,
    },
    methods: {
        // 初始化数据
        initData() {
            this.initDefaultObject();
        },
        // 初始化默认的对象
        initDefaultObject() {
            // 如果selectedTargetType不为空则说明切换了targetType类型改变了子组件，重新更新父级对象的结构
            if (this.selectedTargetType != null) {
                this.changeTargetTemplateData();
            }
            // 如果当前目标模板数据对象为空则使用本地form对象赋值初始化
            if (Object.keys(this.targetTemplate).length == 0) {
                for (let key in this.form) {
                    this.$set(this.targetTemplate, key, this.form[key]);
                }
            }
            console.log("打印host certificate");
            console.log(this.targetTemplate);
        },
        // 改变目标模板数据
        changeTargetTemplateData() {
            this.$emit("changeTargetTemplateData", this.form);
        },
        // 校验当前组件的数据有效性
        validateTargetTemplate() {
            this.$refs.form.validate((valid) => {
                this.$emit("saveValidateResult", valid, this.targetTemplate);
            });
        },
    },
    components: {},
};
</script>
<style scorep>
.form {
    width: 100%;
}
.default-form-item {
    width: 100%;
    margin-top: 24px;
}
.select-form-item {
    width: 120px;
    float: left;
    margin-right: 10px;
}
.input-number-form-item {
    width: 320px;
    float: left;
}
</style>
