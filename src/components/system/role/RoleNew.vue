<template>
    <div>
        <Modal v-model="dialog" title="角色新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="角色编号" prop="roleCode">
                        <Input v-model="form.roleCode" clearable></Input>
                    </FormItem>
                    <FormItem label="角色名称" prop="roleName">
                        <Input v-model="form.roleName" clearable></Input>
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
    saveRole,
    existsRoleName,
    existsRoleCode,
} from "@/assets/js/api/requestSystem";
export default {
    created() {},
    data() {
        return {
            formControlData: {},
            dialog: false,
            form: {
                roleName: null,
                roleCode: null,
                comment: null,
            },
            validate: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 1,
                        max: 12,
                        message: "角色名称长度为1-12位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (value != null) {
                                existsRoleName({ roleName: value }).then(
                                    (res) => {
                                        if (res) {
                                            callback(
                                                new Error(
                                                    "角色名称已存在，请重新输入"
                                                )
                                            );
                                        } else {
                                            callback();
                                        }
                                    }
                                );
                            }
                        },
                    },
                ],
                roleCode: [
                    {
                        required: true,
                        message: "请输入角色编号",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 1,
                        max: 32,
                        message: "角色编号长度为1-32位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (value != null) {
                                existsRoleCode({ roleName: value }).then(
                                    (res) => {
                                        if (res) {
                                            callback(
                                                new Error(
                                                    "角色编号已存在，请重新输入"
                                                )
                                            );
                                        } else {
                                            callback();
                                        }
                                    }
                                );
                            }
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
            this.$refs.form.validate((valid) => {
                if (valid) {
                    saveRole(this.form).then((res) => {
                        this.close();
                        this.$emit("loadTableData");
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
