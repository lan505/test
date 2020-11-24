<template>
    <div>
        <Modal v-model="dialog" title="规则编辑" :width="700" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="规则名称" prop="ruleBaseName">
                        <Input v-model="form.ruleBaseName" clearable></Input>
                    </FormItem>
                    <FormItem label="启用状态">
                        <LxSwitch :value.sync="form.ruleBaseEnableStatus" openText="开启" closeText="禁用" :useNumberValue="true"></LxSwitch>
                    </FormItem>
                    <FormItem label="规则级别">
                        <LxRadio :value.sync="form.ruleBaseLevel" :data="formControlData.ruleBaseLevel"></LxRadio>
                    </FormItem>
                    <FormItem label="匹配关系">
                        <LxRadio :value.sync="form.ruleBaseMatchMode" :data="formControlData.ruleBaseMatchMode"></LxRadio>
                    </FormItem>
                    <FormItem label="规则配置">
                        <div v-for="(item, index) in ruleBaseJsonObject">
                            <TemplateConfig ref="templateConfig" :index="index" :templateForm.sync="item" @saveValidateResult="saveValidateResult" @removeTemplateConfig="removeTemplateConfig" @changeTargetTemplateData="changeTargetTemplateData"></TemplateConfig>
                        </div>
                        <Button type="primary" @click="addTemplateConfig">新增配置</Button>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
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
    ruleBaseEdit,
    ruleBaseDetail,
    ruleBaseLevel,
    existsRuleBaseName,
} from "@/assets/js/global/baseModuleApi";
import TemplateConfig from "./template/classtype/TemplateConfig";
export default {
    created() {
        
    },
    data() {
        return {
            formControlData: {
                ruleBaseLevel: [],
                ruleBaseMatchMode: [
                    {
                        key: "AND",
                        value: "全部匹配"
                    },
                    {
                        key: "OR",
                        value: "任意匹配"
                    }
                ],
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
                ruleBaseId: null,
                ruleBaseName: null,
                ruleBaseEnableStatus: null,
                ruleBaseJson: null,
                ruleBaseLevel: null,
                ruleBaseMatchMode: null,
                comment: null,
            },
            // 存储模板配置数据对象
            ruleBaseJsonObject: [],
            // 存储模板配置数据校验结果
            ruleBaseJsonValidateResult: [],
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
        load(ruleBaseId) {
            this.dialog = true;
            this.addTemplateConfig();
            this.loadRuleBaseDetail(ruleBaseId);
            this.loadRuleBaseLevel();
        },
        close() {
            this.dialog = false;
            this.$refs.form.resetFields();
            this.clearTemplateConfig();
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        save() {
            this.executeValidate();
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.checkValidateStatus()) {
                        this.form.ruleBaseJson = JSON.stringify(
                            this.ruleBaseJsonObject
                        );
                        ruleBaseEdit(this.form).then((res) => {
                            this.close();
                            this.$emit("loadList");
                            this.$Message.success("提交成功");
                        });
                    }
                }
            });
            this.clearValidateResult();
        },
        /**
         * 加载规则详情
         */
        loadRuleBaseDetail(data) {
            ruleBaseDetail({ ruleBaseId: data }).then((res) => {
                this.form = res;
                this.ruleBaseJsonObject = JSON.parse(res.ruleBaseJson);
            });
        },
        /**
         * 加载规则级别
         */
        loadRuleBaseLevel() {
            ruleBaseLevel().then((res) => {
                this.formControlData.ruleBaseLevel = res;
            });
        },
        verifyRuleBaseName(rule, value, callback) {
            if (value != null) {
                existsRuleBaseName({
                    ruleBaseId: this.form.ruleBaseId,
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
        /**
         * 执行子组件的校验
         */
        executeValidate() {
            this.clearValidateResult();
            let arrTempConfigInstance = this.$refs["templateConfig"];
            for (let index = 0; index < arrTempConfigInstance.length; index++) {
                arrTempConfigInstance[index].validateClassTemplate();
            }
        },
        /**
         * 保存子组件传递回来的校验结果
         */
        saveValidateResult(valid) {
            this.ruleBaseJsonValidateResult.push(valid);
        },
        /**
         * 校验子组件传递回来的校验结果：true校验成功，false校验失败
         */
        checkValidateStatus() {
            return this.ruleBaseJsonValidateResult.every((item) => {
                return item;
            });
        },
        /**
         * 清空子组件传递回来的校验结果
         */
        clearValidateResult() {
            this.ruleBaseJsonValidateResult.splice(0, this.ruleBaseJsonValidateResult.length);
        },
        verifyRuleBaseName(rule, value, callback) {
            if (value != null) {
                existsRuleBaseName({
                    ruleBaseId: this.form.ruleBaseId,
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
        /**
         * 新增模板配置
         */
        addTemplateConfig() {
            this.ruleBaseJsonObject.push(this.getDefaultTemplateConfigObject());
        },
        /**
         * 清空模板配置
         */
        clearTemplateConfig() {
            this.ruleBaseJsonValidateResult.splice(0, this.ruleBaseJsonValidateResult.length);
        },
        /**
         * 删除模板配置
         */
        removeTemplateConfig(index) {
            this.ruleBaseJsonObject.splice(index, 1);
        },
        /**
         * 获取默认的模板配置的初始化对象
         */
        getDefaultTemplateConfigObject() {
            return {};
        },
        // 改变目标模板数据
        changeTargetTemplateData(index, data) {
            for (let key in data) {
                this.$set(
                    this.ruleBaseJsonObject[index].classTemplate,
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
        TemplateConfig,
    },
};
</script>
<style scorep>
.form {
    width: 100%;
    overflow-y: auto;
}
</style>
