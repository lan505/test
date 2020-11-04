<template>
    <div class="sub-template">
        <Form ref="form" :model="this.from" :label-width="80" :rules="validate">
            <FormItem class="default-form-item" prop="targetValue">
                <LxSelect :value.sync="this.form.targetType" :data="targetTypeDataSource" bindKey="targetType" bindValue="targetText" :clearable="false"></LxSelect>
            </FormItem>
            <FormItem class="default-form-item" prop="targetValue">
                <Input v-model="this.from.targetValue" min="1">
                <LxSelect :value.sync="this.from.targetLogic" :data="targetLogicDataSource" bindKey="logicType" bindValue="logicText" :clearable="false" slot="prepend" style="width:100px; background-color: #ffffff;"></LxSelect>
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
                    logicType: ">",
                    logicText: "大于(>)",
                },
                {
                    logicType: "<",
                    logicText: "小于(<)",
                },
                {
                    logicType: "=",
                    logicText: "等于(=)",
                },
            ],
            from: {
                targetType: this.targetTypeDataSource[0].targetType,
                targetLogic: this.targetLogicDataSource[0].logicType,
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
        templateForm: {},
    },
    methods: {
        // 判断templateForm是否有初始化targetType字段，没有则填充默认targetType
        
    },
    components: {},
};
</script>
<style scorep>
.sub-template {
    width: 100%;
    height: auto;
}
.default-form-item {
    margin-bottom: 24px !important;
}
</style>
