<template>
    <div>
        <Form ref="form" :model="form" :label-width="80" :rules="validate">
            <FormItem class="default-form-item">
                <LxSwitch :value.sync="targetTemplate.targetValue" openText="是" closeText="否"></LxSwitch>
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
            form: {
                targetValue: false,
            },
            validate: {
                
            },
        };
    },
    props: {
        // 选择的targetType
        selectedTargetType: null,
        // 目标模板数据结构
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
            if(this.selectedTargetType != null){
                this.changeTargetTemplateData();
            }
            // 如果当前目标模板数据对象为空则使用本地form对象赋值初始化
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
.tag-container {
    width: 100%;
    height: 100px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 5px;
}
</style>
