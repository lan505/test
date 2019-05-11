<template>
    <div>
        <Modal v-model="dialog" title="系统角色详情" :mask-closable="false">
            <div class="form scroll">
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">名称</Col>
                    <Col span="20">{{form.name}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">编号</Col>
                    <Col span="20">{{form.code}}</Col>
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
                name: "",
                code: "",
                comment: ""
            }
        };
    },
    methods: {
        load(id) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.roleDetail, { params: { id } })
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
