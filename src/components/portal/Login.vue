<template>
    <div class="page-bg" :style="{backgroundImage: 'url(' + backgroundImage + ')' }">
        <div class="login-info">
            <div class="login-title">{{globalConsts.system.title}}</div>
            <div class="login-form">
                <Form ref="loginForm" :model="loginForm" :rules="ruleValidate">
                    <FormItem prop="username">
                        <Input v-model="loginForm.username" placeholder="用户名" size="large" prefix="md-person" autofocus
                            clearable></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input v-model="loginForm.password" placeholder="密码" size="large" prefix="md-key"
                            type="password" clearable></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" :loading="loading" size="large" @click="handleSubmit('loginForm')" long>
                            <span v-if="!loading">登陆</span>
                            <span v-else>登陆中...</span>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import backgroundImage from "@/assets/images/bg.jpg";
import { login } from "@/assets/js/api/systemModuleApi";
export default {
    data() {
        return {
            loading: false,
            backgroundImage: backgroundImage,
            loginForm: {
                username: "admin",
                password: "123456",
            },
            ruleValidate: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 4,
                        message: "用户名长度不能小于6位",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        type: "string",
                        min: 6,
                        message: "密码长度不能小于6位",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    login(this.loginForm)
                        .then((res) => {
                            this.$router.push({
                                name: "content",
                            });
                        })
                        .catch((error) => {
                            this.loading = false;
                        });
                }
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.title-form {
    width: 700px;
    margin: auto;
    margin-top: 100px;
}
.login-title {
    color: #3a3a3a;
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    height: 60px;
    line-height: 60px;
}
.login-info {
    width: 430px;
    height: auto;
    margin: auto;
    margin-top: 10%;
    border-radius: 4px;
    padding: 30px;
    background-color: #ffffff;
}
.login-form {
    width: 100%;
    height: auto;
    margin-top: 20px;
}
</style>
