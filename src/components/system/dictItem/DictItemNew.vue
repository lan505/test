<template>
    <div>
        <Modal v-model="dialog" title="字典值新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="字典类别编号" prop="code">
                        <Select v-model="form.code">
                            <Option v-for="item in this.formControlData.lsDictIndex" :value="item.key" :key="item.key">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="父级字典项" prop="parentValue">
                        <Treeselect v-model="form.parentValue" :options="formControlData.parentValue" :loadOptions="loadParentValue" :autoLoadRootPptions="false" loadingText="搜索中" placeholder=""  noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
                    </FormItem>
                    <FormItem label="属性值" prop="value">
                        <Input v-model="form.value" clearable></Input>
                    </FormItem>
                    <FormItem label="属性名" prop="name">
                        <Input v-model="form.name" clearable></Input>
                    </FormItem>
                    <FormItem label="备注说明" prop="comment">
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
    created() {},
    data() {
        return {
            formControlData: {
                lsDictIndex: [],
                parentValue: null,
            },
            dialog: false,
            form: {
                code: null,
                parentValue: null,
                value: null,
                name: null,
                comment: null,
            },
            validate: {
                code: [
                    {
                        required: true,
                        message: "请选择字典类别编号",
                        trigger: "blur"
                    }
                ],
                value: [
                    {
                        required: true,
                        message: "请输入属性值",
                        trigger: "blur"
                    },
                    {
                        max: 32,
                        message: "属性值最大长度为32位",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入属性名",
                        trigger: "blur"
                    },
                    {
                        max: 32,
                        message: "字典类别名称最大长度为32位",
                        trigger: "blur"
                    }
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
        load(dialog) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.dictIndex.listKeyValue)
                .then(res => {
                    this.formControlData.lsDictIndex = res;
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
                        .post(this.globalActionUrl.dictIndex.save, this.form)
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
        },
        loadParentValue({ action, parentNode, callback }) {
            this.axios
                .get(this.globalActionUrl.menu.listByPid, {
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
