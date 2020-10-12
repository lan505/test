<template>
    <div>
        <Modal :width="600" v-model="dialog" :z-index="0" title="图片裁剪" :mask-closable="false">
            <div class="avatar-layout">
                <div class="cropper-box">
                    <vueCropper ref="cropper" mode="contain" :img="imgUrl" :autoCrop="true" :canMove="false" :canScale="false" :fixed="true"></vueCropper>
                </div>
                <div class="cropper-box">
                    <Upload ref="upload" action="" :before-upload="upload" :show-upload-list="false">
                        <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </div>
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
            dialog: false,
            uploadFile: null,
            imgUrl: null,
            limit: {
                size: 512,
                format: ["jpg", "jpeg", "png"],
                img: null
            }
        };
    },
    methods: {
        upload(file) {
            this.uploadFile = file;
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
                this.imgUrl = fileReader.result;
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
            this.imgUrl = null;
            this.dialog = false;
            this.$emit('close');
        },
        save() {
            if (!this.uploadFile) {
                this.$Message.info("请上传图片");
                return;
            }
            this.$refs.cropper.getCropBlob(data => {
                this.$emit('confirm', data);
                this.dialog = false;
            });
        }
    }
};
</script>

<style scoped>
.user-center {
    width: 100%;
    height: 100%;
}
.userAvatar-box {
    width: 100%;
    margin-left: 80px;
    margin-bottom: 20px;
}
.base-info {
    width: 400px;
}
.avatar-layout {
    display: flex;
    justify-content: space-around;
}
.cropper-box {
    width: 250px;
    height: 250px;
}
</style>
