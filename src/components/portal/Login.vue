<template>
    <div class="loginBg">
        <div class="title-form">
            <div class="title">{{globalConsts.system.title}}</div>
        </div>
        <div class="loginInfo">
            <Form class="loginForm" ref="loginForm" :model="loginForm" :rules="ruleValidate">
                <FormItem prop="username">
                    <Input v-model="loginForm.username" placeholder="用户名" size="large" prefix="md-person" autofocus clearable></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="loginForm.password" placeholder="密码" size="large" prefix="md-key" type="password" clearable></Input>
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
</template>

<script>
import qs from 'qs';
import { USER_INFO } from "@/assets/js/global/globalMutationType";
import globalConsts from "@/assets/js/global/globalConsts";
import { login } from "@/assets/js/api/systemModuleApi";
export default {
    data() {
        return {
            loading: false,
            loginForm: {
                username: "admin",
                password: "123456"
            },
            ruleValidate: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 4,
                        message: "用户名长度不能小于6位",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: "密码长度不能小于6位",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.loading = true;
                    login(this.loginForm)
                        .then(res => {
                            this.$router.push({
                                name: "content"
                            });
                        })
                        .catch(error => {
                            this.loading = false;
                        });
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBg {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    overflow: hidden;
}
.title-form {
    width: 700px;
    margin: auto;
    margin-top: 100px;
}
.title {
    color: #ffffff;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
}
.loginInfo {
    width: 500px;
    height: 250px;
    margin: auto;
    border-radius: 4px;
    padding: 40px;
}
</style>
