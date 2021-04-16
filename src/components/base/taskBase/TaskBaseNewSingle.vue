<template>
    <div>
        <div class="single">
            <Input search enter-button="开始识别" placeholder="" />
        </div>
    </div>
</template>
<script>
import {
    downloadTemplate,
    saveBatch,
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
                // 文件对象
                file: null,
                // 文件大小（MB）
                fileMaxSize: 3,
                // 文件格式
                fileFormat: ["xls", "xlsx"],
                // 文件错误信息
                fileErrorMessage: null,
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
            this.initUpload();
        },
        save() {
            if (this.form.file != null) {
                let formData = new FormData();
                formData.append("file", this.form.file);
                saveBatch(formData).then((res) => {
                    this.close();
                    this.$emit("loadList");
                    this.initUpload();
                    this.$Message.success("提交成功");
                });
            } else {
                this.form.fileErrorMessage = "请选择文件";
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
            this.initUpload();
            let format = this.onFormatError(file);
            let size = this.onSizeError(file);
            if (!format && !size) {
                this.form.file = file;
            }
            return false;
        },
        // 下载模板
        download() {
            downloadTemplate();
        },
        // 上传格式错误
        onFormatError(file) {
            var index = file.name.lastIndexOf(".");
            var ext = file.name.substr(index + 1);
            if (this.form.fileFormat.indexOf(ext) < 0) {
                this.form.fileErrorMessage = `仅支持文件格式：${this.form.fileFormat}`;
                return true;
            }
            return false;
        },
        // 上传大小错误
        onSizeError(file) {
            // 文件大小MB
            let fileSize = file.size / 1024 / 1024;
            if (fileSize > this.form.fileMaxSize) {
                this.form.fileErrorMessage = `仅支持文件大小为${this.form.fileMaxSize}M`;
                return true;
            }
            return false;
        },
        // 重置上传
        initUpload() {
            this.form.file = null;
            this.form.fileErrorMessage = null;
        },
    },
    components: {},
};
</script>
<style scorep>
.single {
    width: 400px;
}
</style>
