<template>
    <div>
        <Modal v-model="dialog" :z-index="0" title="修改密码" :mask-closable="false">
            <Form ref="form" :model="form" :label-width="80" :rules="validate">
                <FormItem label="原密码" prop="oldPassword">
                    <Input v-model="form.oldPassword" type="password" clearable></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <Input v-model="form.newPassword" type="password" clearable></Input>
                </FormItem>
                <FormItem label="确认密码" prop="reNewPassword">
                    <Input v-model="form.reNewPassword" type="password" clearable></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
                <Button type="primary" size="large" @click="confirm">确认</Button>
            </div>
        </Modal>
    </div>

</template>
<script>
export default {
    created() {},
    data() {
        return {
            dialog: false,
            form: {
                oldPassword: null,
                newPassword: null,
                reNewPassword: null,
            },
            validate: {
                oldPassword: [
                    {
                        required: true,
                        message: "请输入原密码",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "原密码长度为6-32位",
                        trigger: "blur",
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "新密码长度为6-32位",
                        trigger: "blur",
                    },
                ],
                reNewPassword: [
                    {
                        required: true,
                        message: "请输入确认密码",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "确认密码长度为6-32位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (value !== this.form.newPassword) {
                                callback(new Error("两次密码不一致!"));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
        };
    },
    methods: {
        close() {
            this.dialog = false;
            this.$emit("close");
            this.reset();
        },
        confirm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    this.$emit("confirm", this.form);
                }
            });
        },
        reset() {
            this.$refs.form.resetFields();
        },
    },
};
</script>
<style scoped>
</style>
