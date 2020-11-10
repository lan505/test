<template>
    <div>
        <Form ref="form" :model="targetTemplate" :label-width="80" :rules="validate">
            <div style="width: 100%; height: 50px;">
                <div style="width: 100px; float: left;">
                    <FormItem class="default-form-item">
                        <LxSelect :value.sync="targetTemplate.targetLogic" :data="targetLogicDataSource" :clearable="false" style="width:100px; background-color: #ffffff;"></LxSelect>
                    </FormItem>
                </div>
                <div style="width: 400px; float: left;">
                    <FormItem class="default-form-item" prop="targetValue">
                        <InputNumber :min="1" v-model="targetTemplate.targetValue" style="width: calc(543px - 110px); margin-left: 10px;"></InputNumber>
                    </FormItem>
                </div>
            </div>
        </Form>
    </div>
</template>
<script>
export default {
    created() {
        console.log("SingleValueTemplate加载");
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
        targetTypeDataSource: {
            type: Array,
            default() {
                return [];
            },
        },
        targetTemplate: Object,
    },
    methods: {
        // 初始化数据
        initData() {
            this.changeTargetTemplateData();
            this.initDefaultObject();
        },
        // 初始化默认的对象
        initDefaultObject() {
            if (Object.keys(this.targetTemplate).length == 0) {
                for(let key in this.form){
                    this.$set(this.targetTemplate, key, this.form[key]);
                }
            }
        },
        // 改变目标模板数据
        changeTargetTemplateData() {
            this.$emit("changeTargetTemplateData", this.form);
        },
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
.ivu-form-item-error-tip {
    margin-left: 110px !important;
}
</style>
