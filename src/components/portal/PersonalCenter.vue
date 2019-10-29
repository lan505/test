<template>
    <div class="user-center">
        <h2>基本信息</h2>
        <br>
        <div class="avatar-box">
            <Avatar :src="baseInfo.avatar" size="100"/>
            
        </div>
        <br>
        <div class="base-info">
            <Form :label-width="100">
                <FormItem label="账号">
                    <span>{{baseInfo.account}}</span>
                </FormItem>
                <FormItem label="名称">
                    <span>{{baseInfo.name}}</span>
                </FormItem>
                <FormItem label="手机">
                    <span>{{baseInfo.mobile}}</span>
                </FormItem>
                <FormItem label="性别">
                    <span>{{baseInfo.sex}}</span>
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
import { USER_INFO } from '../../assets/js/global/globalMutationType';
export default {
    data() {
        return {
            baseInfo: {
                avatar: null,
                account: null,
                name: null,
                mobile: null,
                sex: null,
                email: null,
                birthday: null,
                identity: null,
            }
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            this.baseInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
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
.avatar-box {
    width: 100%;
    margin-left: 80px;
}

.base-info {
    width: 400px;
}
</style>
