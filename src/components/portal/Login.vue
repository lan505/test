<template>
    <div class="loginBg">
        <div class="loginInfo">
            <Form class="loginForm" ref="loginForm" :model="loginForm" :rules="ruleValidate">
                <div class="title">{{globalConstant.systemTitle}}</div>
                <FormItem prop="username">
                    <Input v-model="loginForm.username" placeholder="用户名" size="large" prefix="md-person" autofocus clearable></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="loginForm.password" placeholder="密码" size="large" prefix="md-key" type="password" clearable></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" size="large" @click="handleSubmit()" long>
                        <span v-if="!loading">登陆</span>
                        <span v-else>登陆中...</span>
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import globalConstant from "../../assets/js/global/globalConstant";
import { USER_INFO } from "../../assets/js/global/globalMutationType";
export default {
    created() {
        var _this = this;
        document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
                _this.handleSubmit();
            }
        }
    },
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
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.axios
                        .post(this.globalActionUrl.user.login, this.loginForm, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        })
                        .then(res => {
                            this.$router.push({
                                path: "/content"
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
    color: #515a6e;
    text-align: center;
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 20px;
}
.loginInfo {
    width: 400px;
    height: 350px;
    margin: auto;
    margin-top: 10%;
    border-radius: 4px;
    padding: 40px;
    background-color: #f7f7f7;
}
</style>
