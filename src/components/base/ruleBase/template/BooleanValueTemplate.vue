<template>
    <div>
        <Form ref="form" :model="form" :label-width="80" :rules="validate">
            <FormItem class="default-form-item">
                <LxSwitch :value.sync="form.targetValue" openText="是" closeText="否" :useNumberValue="true"></LxSwitch>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    created() {
        console.log("BooleanValueTemplate加载");
        this.initData();
    },
    data() {
        return {
            form: {
                targetValue: 0,
            },
            validate: {
                
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
            console.log(this.targetTemplate);
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
.tag-container {
    width: 100%;
    height: 100px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 5px;
}
</style>
