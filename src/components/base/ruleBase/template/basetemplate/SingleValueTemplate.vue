<template>
    <div>
        <Form ref="form" :model="targetTemplate" :label-width="80" :rules="validate">
            <div style="width:100%; display: flex; justify-content: space-between;">
                <div style="width: 110px; height: 50px;">
                    <FormItem class="default-form-item">
                        <LxSelect :value.sync="targetTemplate.targetLogic" :data="targetLogicDataSource" :clearable="false" style="width:100%; background-color: #ffffff;"></LxSelect>
                    </FormItem>
                </div>
                <div style="width: 415px; height: 50px;">
                    <FormItem class="default-form-item" prop="targetValue">
                        <InputNumber :min="5" v-model="targetTemplate.targetValue" style="width: 100%;"></InputNumber>
                    </FormItem>
                </div>
            </div>
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
            ],
            form: {
                targetLogic: ">",
                targetValue: null,
            },
            validate: {
                targetValue: [
                    {
                        required: true,
                        type: "number",
                        message: "请输入内容",
                        trigger: "blur",
                    },
                ],
                targetLogic: [
                    {
                        required: true,
                        message: "请选择targetLogic",
                        trigger: "change",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入name",
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
            console.log("打印single");
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
    margin-bottom: 12px !important;
}
</style>
