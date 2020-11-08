<template>
    <div>
        <Form ref="form" :model="targetTemplate" :label-width="80" :rules="validate">
            <FormItem class="default-form-item">
                <LxSwitch :value.sync="targetTemplate.targetValue" openText="是" closeText="否"></LxSwitch>
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
                targetValue: true,
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
        initData() {
            this.$emit("changeTargetTemplateObject", this.form);
        },
        validateTargetTemplate() {
            this.$refs.form.validate((valid) => {
                this.$emit("validateResult", valid, this.targetTemplate);
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
