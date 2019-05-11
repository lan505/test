<template>
    <div>
        <Modal v-model="dialog" title="查看系统用户" :mask-closable="false">
            <div class="form scroll">
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">用户名</Col>
                    <Col span="20">{{form.account}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">名称</Col>
                    <Col span="20">{{form.name}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">身份证号</Col>
                    <Col span="20">{{form.identity}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">手机号码</Col>
                    <Col span="20">{{form.mobile}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">性别</Col>
                    <Col span="20">{{form.sex}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">出生年月</Col>
                    <Col span="20">{{form.birthday}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">地址</Col>
                    <Col span="20">{{form.address}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">备注</Col>
                    <Col span="20">{{form.comment}}</Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    created() {},
    data() {
        return {
            dialog: false,
            form: {
                account: "",
                name: "",
                password: "",
                sex: "",
                mobile: "",
                identity: "",
                address: "",
                birthday: "",
                comment: ""
            }
        };
    },
    methods: {
        load(id) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.userDetail, { params: { id } })
                .then(res => {
                    this.form = res;
                });
        },
        close() {
            this.dialog = false;
        }
    }
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
}
</style>
