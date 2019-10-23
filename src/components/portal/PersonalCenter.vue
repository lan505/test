<template>
    <div class="user-center">
        <h2>基本信息</h2>
        <div class="avatar-box">
            <img :src="loginInfo.avatar" width="80" height="80" style="background-color: white;" />
        </div>
        <div class="base-info">
            <Form :label-width="100">
                <FormItem label="用户名称">
                    <span>{{baseInfo.name}}</span>
                </FormItem>
                <FormItem label="手机">
                    <span>{{baseInfo.mobile}}</span>
                </FormItem>
                <FormItem label="性别">
                    <span>{{baseInfo.sexCn}}</span>
                </FormItem>
                <FormItem label="邮箱">
                    <span>{{baseInfo.email}}</span>
                </FormItem>
                <FormItem label="出生年月">
                    <span>{{baseInfo.birthday}}</span>
                </FormItem>
                <FormItem label="身份证号">
                    <span>{{baseInfo.identity}}</span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginInfo: {
                avatar: require("../../assets/images/default-user.png"),
                account: null,
                name: null
            },
            baseInfo: {
                name: "张三",
                mobile: "18231164547",
                sexCn: "男",
                email: "522146995@qq.com",
                birthday: "2019-01-13",
                identity: "452127199203102114",
            }
        };
    },
    created() {},
    methods: {}
};
</script>
<style scoped>
.user-center {
    width: 100%;
    height: 100%;
    margin: auto;
}
.avatar-box {
    width: 100%;
    margin-left: 80px;
}
.base-info {
    width: 400px;
}
</style>
