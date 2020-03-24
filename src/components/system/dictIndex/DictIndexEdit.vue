<template>
    <div>
        <Modal v-model="dialog" title="字典类别编辑" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="字典类别编号" prop="code">
                        <Input v-model="form.code" clearable></Input>
                    </FormItem>
                    <FormItem label="字典类别名称" prop="name">
                        <Input v-model="form.name" clearable></Input>
                    </FormItem>
                    <FormItem label="备注说明" prop="comment">
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
export default {
    created() {},
    data() {
        return {
            formControlData: {
                
            },
            dialog: false,
            form: {
                code: null,
                name: null,
                comment: null,
            },
            validate: {
                code: [
                    {
                        required: true,
                        message: "请输入字典类别编号",
                        trigger: "blur"
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入字典类别名称",
                        trigger: "blur"
                    },
                    {
                        max: 32,
                        message: "字典类别名称最大长度为32位",
                        trigger: "blur"
                    },
                ],
                comment: [
                    {
                        type: "string",
                        max: 512,
                        message: "备注说明最大长度为512个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        load(dictIndexId) {
            this.dialog = true;
            this.globalDict(this.globalConsts.dict.dictIndexType).then(res => {
                this.control.dictIndexType = res.map(function(data) {
                    data.key = +data.key;
                    return data;
                });
            });
            this.axios
                .get(this.globalActionUrl.system.dictIndexEdit, { params: { dictIndexId } })
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
                        .post(this.globalActionUrl.system.dictIndex.edit, this.form)
                        .then(res => {
                            this.close();
                            this.$emit("loadList");
                            this.$Message.success("提交成功");
                            this.$refs.treeSelect.clear();
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
