<template>
    <div>
        <div class="user-center">
            <h2>基本信息</h2>
            <br>
            <div class="userAvatar-box">
                <Avatar :src="this.$store.state.user.loginInfo.userAvatar" size="100"/>
            </div>
            <div class="userAvatar-box">
                <Button @click="openUploadAvatarForm()">修改头像</Button>
                <Button @click="openPasswordForm()">修改密码</Button>
            </div>
            <br>
            <div class="base-info">
                <Form :label-width="100">
                    <FormItem label="账号">
                        <span>{{this.$store.state.user.loginInfo.userAccount}}</span>
                    </FormItem>
                    <FormItem label="名称">
                        <span>{{this.$store.state.user.loginInfo.userName}}</span>
                    </FormItem>
                    <FormItem label="手机">
                        <span>{{this.$store.state.user.loginInfo.userMobile}}</span>
                    </FormItem>
                    <FormItem label="性别">
                        <span>{{this.$store.state.user.loginInfo.userSex}}</span>
                    </FormItem>
                    <FormItem label="邮箱">
                        <span>{{this.$store.state.user.loginInfo.userEmail}}</span>
                    </FormItem>
                    <FormItem label="出生年月">
                        <span>{{this.$store.state.user.loginInfo.userBirthday}}</span>
                    </FormItem>
                    <FormItem label="身份证号">
                        <span>{{this.$store.state.user.loginInfo.userIdentity}}</span>
                    </FormItem>
                </Form>
            </div>
            <Modal :width="600" v-model="uploadAvatarForm.dialog" :z-index="0" title="头像裁剪" :mask-closable="false">
                <div class="avatar-layout">
                    <div class="cropper-box">
                        <vueCropper ref="cropper" mode="contain" :img="uploadAvatarForm.upload.img" :autoCrop="true" :canMove="false" :canScale="false" :fixed="true"></vueCropper>
                    </div>
                    <div class="cropper-box">
                        <Upload 
                            ref="upload"
                            action=""
                            :before-upload="selectPicture"
                            :show-upload-list="false"
                        >
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="text" size="large" @click="closeUploadAvatarForm">取消</Button>
                    <Button type="primary" size="large" @click="saveUploadAvatarForm">保存</Button>
                </div>
            </Modal>
            <Modal v-model="passwordForm.dialog" :z-index="0" title="修改密码" :mask-closable="false">
                <Form ref="form" :model="passwordForm.form" :label-width="80" :rules="validate">
                    <FormItem label="原密码" prop="oldPassword">
                        <Input v-model="passwordForm.form.oldPassword" type="password" clearable></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="newPassword">
                        <Input v-model="passwordForm.form.newPassword" type="password" clearable></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="reNewPassword">
                        <Input v-model="passwordForm.form.reNewPassword" type="password" clearable></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" size="large" @click="closePasswordForm">取消</Button>
                    <Button type="primary" size="large" @click="savePasswordForm">保存</Button>
                </div>
            </Modal>
        </div>
    </div>
    
</template>
<script>
import qs from "qs";
import { INIT_USER_LOGIN_INFO } from "../../assets/js/global/globalMutationType";
export default {
  created() {},
  data() {
    return {
      uploadAvatarForm: {
        dialog: false,
        upload: {
          size: 512,
          format: ["jpg", "jpeg", "png"],
          img: null,
        },
        form: {
          file: null,
          name: null,
        }
      },
      passwordForm: {
        dialog: false,
        form: {
          userPassword: null,
          newPassword: null,
          reNewPassword: null
        }
      },
      validate: {
        oldPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            max: 32,
            message: "原密码长度为6-32位",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            max: 32,
            message: "新密码长度为6-32位",
            trigger: "blur"
          }
        ],
        reNewPassword: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            max: 32,
            message: "确认密码长度为6-32位",
            trigger: "blur"
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value !== this.passwordForm.form.newPassword) {
                callback(new Error("两次密码不一致!"));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    reloadUserLoginInfo() {
      this.axios
        .get(this.globalActionUrl.system.user.getLoginUserInfo)
        .then(res => {
          this.$store.commit(INIT_USER_LOGIN_INFO, res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectPicture(file) {
      this.uploadAvatarForm.form.file = file;
      if (this.checkFileIsImage(file)) {
        this.$Message.info(
          "上传文件支持格式为" + this.uploadAvatarForm.upload.format
        );
        return false;
      }
      if (this.checkFileSize(file)) {
        this.$Message.info(
          "上传文件大小不超过" + this.uploadAvatarForm.upload.size + "KB"
        );
        return false;
      }
      let _that = this;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function(e) {
        _that.uploadAvatarForm.upload.img = e.target.result;
      };
      return false;
    },
    checkFileIsImage(file) {
      return file.type.indexOf("image/") == -1;
    },
    checkFileSize(file) {
      return file.size > this.uploadAvatarForm.upload.size * 1024;
    },
    openUploadAvatarForm() {
      this.uploadAvatarForm.dialog = true;
    },
    closeUploadAvatarForm() {
      this.uploadAvatarForm.dialog = false;
      this.clearUploadAvatarForm();
    },
    clearUploadAvatarForm() {
      this.uploadAvatarForm.upload.img = null;
      Object.keys(this.uploadAvatarForm.form).forEach(key => this.uploadAvatarForm.form[key] = null);
    },
    saveUploadAvatarForm() {
      if (!this.uploadAvatarForm.form.file) {
        this.$Message.info("请上传图片");
        return;
      }
      this.$refs.cropper.getCropBlob(data => {
        let file = new File([data], this.uploadAvatarForm.form.file.name, {
          type: this.uploadAvatarForm.form.file
        });
        let param = new FormData();
        param.append("file", file);
        this.axios
          .post(this.globalActionUrl.system.user.uploadAvatar, param, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            this.reloadUserLoginInfo();
            this.closeUploadAvatarForm();
            this.$Message.success("上传成功");
          });
      });
    },
    openPasswordForm() {
      this.passwordForm.dialog = true;
    },
    closePasswordForm() {
      this.passwordForm.dialog = false;
      this.$refs.form.resetFields();
    },
    savePasswordForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(111);
          this.axios
            .post(
              this.globalActionUrl.system.user.editPassword,
              this.passwordForm.form
            )
            .then(res => {
              console.log(222);
              console.log(res);
              this.closePasswordForm();
              this.$Message.success("密码修改成功");
            })
            .catch(error => {
              console.log(444);
              console.log(error);
            });
          console.log(333);
        }
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
