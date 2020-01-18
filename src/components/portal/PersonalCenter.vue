<template>
    <div class="user-center">
        <h2>基本信息</h2>
        <br>
        <div class="userAvatar-box">
            <Avatar :src="baseInfo.userAvatar" size="100"/>
            
        </div>
        <br>
        <div class="base-info">
            <Form :label-width="100">
                <FormItem label="账号">
                    <span>{{baseInfo.userAccount}}</span>
                </FormItem>
                <FormItem label="名称">
                    <span>{{baseInfo.userName}}</span>
                </FormItem>
                <FormItem label="手机">
                    <span>{{baseInfo.userMobile}}</span>
                </FormItem>
                <FormItem label="性别">
                    <span>{{baseInfo.userSex}}</span>
                </FormItem>
                <FormItem label="邮箱">
                    <span>{{baseInfo.userEmail}}</span>
                </FormItem>
                <FormItem label="出生年月">
                    <span>{{baseInfo.userBirthday}}</span>
                </FormItem>
                <FormItem label="身份证号">
                    <span>{{baseInfo.userIdentity}}</span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { USER_INFO } from '../../assets/js/global/globalMutationType';
export default {
    data() {
        return {
            baseInfo: {
                userAvatar: null,
                userAccount: null,
                userName: null,
                userMobile: null,
                userSex: null,
                userEmail: null,
                userBirthday: null,
                userIdentity: null,
            }
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            this.baseInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            this.baseInfo.userAvatar = this.baseInfo.userAvatar || require("../../assets/images/default-user.png");
            // this.axios
            //     .get(this.globalActionUrl.user.detail, {
            //         params: {
            //             id: id
            //         }
            //     })
            //     .then(res => {
            //         this.menuTreeData = res;
            //     });
        }
    }
};
</script>
<style scoped>
.user-center {
    width: 100%;
    height: 100%;
    margin: auto;
}
.userAvatar-box {
    width: 100%;
    margin-left: 80px;
}

.base-info {
    width: 400px;
}
</style>
