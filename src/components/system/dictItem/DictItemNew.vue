<template>
    <div>
        <Modal v-model="dialog" title="字典值新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="字典类别" prop="dictItemCode">
                        <LxSelect :value.sync="form.dictItemCode" :url="this.globalActionUrl.system.dictItem.listDictIndexCode"></LxSelect>
                    </FormItem>
                    <FormItem label="父属性编号" prop="dictItemParentKey">
                        <Treeselect v-model="form.dictItemParentKey" :options="formControlData.dictItemParentKey" :loadOptions="loadParentKey" :autoLoadRootPptions="false" loadingText="搜索中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
                    </FormItem>
                    <FormItem label="属性编号" prop="dictItemKey">
                        <Input v-model="form.dictItemKey" clearable></Input>
                    </FormItem>
                    <FormItem label="属性值" prop="dictItemValue">
                        <Input v-model="form.dictItemValue" clearable></Input>
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
import {
    dictItemNew,
    existsUserAccount,
    existsUserName
} from "@/assets/js/global/systemModuleApi";
export default {
    created() {},
    data() {
        return {
            formControlData: {
                lsDictIndex: [],
                dictItemParentKey: null,
            },
            dialog: false,
            form: {
                dictItemCode: null,
                dictItemParentKey: null,
                dictItemKey: null,
                dictItemName: null,
                comment: null,
            },
            validate: {
                dictItemCode: [
                    {
                        required: true,
                        message: "请选择字典类别编号",
                        trigger: "blur",
                    },
                ],
                dictItemParentKey: [
                    {
                        message: "请选择属性值",
                        trigger: "blur",
                    },
                ],
                dictItemValue: [
                    {
                        required: true,
                        message: "请输入字典值",
                        trigger: "blur",
                    },
                    {
                        max: 32,
                        message: "字典值最大长度为32位",
                        trigger: "blur",
                    },
                ],
                comment: [
                    {
                        type: "string",
                        max: 512,
                        message: "备注说明最大长度为512个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        load() {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.system.dictIndex.listKeyValue)
                .then((res) => {
                    this.formControlData.lsDictIndex = res;
                });
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.axios
                        .post(
                            this.globalActionUrl.system.dictItem.save,
                            this.form
                        )
                        .then((res) => {
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
        loadParentKey({ action, parentNode, callback }) {
            this.axios
                .get(this.globalActionUrl.system.dictItem.listByPid, {
                    params: {
                        pid: parentNode == null ? null : parentNode.id,
                    },
                })
                .then((res) => {
                    if (action === "LOAD_ROOT_OPTIONS") {
                        this.formControlData.dictItemParentKey = this.normalizerPid(
                            res
                        );
                    } else if (action === "LOAD_CHILDREN_OPTIONS") {
                        parentNode.children = this.normalizerPid(res);
                    }
                    callback();
                });
        },
        normalizerPid(node) {
            return node.map((item) => {
                let node = {};
                node.id = item.id;
                node.label = item.title;
                node.children = item.children == null ? null : item.children;
                return node;
            });
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