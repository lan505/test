<template>
    <div>
        <Modal v-model="dialog" title="菜单编辑" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="父级菜单" prop="treeParentId">
                        <Treeselect v-model="form.treeParentId" :options="formControlData.treeParent" :normalizer="normalizerTreeMenuParent" :autoLoadRootOptions="false" loadingText="搜索中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
                    </FormItem>
                    <FormItem label="菜单名称" prop="menuName">
                        <Input v-model="form.menuName" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单URL" prop="menuUrl">
                        <Input v-model="form.menuUrl" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单路由" prop="menuRouter">
                        <Input v-model="form.menuRouter" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单图标" prop="menuIcon">
                        <Input v-model="form.menuIcon" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单类型" prop="menuType">
                        <LxRadio :value.sync="form.menuType" :data="formControlData.menuType"></LxRadio>
                    </FormItem>
                    <FormItem label="菜单排序" prop="menuSort">
                        <Input v-model.number="form.menuSort" clearable></Input>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 10}"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {
    menuEdit,
    menuDetail,
    listMenuType,
    listTreeNode,
    existsMenuName,
    existsMenuUrl,
    existsMenuRouter,
} from "@/assets/js/global/systemModuleApi";
export default {
    created() {},
    data() {
        return {
            formControlData: {
                menuType: null,
                treeParent: null,
            },
            dialog: false,
            form: {
                id: null,
                menuName: null,
                menuParentId: null,
                menuUrl: null,
                menuRouter: null,
                menuIcon: null,
                menuType: null,
                menuSort: null,
                comment: null,
            },
            validate: {
                menuName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "菜单名称长度为1-3位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyMenuName(rule, value, callback);
                        },
                    },
                ],
                menuRouter: [
                    {
                        max: 32,
                        message: "菜单路由长度为32位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyMenuRouter(rule, value, callback);
                        },
                    },
                ],
                menuUrl: [
                    {
                        required: true,
                        message: "请输入菜单URL",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "菜单地url长度为1-32位",
                        trigger: "blur",
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyMenuUrl(rule, value, callback);
                        },
                    },
                ],
                menuIcon: [
                    {
                        min: 1,
                        max: 32,
                        message: "菜单图标长度为1-32位",
                        trigger: "blur",
                    },
                ],
                menuType: [
                    {
                        required: true,
                        type: "number",
                        message: "请选择菜单类型",
                        trigger: "change",
                    },
                ],
                menuSort: [
                    {
                        type: "number",
                        message: "请输入数字",
                        trigger: "blur",
                    },
                ],
                comment: [
                    {
                        max: 512,
                        message: "备注最大长度为512个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        load(menuId) {
            this.dialog = true;
            this.loadMenuDetail(menuId);
            this.loadMenuType();
            this.loadTreeMenuParent();
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    menuEdit(this.form).then((res) => {
                        this.close();
                        this.$emit("loadList");
                        this.$Message.success("提交成功");
                    });
                }
            });
        },
        loadMenuDetail(menuId) {
            menuDetail({ menuId }).then((res) => {
                this.form = res;
            });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        loadMenuType() {
            listMenuType().then((res) => {
                this.formControlData.menuType = res;
            });
        },
        loadTreeMenuParent() {
            listTreeNode().then((res) => {
                this.formControlData.treeParent = res;
            });
        },
        normalizerTreeMenuParent(node) {
            return {
                id: node.id,
                label: node.title,
                children: node.children,
            };
        },
        verifyMenuName(rule, value, callback) {
            if (value != null) {
                existsMenuName({
                    menuId: this.form.menuId,
                    menuName: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("菜单名称已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyMenuUrl(rule, value, callback) {
            if (value != null) {
                existsMenuUrl({
                    menuId: this.form.menuId,
                    menuUrl: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("菜单url已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyMenuRouter(rule, value, callback) {
            if (value != null) {
                existsMenuRouter({
                    menuId: this.form.menuId,
                    menuRouter: value,
                }).then((res) => {
                    if (res) {
                        callback(new Error("菜单路由已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
    },
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    padding-right: 15px;
}
</style>