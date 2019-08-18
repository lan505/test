<template>
    <div>
        <Modal v-model="dialog" title="新增系统用户" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="用户名" prop="account">
                        <Input v-model="form.account" autofocus clearable></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input v-model="form.name" clearable></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="form.password" clearable type="password"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="repassword">
                        <Input v-model="form.repassword" clearable type="password"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                        <RadioGroup v-model="form.sex">
                            <Radio v-for="item in formControlData.sex" :label="item.key" :key="item.key">{{item.value}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="所属角色" prop="lsRoleId">
                        <CheckboxGroup v-model="form.lsRoleId">
                            <Checkbox v-for="item in formControlData.lsRole" :label="item.key" :key="item.key">{{item.value}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="身份证号" prop="identity">
                        <Input v-model="form.identity" clearable></Input>
                    </FormItem>
                    <FormItem label="手机号码" prop="mobile">
                        <Input v-model="form.mobile" clearable></Input>
                    </FormItem>
                    <FormItem label="出生年月" prop="birthday">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="form.birthday"></DatePicker>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input v-model="form.address"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input v-model="form.comment" type="textarea" :autosize="{minRows: 5, maxRows: 10}"></Input>
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
export default {
    created() {
        
    },
    data() {
        return {
            formControlData: {
                sex: [],
                lsRole: [],
            },
            dialog: false,
            form: {
                account: null,
                name: null,
                password: null,
                repassword: null,
                lsRoleId: [],
                sex: null,
                mobile: null,
                identity: null,
                address: null,
                birthday: null,
                comment: null,
            },
            validate: {
                account: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 12,
                        message: "用户名长度为6-12位",
                        trigger: "blur"
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (value != null) {
                                this.axios
                                    .get(
                                        this.globalActionUrl.user.uniqueAccount,
                                        {
                                            params: { account: value }
                                        }
                                    )
                                    .then(res => {
                                        if (res) {
                                            callback(
                                                new Error(
                                                    "账号已存在，请重新输入"
                                                )
                                            );
                                        } else {
                                            callback();
                                        }
                                    });
                            }
                        }
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 2,
                        max: 32,
                        message: "名称长度为2-32位",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "名称长度为6-32位",
                        trigger: "blur"
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("请输入密码"));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                repassword: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 32,
                        message: "名称长度为6-32位",
                        trigger: "blur"
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("请确认密码"));
                            } else if (value !== this.form.password) {
                                callback(new Error("两次密码不一致!"));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                lsRoleId: [
                    {
                        required: true,
                        type: "array",
                        message: "请选择角色",
                        trigger: "change"
                    },
                ],
                sex: [
                    {
                        required: true,
                        type: "number",
                        message: "请选择性别",
                        trigger: "change"
                    }
                ],
                mobile: [
                    {
                        type: "string",
                        min: 11,
                        max: 11,
                        message: "手机号码为11位",
                        trigger: "blur"
                    }
                ],
                identity: [
                    {
                        type: "string",
                        min: 18,
                        max: 18,
                        message: "身份证号为18位",
                        trigger: "blur"
                    }
                ],
                birthday: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择出生日期",
                        trigger: "change"
                    }
                ],
                address: [
                    {
                        type: "string",
                        max: 256,
                        message: "地址最大长度为256个字符",
                        trigger: "blur"
                    }
                ],
                comment: [
                    {
                        type: "string",
                        max: 512,
                        message: "备注最大长度为512个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        load() {
            this.dialog = true;
            this.axios.get(this.globalActionUrl.dictIndex.listSex).then(res => {
                this.formControlData.sex = res.map(function(data) {
                    data.key = +data.key;
                    return data;
                });
            });
            this.axios.get(this.globalActionUrl.role.listKeyValue).then(res => {
                this.formControlData.lsRole = res.map(function(data) {
                    data.key = +data.key;
                    return data;
                });
            });
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.axios
                        .post(this.globalActionUrl.user.save, this.form)
                        .then(res => {
                            this.close();
                            this.$emit("load");
                            this.$Message.success("提交成功");
                        });
                }
            });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        }
    }
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
}
</style>
