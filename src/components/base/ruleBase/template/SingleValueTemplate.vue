<template>
    <div>
        <Form ref="form" :model="form" :label-width="80" :rules="validate">
            <FormItem class="default-form-item">
                <LxSelect :value.sync="form.targetType" :data="targetTypeDataSource" bindKey="targetType" bindValue="targetText" :clearable="false"></LxSelect>
            </FormItem>
            <FormItem class="default-form-item" prop="targetValue">
                <Input v-model="form.targetValue" min="1">
                    <LxSelect :value.sync="form.targetLogic" :data="targetLogicDataSource" :clearable="false" slot="prepend" style="width:100px; background-color: #ffffff;"></LxSelect>
                </Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    created() {
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
            form: this.targetTemplate || {
                targetType: "DOMAIN_LENGTH",
                targetLogic: ">",
                targetValue: 1,
            },
            validate: {
                targetValue: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur",
                    },
                ]
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
        targetTemplate: {},
    },
    methods: {
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$emit("update:value", this.form);
                }
            });
        },
        // 判断templateForm是否有初始化targetType字段，没有则填充默认targetType
    },
    components: {},
};
</script>
<style scorep>
.form {
    width: 100%;
}
.default-form-item {
    margin-bottom: 24px !important;
}
</style>
