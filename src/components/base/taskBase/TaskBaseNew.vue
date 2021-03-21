<template>
    <div style="height: 200px;">
        <Modal v-model="dialog" title="任务新增" :width="500" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form upload-box">
                <div>
                    <div>1、请按照模板格式填写需要导入的数据</div>
                    <div>2、仅支持Excel文件导入，<a href="#" @click="download">点击下载Excel模板</a></div>
                    <div>3、仅支持最大10000行数据</div>
                </div>
                <br />
                <Upload type="drag" action="" :before-upload="beforeUpload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>将文件拖到此处，或点击上传</p>
                    </div>
                </Upload>
                <ul class="ivu-upload-list">
                    <li v-if="form.file !== null" class="ivu-upload-list-file ivu-upload-list-file-finish">
                        <span>
                            <Icon type="md-document" /> {{ form.file.name }}
                        </span>
                        <span class="remove-button">
                            <Icon type="md-close" @click.native="initUpload" />
                        </span>
                    </li>
                </ul>
                <div class="error-massge">{{form.fileErrorMessage}}</div>
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
        },
        save() {
            if (this.form.file != null) {
                let formData = new FormData();
                formData.append("file", this.form.file);
                save(formData).then((res) => {
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
.form {
    padding-right: 15px;
}
.upload-box {
    height: 300px;
}
.file-list {
    color: #2d8cf0;
}
.remove-button {
    float: right;
}
.error-massge {
    color: #ed4014;
}
</style>
