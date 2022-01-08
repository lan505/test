<template>
    <div>
        <Modal v-model="dialog" title="用户详情" :width="800" :mask-closable="false">
            <div class="form scroll">
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">账号</Col>
                    <Col span="20">{{form.userAccount}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">名称</Col>
                    <Col span="20">{{form.userName}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">身份证号</Col>
                    <Col span="20">{{form.userIdentity}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">手机号码</Col>
                    <Col span="20">{{form.userMobile}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">性别</Col>
                    <Col span="20">{{form.userSex}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">所属角色</Col>
                    <Col span="20">{{form.lsRoleName == null ? null : form.lsRoleName.join("、")}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">出生年月</Col>
                    <Col span="20">{{form.userBirthday}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">地址</Col>
                    <Col span="20">{{form.userAddress}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">备注说明</Col>
                    <Col span="20">{{form.comment}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">创建人员</Col>
                    <Col span="20">{{form.creatorCn}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">创建时间</Col>
                    <Col span="20">{{form.createTime}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">编辑人员</Col>
                    <Col span="20">{{form.editorCn}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">编辑时间</Col>
                    <Col span="20">{{form.editTime}}</Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { userDetail } from "@/assets/js/api/requestSystem";
export default {
    created() {},
    data() {
        return {
            dialog: false,
            form: {
                userAccount: null,
                userName: null,
                avatar: null,
                userIdentity: null,
                userMobile: null,
                userSex: null,
                lsRoleName: null,
                userBirthday: null,
                userAddress: null,
                usageStatus: null,
                comment: null,
                creator: null,
                createTime: null,
                editor: null,
                editTime: null,
            },
        };
    },
    methods: {
        load(userId) {
            this.dialog = true;
            userDetail({ userId }).then((res) => {
                this.form = res;
            });
        },
        close() {
            this.dialog = false;
        },
    },
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
}
</style>
