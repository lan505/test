<template>
    <div>
        <Modal v-model="dialog" title="角色详情" :mask-closable="false">
            <div class="form scroll">
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">角色编号</Col>
                    <Col span="20">{{form.code}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">角色名称</Col>
                    <Col span="20">{{form.name}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">备注说明</Col>
                    <Col span="20">{{form.comment}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">创建人员</Col>
                    <Col span="20">{{form.creator}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">创建时间</Col>
                    <Col span="20">{{form.createTime}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">编辑人员</Col>
                    <Col span="20">{{form.editor}}</Col>
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
export default {
    created() {},
    data() {
        return {
            dialog: false,
            form: {
                name: null,
                code: null,
                comment: null,
                creator: null,
                createTime: null,
                editor: null,
                editTime: null,
            }
        };
    },
    methods: {
        load(roleId) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.role.detail, { params: { roleId } })
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
