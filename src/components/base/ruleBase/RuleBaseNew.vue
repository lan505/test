<template>
    <div>
        <Modal v-model="dialog" title="规则新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="规则名称" prop="ruleBaseName">
                        <Input v-model="form.ruleBaseName" clearable></Input>
                    </FormItem>
                    <FormItem label="启用状态" prop="ruleBaseEnableStatus">
                        <LxSwitch :value.sync="form.ruleBaseEnableStatus" openText="开启" closeText="禁用" :useNumberValue="true"></LxSwitch>
                    </FormItem>
                    <FormItem label="规则配置" prop="ruleBaseEnableStatus">
                        <div v-for="(item, index) in form.ruleBaseJson">
                            <TemplateConfig :count="index + 1" :value.sync="item"></TemplateConfig>
                        </div>
                        <Button type="primary" @click="addConfig">新增配置</Button>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 10}"></Input>
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
    ruleBaseNew,
    existsRuleBaseName,
} from "@/assets/js/global/baseModuleApi";
import TemplateConfig from "./template/TemplateConfig";
export default {
    created() {},
    data() {
        return {
            formControlData: {
                ruleBaseEnableStatus: [
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
                ruleBaseName: null,
                ruleBaseEnableStatus: 0,
                ruleBaseJson: [],
                comment: null,
            },
            validate: {
                ruleBaseName: [
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
                        validator: (rule, value, callback) => {
                            this.verifyRuleBaseName(rule, value, callback);
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
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            console.log(this.form);
            // this.$refs.form.validate((valid) => {
            //     if (valid) {
            //         ruleBaseNew(this.form).then((res) => {
            //             this.close();
            //             this.$emit("loadList");
            //             this.$Message.success("提交成功");
            //         });
            //     }
            // });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        verifyRuleBaseName(rule, value, callback) {
            if (value != null) {
                existsRuleBaseName({
                    ruleBaseName: value,
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
        // 新增配置
        addConfig() {
            this.form.ruleBaseJson.push({});
        },
    },
    components: {
        TemplateConfig,
    },
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
}
</style>
