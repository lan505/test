<template>
    <div>
        <Modal v-model="dialog" title="字典项编辑" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form">
                <Form ref="form" :model="form" :label-width="110" :rules="validate">
                    <FormItem label="字典值" prop="dictItemKey">
                        <Input v-model="form.dictItemKey" clearable></Input>
                    </FormItem>
                    <FormItem label="字典项" prop="dictItemValue">
                        <Input v-model="form.dictItemValue" clearable></Input>
                    </FormItem>
                    <FormItem label="排序" prop="dictItemSort">
                        <InputNumber :min="0" v-model="form.dictItemSort" style="width: 100%;"></InputNumber>
                    </FormItem>
                    <FormItem label="备注说明" prop="comment">
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
    dictItemEdit,
    dictItemDetail,
    existsDictItemKey,
    existsDictItemValue,
} from "@/assets/js/api/systemModuleApi";
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
                dictIndexCode: null,
                treeParentId: null,
                dictItemValue: null,
                name: null,
                comment: null,
            },
            validate: {
                treeParentId: [
                    {
                        required: true,
                        message: "请输入字典类别名称",
                        trigger: "blur",
                    },
                    {
                        max: 32,
                        message: "字典类别名称最大长度为32位",
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
        load(dictItemId) {
            this.dialog = true;
            this.loadDictItemDetail(dictItemId);
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    dictItemEdit(this.form).then((res) => {
                        this.close();
                        this.$emit("loadList");
                        this.$Message.success("提交成功");
                        this.$refs.treeSelect.clear();
                    });
                }
            });
        },
        loadDictItemDetail(dictItemId) {
            dictItemDetail({ dictItemId }).then((res) => {
                this.form = res;
            });
        },
        verifyDictItemKey(rule, value, callback) {
            if (value != null) {
                existsDictItemKey({
                    dictItemId: this.form.dictItemId,
                    dictIndexCode: this.form.dictIndexCode,
                    dictItemKey: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("字典值已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyDictItemValue(rule, value, callback) {
            if (value != null) {
                existsDictItemValue({
                    dictItemId: this.form.dictItemId,
                    dictIndexCode: this.form.dictIndexCode,
                    dictItemValue: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("字典项已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
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