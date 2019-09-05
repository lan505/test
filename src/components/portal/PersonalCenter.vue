<template>
    <div class="user-center">
        <div class="avatar-box">
            <img :src="loginInfo.avatar" width="80" height="80" style="background-color: white;">
        </div>
        <div class="avatar-upload">
            <Button type="primary">修改头像</Button>
        </div>
        <br>
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
        };
    },
    created() {},
    methods: {}
};
</script>
<style scoped>
.user-center {
    width: 100%;
    margin: auto;
}
.avatar-box {
    width: 100%;
    text-align: center;
}
.avatar-upload {
    width: 100%;
    text-align: center;
}
</style>
