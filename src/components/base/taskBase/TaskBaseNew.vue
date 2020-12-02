<template>
    <div>
        <Modal v-model="dialog" title="规则新增" :width="700" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :tasks="validate">
                    <FormItem label="规则名称" prop="taskBaseName">
                        <Input v-model="form.taskBaseName" clearable></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {
    taskBaseNew,
    existsTaskBaseName,
} from "@/assets/js/api/baseModuleApi";
export default {
    created() {
        
    },
    mounted() {
    },
    data() {
        return {
            formControlData: {
                taskBaseEnableStatus: [
                    {
                        key: 1,
                        value: "启用",
                    },
                    {
                        key: 0,
                        value: "禁用",
                    },
                ],
            },
            dialog: false,
            form: {
                taskBaseName: null,
                taskBaseEnableStatus: 0,
                taskBaseJson: null,
                comment: null,
            },
            validate: {
                taskBaseName: [
                    {
                        required: true,
                        message: "请输入规则名称",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        max: 64,
                        message: "账号长度为64位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (task, value, callback) => {
                            this.verifyTaskBaseName(task, value, callback);
                        },
                    },
                ],
                comment: [
                    {
                        type: "string",
                        max: 512,
                        message: "备注最大长度为512个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        load() {
            this.dialog = true;
        },
        close() {
            this.dialog = false;
            this.$refs.form.resetFields();
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // if (this.checkValidateStatus()) {
                    //     this.form.taskBaseJson = JSON.stringify(this.taskBaseJsonObject);
                    //     taskBaseNew(this.form).then((res) => {
                    //         this.close();
                    //         this.$emit("loadList");
                    //         this.$Message.success("提交成功");
                    //     });
                    // }
                }
            });
        },
        /**
         * 执行子组件的校验
         */
        executeValidate() {
            let arrTempConfigInstance = this.$refs["templateConfig"];
            for (let index = 0; index < arrTempConfigInstance.length; index++) {
                arrTempConfigInstance[index].validateClassTemplate();
            }
        },
        /**
         * 保存子组件传递回来的校验结果
         */
        saveValidateResult(valid) {
            this.taskBaseJsonValidateResult.push(valid);
        },
        /**
         * 校验子组件传递回来的校验结果：true校验成功，false校验失败
         */
        checkValidateStatus() {
            return this.taskBaseJsonValidateResult.every((item) => {
                return item;
            });
        },
        /**
         * 清空子组件传递回来的校验结果
         */
        clearValidateResult() {
            this.taskBaseJsonObject.splice(0, this.taskBaseJsonObject.length);
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        verifyTaskBaseName(task, value, callback) {
            if (value != null) {
                existsTaskBaseName({
                    taskBaseName: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("规则名称已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        /**
         * 新增模板配置
         */
        addTemplateConfig() {
            this.taskBaseJsonObject.push(this.getDefaultTemplateConfigObject());
        },
        /**
         * 清空模板配置
         */
        clearTemplateConfig() {
            this.taskBaseJsonObject = [];
        },
        /**
         * 删除模板配置
         */
        removeTemplateConfig(index) {
            this.taskBaseJsonObject.splice(index, 1);
        },
        /**
         * 获取默认的模板配置的初始化对象
         */
        getDefaultTemplateConfigObject() {
            return {};
        },
        // 改变目标模板数据
        changeTargetTemplateData(index, data) {
            console.log("规则新增：changeTargetTemplateData");
            for (let key in data) {
                this.$set(
                    this.taskBaseJsonObject[index].classTemplate,
                    key,
                    data[key]
                );
            }
        },
        // 字符串转json对象
        parseJson(data) {
            return JSON.parse(data);
        },
    },
    components: {
        
    },
};
</script>
<style scorep>
.form {
    padding-right: 15px;
}
</style>
