<template>
    <div>
        <Modal v-model="dialog" title="字典类别新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="110" :rules="validate">
                    <FormItem label="字典类别编号" prop="dictIndexCode">
                        <Input v-model="form.dictIndexCode" clearable></Input>
                    </FormItem>
                    <FormItem label="字典类别名称" prop="dictIndexName">
                        <Input v-model="form.dictIndexName" clearable></Input>
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
    dictIndexNew,
    existsDictIndexCode,
    existsDictIndexName,
} from "@/assets/js/api/systemModuleApi";
export default {
    created() {},
    data() {
        return {
            formControlData: {},
            dialog: false,
            form: {
                dictIndexCode: null,
                dictIndexName: null,
                comment: null,
            },
            validate: {
                dictIndexCode: [
                    {
                        required: true,
                        message: "请输入字典类别编号",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyDictIndexCode(rule, value, callback);
                        },
                    },
                ],
                dictIndexName: [
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
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyDictIndexName(rule, value, callback);
                        },
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
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                     dictIndexNew(this.form).then((res) => {
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
        verifyDictIndexCode(rule, value, callback) {
            if (value != null) {
                existsDictIndexCode({
                    dictIndexCode: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("字典类编号已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyDictIndexName(rule, value, callback) {
            if (value != null) {
                existsDictIndexName({
                    dictIndexName: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("字典类名称已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
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