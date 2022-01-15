<template>
    <div>
        <Modal :width="600" v-model="dialog" :z-index="0" title="图片裁剪" :mask-closable="false">
            <div class="avatar-layout">
                <div class="cropper-box">
                    <div class="cropper-img">
                        <VueCropper ref="cropper" :img="option.img" :autoCrop="option.autoCrop" :canMove="option.canMove" :canScale="option.canScale" :fixed="option.fixed" :fixedBox="option.fixedBox" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" @realTime="realTime"></VueCropper>
                    </div>
                    <div class="cropper-btn">
                        <Button @click="realTime">放大</Button>
                        <Button @click="realTime">缩小</Button>
                        <Button @click="rotateLeft">左转</Button>
                        <Button @click="rotateRight">右转</Button>
                    </div>
                </div>
                <div class="cropper-preview">
                    <div class="show-preview" :style="{'width': '80px', 'height':'80px',  'overflow': 'hidden', 'margin': '5px'}">
                        <div :style="previews.div" class="preview">
                            <img :src="previews.url" :style="previews.img">
                        </div>
                    </div>
                    <div class="upload-btn">
                        <Upload ref="upload" action="" :before-upload="upload" :show-upload-list="false">
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
                <Button type="text" size="large" @click="save">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            dialog: false,
            // 原始图片
            originFile: null,
            // 剪切图片上传
            previews: {},
            // 选项设置
            option: {
                img: null,
                // 是否默认生成截图框
                autoCrop: true,
                // 移动
                canMove: false,
                // 缩放
                canScale: true,
                // 是否开启截图框宽高固定比例
                fixed: true,
                // 固定截图框大小不能改变
                fixedBox: true,
                // 默认生成截图框的宽度
                autoCropWidth: 80,
                // 默认生成截图框的度
                autoCropHeight: 80,
            },
            limit: {
                size: 512,
                format: ["jpg", "jpeg", "png"],
                img: null,
            },
        };
    },
    methods: {
        upload(file) {
            this.originFile = file;
            if (this.checkFileIsImage(file)) {
                this.$Message.info("上传文件支持格式为" + this.limit.format);
                return false;
            }
            if (this.checkFileSize(file)) {
                this.$Message.info(
                    "上传文件大小不超过" + this.limit.size + "KB"
                );
                return false;
            }
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                this.option.img = fileReader.result;
            };
            return false;
        },
        checkFileIsImage(file) {
            return file.type.indexOf("image/") == -1;
        },
        checkFileSize(file) {
            return file.size > this.limit.size * 1024;
        },
        close() {
            this.option.img = null;
            this.dialog = false;
            this.$emit("close");
        },
        save() {
            if (!this.originFile) {
                this.$Message.info("请上传图片");
                return;
            }
            this.$refs.cropper.getCropBlob((data) => {
                var file = new File([data], this.originFile.name, {
                    type: this.originFile.type,
                });
                this.$emit("confirm", file);
                this.dialog = false;
            });
        },
        // 左旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        // 右旋转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        // 实时预览
        realTime(data) {
            this.previews = data;
        },
    },
};
</script>

<style scoped>
.avatar-layout {
    height: 300px;
    display: flex;
    justify-content: space-around;
}
.cropper-box {
    width: 300px;
    height: 300px;
}
.cropper-img {
    width: 300px;
    height: 250px;
}
.cropper-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
.cropper-preview {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 300px;
    height: 300px;
}
.cropper-preview .preview {
    overflow: hidden;
    width: 80px;
    height: 80px;
    border: 1px solid red;
}
.upload-btn {
    margin-top: 20px;
}
</style>
