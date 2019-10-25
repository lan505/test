<template>
    <div>
        <Modal v-model="dialog" title="字典类别详情" :mask-closable="false">
            <div class="form scroll">
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">字典类别编号</Col>
                    <Col span="20">{{form.code}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">字典类别名称</Col>
                    <Col span="20">{{form.name}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">字典类别总数</Col>
                    <Col span="20">{{form.subNum}}</Col>
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
                id: null,
                code: null,
                name: null,
                subNum: null,
                comment: null,
                creator: null,
                createTime: null,
                editor: null,
                editTime: null,
            }
        };
    },
    methods: {
        load(id) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.dictIndex.detail, { params: { id } })
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
