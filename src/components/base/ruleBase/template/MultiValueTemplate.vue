<template>
    <div>
        <Form ref="form" :model="targetTemplate" :label-width="80" :rules="validate">
            <FormItem class="default-form-item">
                <LxRadio :value.sync="targetTemplate.targetLogic" :data="targetLogicDataSource"></LxRadio>
            </FormItem>
            <FormItem class="default-form-item">
                <Input v-model="currentInputValue" search enter-button="确认" @on-search="addTag" />
            </FormItem>
            <FormItem class="default-form-item">
                {{this.targetTemplate}}
                <div class="scroll tag-container">
                    <Tag v-for="(item, index) in this.targetTemplate.targetValue" :key="index" closable :fade="false" size="large" @on-close="removeTag(index)">{{item}}</Tag>
                </div>
            </FormItem>
        </Form>
        <!-- <Tag type="border" closable color="primary">标签一</Tag> -->
        <!-- <Form ref="form" :model="addForm" :label-width="80" :rules="validate">
            <FormItem class="default-form-item" prop="name">
                <Input v-model="addForm.name" style="width: calc(543px - 110px); margin-left: 10px;"></Input>
            </FormItem>
        </Form> -->
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
            targetLogicDataSource: [
                {
                    key: "any",
                    value: "任意包含",
                },
                {
                    key: "all",
                    value: "全部包含",
                },
            ],
            currentInputValue: null,
            form: {
                targetLogic: "any",
                targetValue: [],
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
        /**
         * 添加标签
         */
        addTag() {
            // 如果当前值为空或空白字符串则
            var notEmpty =
                this.currentInputValue != null &&
                !this.currentInputValue.match(/^[ ]*$/);
            if (notEmpty) {
                if (this.form.targetValue.indexOf(this.currentInputValue) < 0) {
                    this.form.targetValue.push(this.currentInputValue);
                    this.clearCurrentInputValue();
                }
            } else {
                this.clearCurrentInputValue();
            }
        },
        /**
         * 删除标签
         */
        removeTag(index) {
            this.form.targetValue.splice(index, 1);
        },
        /**
         * 清空当前文本框的值
         */
        clearCurrentInputValue() {
            this.currentInputValue = null;
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
