<template>
    <div class="loginBg">
        <div class="loginInfo">
            <Form class="loginForm" ref="loginForm" :model="loginForm" :rules="ruleValidate">
                <div class="title">LXCM可视化管理系统</div>
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
import { USER_INFO } from "../../assets/js/global/globalMutationType";
export default {
    data() {
        return {
            loading: false,
            loginForm: {
                username: "100001",
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
                        min: 6,
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
                    this.axios
                        .post(this.globalActionUrl.user.login, qs.stringify(this.loginForm), {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        })
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
    background-color: #2d3a4b;
    overflow: hidden;
}
.title {
    color: #ffffff;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
}
.loginInfo {
    width: 500px;
    height: 250px;
    margin: auto;
    margin-top: 100px;
    border-radius: 4px;
    padding: 40px;
}
</style>
