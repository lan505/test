<template>
    <div>
        <Modal v-model="dialog" title="菜单详情" :mask-closable="false">
            <div class="form scroll">
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">父级菜单</Col>
                    <Col span="20">{{form.pidCn}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">菜单名称</Col>
                    <Col span="20">{{form.name}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">菜单URL</Col>
                    <Col span="20">{{form.url}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">菜单路由</Col>
                    <Col span="20">{{form.router}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">菜单图标</Col>
                    <Col span="20">{{form.icon}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">下级数量</Col>
                    <Col span="20">{{form.subNum}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">菜单层级</Col>
                    <Col span="20">{{form.level}}</Col>
                </Row>
                <Row class="row-space" :gutter="16">
                    <Col span="4" class="col-right-aligen">菜单类型</Col>
                    <Col span="20">{{form.menuTypeCn}}</Col>
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
import { menuDetail } from "@/assets/js/api/requestSystem";
export default {
    created() {},
    data() {
        return {
            dialog: false,
            form: {
                pidCn: null,
                name: null,
                url: null,
                router: null,
                icon: null,
                menuTypeCn: null,
                subNum: null,
                path: null,
                level: null,
                comment: null,
                creator: null,
                createTime: null,
                editor: null,
                editTime: null,
            },
        };
    },
    methods: {
        load(menuId) {
            menuDetail({ menuId }).then((res) => {
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
