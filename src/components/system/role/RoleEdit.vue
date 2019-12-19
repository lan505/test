<template>
    <div>
        <Modal v-model="dialog" title="角色编辑" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="角色编号" prop="code">
                        <Input v-model="form.code" clearable></Input>
                    </FormItem>
                    <FormItem label="角色名称" prop="name">
                        <Input v-model="form.name" clearable></Input>
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
                
            },
            dialog: false,
            form: {
                id: 0,
                code: "",
                name: "",
                comment: "",
            },
            validate: {
                name: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 1,
                        max: 12,
                        message: "角色名称长度为1-12位",
                        trigger: "blur"
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "请输入角色编号",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 1,
                        max: 32,
                        message: "角色编号长度为1-32位",
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
        load(id) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.role.edit, { params: { roleId } })
                .then(res => {
                    this.form = res;
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
                        .post(this.globalActionUrl.role.edit, this.form)
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
