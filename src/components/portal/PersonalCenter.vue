<template>
    <Card>
        <div>
            <div class="user-center">
                <h2>基本信息</h2>
                <br>
                <div class="userAvatar-box">
                    <Avatar :src="this.$store.state.user.loginInfo.userAvatar" size="100" />
                </div>
                <div class="userAvatar-box">
                    <Button @click="openAvatarForm()">修改头像</Button>
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
                <LxCropper ref="lxCropper" @confirm="confirmAvatarForm"></LxCropper>
                <PasswordForm ref="passwordForm" @confirm="confirmPasswordForm"></PasswordForm>
            </div>
        </div>
    </Card>
</template>
<script>
import qs from "qs";
import { INIT_USER_LOGIN_INFO } from "../../assets/js/global/globalMutationType";
import {
    userInfo,
    changeUserPassword,
    uploadUserAvatar
} from "@/assets/js/api/requestSystem";
import PasswordForm from "./PasswordForm.vue";
export default {
    created() { },
    data() {
        return {

        };
    },
    methods: {
        // 重新加载用户信息
        reloadUserLoginInfo() {
            userInfo()
                .then(res => {
                    this.$store.commit(INIT_USER_LOGIN_INFO, res);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 打开头像裁剪
        openAvatarForm() {
            this.$refs.lxCropper.dialog = true;
        },
        // 确认头像裁剪
        confirmAvatarForm(data) {
            console.log("确认");
            let param = new FormData();
            param.append("file", data);
            uploadUserAvatar(param).then(res => {
                this.reloadUserLoginInfo();
                this.$Message.success("上传成功");
            });
        },
        // 打开修改密码
        openPasswordForm() {
            this.$refs.passwordForm.dialog = true;
        },
        // 确认修改密码
        confirmPasswordForm(data) {
            changeUserPassword(data)
                .then(res => {
                    this.$refs.passwordForm.close();
                    this.$Message.success("密码修改成功");
                })
                .catch(error => {

                });
        }
    },
    components: {
        PasswordForm
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
