<template>
    <div>
        <Modal v-model="dialog" title="字典值编辑" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="字典类别编号" prop="code">
                        <Input v-model="form.dictItemCode" clearable></Input>
                    </FormItem>
                    <FormItem label="字典类别名称" prop="name">
                        <Input v-model="form.dictItemName" clearable></Input>
                    </FormItem>
                    <FormItem label="备注说明" prop="comment">
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
export default {
    created() {},
    data() {
        return {
            formControlData: {
                lsDictIndex: [],
                parentValue: null,
            },
            dialog: false,
            form: {
                dictItemCode: null,
                dictItemParentKey: null,
                dictItemValue: null,
                name: null,
                comment: null,
            },
            validate: {
                dictItemCode: [
                    {
                        required: true,
                        message: "请输入字典类别编号",
                        trigger: "blur"
                    },
                ],
                dictItemParentKey: [
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
        load(dictItemId) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.system.dictItem.edit, { params: { dictItemId } })
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
                        .post(this.globalActionUrl.system.dictItem.edit, this.form)
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
        },
        loadParentValue({ action, parentNode, callback }) {
            this.axios
                .get(this.globalActionUrl.system.menu.listByPid, {
                    params: {
                        pid: parentNode == null ? null : parentNode.id
                    }
                })
                .then(res => {
                    if (action === "LOAD_ROOT_OPTIONS") {
                        this.formControlData.pid = this.normalizerParentValue(res);
                    } else if (action === "LOAD_CHILDREN_OPTIONS") {
                        parentNode.children = this.normalizerParentValue(res);
                    }
                    callback();
                });
        },
        normalizerParentValue(node) {
            let arrNodes = [];
            arrNodes = node.map(item => {
                let node = {};
                node.id = item.key;
                node.label = item.value;
                node.children = item.subNum == 0 ? item.children : null;
                node.isNew = true;
                return node;
            });
            return arrNodes;
        },
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