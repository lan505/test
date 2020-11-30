<template>
    <div>
        <Form ref="form" :model="targetTemplate" :label-width="80" :rules="validate">
            <FormItem class="default-form-item">
                <LxRadio :value.sync="targetTemplate.targetLogic" :data="targetLogicDataSource"></LxRadio>
            </FormItem>
            <FormItem class="default-form-item" prop="targetValue">
                <Input v-model="currentInputValue" search enter-button="确认" @on-search="addTag" />
            </FormItem>
            <FormItem class="default-form-item">
                <div class="scroll tag-container">
                    <Tag v-for="(item, index) in this.targetTemplate.targetValue" :key="index" closable :fade="false" size="large" @on-close="removeTag(index)">{{item}}</Tag>
                </div>
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
                    key: "or",
                    value: "任意包含",
                },
                {
                    key: "and",
                    value: "全部包含",
                },
            ],
            currentInputValue: null,
            form: {
                targetLogic: "or",
                targetValue: [],
            },
            validate: {
                targetValue: [
                    {
                        required: true,
                        type: "array",
                        message: "请输入内容",
                        trigger: "blur",
                    },
                ],
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
            if (this.selectedTargetType != null) {
                // this.changeTargetTemplateData();
            }
            // 如果当前目标模板数据对象为空则使用本地form对象赋值初始化
            if (Object.keys(this.targetTemplate).length == 0) {
                for (let key in this.form) {
                    this.$set(this.targetTemplate, key, this.form[key]);
                }
            }
            console.log("打印multi");
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
        /**
         * 添加标签
         */
        addTag() {
            // 如果当前值为空或空白字符串则
            var notEmpty =
                this.currentInputValue != null &&
                !this.currentInputValue.match(/^[ ]*$/);
            if (notEmpty) {
                if (
                    this.targetTemplate.targetValue.indexOf(
                        this.currentInputValue
                    ) < 0
                ) {
                    this.targetTemplate.targetValue.push(
                        this.currentInputValue
                    );
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
            console.log("删除标签：" + index);
            this.targetTemplate.targetValue.splice(index, 1);
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
.tag-container {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 5px;
}
</style>
