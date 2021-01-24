<template>
    <div>
        <Modal v-model="dialog" title="任务新增" :width="700" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form upload-box">
                <Upload type="drag" action="" :before-upload="beforeUpload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>将文件拖到此处，或点击上传</p>
                    </div>
                </Upload>
                <a href="#" @click="download">点击下载Excel模板</a>
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
    taskBaseNew,
    downloadTemplate,
    save,
    existsTaskBaseName,
} from "@/assets/js/api/baseModuleApi";
export default {
    created() {},
    mounted() {},
    data() {
        return {
            formControlData: {
                taskBaseEnableStatus: [
                    {
                        key: 1,
                        value: "启用",
                    },
                    {
                        key: 0,
                        value: "禁用",
                    },
                ],
            },
            dialog: false,
            form: {
                file: null,
            },
            validate: {
                taskBaseName: [
                    {
                        required: true,
                        message: "请输入规则名称",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        max: 64,
                        message: "账号长度为64位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (task, value, callback) => {
                            this.verifyTaskBaseName(task, value, callback);
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
            this.dialog = false;
        },
        save() {
            if (this.form.file != null) {
                let formData = new FormData();  
                formData.append("file", this.form.file);
                save(formData).then((res) => {
                    this.close();
                    this.$emit("loadList");
                    this.$Message.success("提交成功");
                });
            }
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        verifyTaskBaseName(task, value, callback) {
            if (value != null) {
                existsTaskBaseName({
                    taskBaseName: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("规则名称已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        // 上传文件
        beforeUpload(file) {
            this.form.file = file;
            return false;
        },
        download() {
            downloadTemplate();
        },
    },
    components: {},
};
</script>
<style scorep>
.form {
    padding-right: 15px;
}
.upload-box {
    height: 300px;
}
</style>
