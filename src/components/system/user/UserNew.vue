<template>
    <div>
        <Modal v-model="dialog" title="系统新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="账号" prop="userAccount">
                        <Input v-model="form.userAccount" clearable></Input>
                    </FormItem>
                    <FormItem label="名称" prop="userName">
                        <Input v-model="form.userName" clearable></Input>
                    </FormItem>
                    <FormItem label="密码" prop="userPassword">
                        <Input v-model="form.userPassword" clearable type="password"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="reUserPassword">
                        <Input v-model="form.reUserPassword" clearable type="password"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="userSex">
                        <LxRadio :value.sync="form.userSex" :data="formControlData.userSex"></LxRadio>
                    </FormItem>
                    <FormItem label="所属角色" prop="lsRoleId">
                        <LxCheckBox :value.sync="form.lsRoleId" :data="formControlData.roles"></LxCheckBox>
                    </FormItem>
                    <FormItem label="身份证号" prop="userIdentity">
                        <Input v-model="form.userIdentity" clearable></Input>
                    </FormItem>
                    <FormItem label="手机号码" prop="userMobile">
                        <Input v-model="form.userMobile" clearable></Input>
                    </FormItem>
                    <FormItem label="出生年月" prop="userBirthday">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="form.userBirthday"></DatePicker>
                    </FormItem>
                    <FormItem label="地址" prop="userAddress">
                        <Input v-model="form.userAddress"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
                <Button type="primary" size="large" @click="save">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {
    userNew,
    userSex,
    roleKeyValue,
    existsUserAccount,
    existsUserName,
} from "@/assets/js/api/systemModuleApi";
export default {
    created() {
        
    },
    data() {
        return {
            formControlData: {
                userSex: [],
                roles: [],
            },
            dialog: false,
            form: {
                userAccount: null,
                userName: null,
                userPassword: null,
                reUserPassword: null,
                lsRoleId: [],
                userSex: null,
                userMobile: null,
                userIdentity: null,
                userAddress: null,
                userBirthday: null,
                comment: null,
            },
            validate: {
                userAccount: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 12,
                        message: "账号长度为6-12位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyUserAccount(rule, value, callback);
                        },
                    },
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 2,
                        max: 32,
                        message: "名称长度为2-32位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyUserName(rule, value, callback);
                        },
                    },
                ],
                userPassword: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "密码长度为6-32位",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            this.verifyUserPassword(rule, value, callback);
                        },
                    },
                ],
                reUserPassword: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "密码长度为6-32位",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            this.verifyReUserPassword(rule, value, callback);
                        },
                    },
                ],
                lsRoleId: [
                    {
                        required: true,
                        type: "array",
                        message: "请选择角色",
                        trigger: "change",
                    },
                ],
                userSex: [
                    {
                        required: true,
                        type: "number",
                        message: "请选择性别",
                        trigger: "change",
                    },
                ],
                userMobile: [
                    {
                        type: "string",
                        min: 11,
                        max: 11,
                        message: "手机号码为11位",
                        trigger: "blur",
                    },
                ],
                userIdentity: [
                    {
                        type: "string",
                        min: 18,
                        max: 18,
                        message: "身份证号为18位",
                        trigger: "blur",
                    },
                ],
                userBirthday: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择出生日期",
                        trigger: "change",
                    },
                ],
                userAddress: [
                    {
                        type: "string",
                        max: 256,
                        message: "地址最大长度为256个字符",
                        trigger: "blur",
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
            this.loadRoleKeyValue();
            this.loadUserSex();
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    userNew(this.form).then((res) => {
                        this.close();
                        this.$emit("loadList");
                        this.$Message.success("提交成功");
                    });
                }
            });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        loadUserSex() {
            userSex().then((res) => {
                this.formControlData.userSex = res;
            });
        },
        loadRoleKeyValue() {
            roleKeyValue().then((res) => {
                this.formControlData.roles = res;
            });
        },
        verifyUserAccount(rule, value, callback) {
            if (value != null) {
                existsUserAccount({
                    userAccount: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("账号已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyUserName(rule, value, callback) {
            if (value != null) {
                existsUserName({
                    userName: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("名称已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyUserPassword(rule, value, callback) {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        },
        verifyReUserPassword(rule, value, callback) {
            if (value === "") {
                callback(new Error("请确认密码"));
            } else if (value !== this.form.userPassword) {
                callback(new Error("两次密码不一致!"));
            } else {
                callback();
            }
        },
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
