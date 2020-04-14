<template>
    <div>
        <Modal
            v-model="dialog"
            title="菜单编辑"
            :width="600"
            :mask-closable="false"
            @on-visible-change="visibleChange"
        >
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="父级菜单" prop="menuParentId">
                        <!-- <Treeselect v-model="form.menuParentId" :options="formControlData.menuParentId" :loadOptions="loadMenuParentTree" @open="openMenuParentTree" @close="closeMenuParentTree" :autoLoadRootOptions="false" loadingText="搜索中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" /> -->
                        <Treeselect v-model="form.menuParentId" :options="formControlData.menuParentTreeNode"/>
                    </FormItem>
                    <FormItem label="测试树" prop="menuName">
                        <LxTreeSelect :url="this.globalActionUrl.system.menu.test" multiple clearable></LxTreeSelect>
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
                        <LxRadio :value.sync="form.menuType" :url="this.globalActionUrl.system.menu.listMenuType"></LxRadio>
                    </FormItem>
                    <FormItem label="菜单排序" prop="menuSort">
                        <Input v-model.number="form.menuSort" clearable></Input>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input
                            v-model="form.comment"
                            type="textarea" maxlength="512" show-word-limit
                            :autosize="{minRows: 5, maxRows: 10}"
                        ></Input>
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
export default {
    created() {},
    data() {
        return {
            formControlData: {
                menuType: null,
                menuParentTreeNode: null,
                test: null,
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
                comment: null
            },
            validate: {
                menuName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "菜单名称长度为1-3位",
                        trigger: "blur"
                    }
                ],
                menuRouter: [
                    {
                        min: 1,
                        max: 32,
                        message: "菜单路由长度为1-32位",
                        trigger: "blur"
                    }
                ],
                menuUrl: [
                    {
                        required: true,
                        message: "请输入菜单URL",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "菜单地url长度为1-32位",
                        trigger: "blur"
                    }
                ],
                menuIcon: [
                    {
                        min: 1,
                        max: 32,
                        message: "菜单图标长度为1-32位",
                        trigger: "blur"
                    }
                ],
                menuType: [
                    {
                        required: true,
                        type: "number",
                        message: "请选择菜单类型",
                        trigger: "change"
                    }
                ],
                menuSort: [
                    {
                        type: "number",
                        message: "请输入数字",
                        trigger: "blur"
                    }
                ],
                comment: [
                    {
                        max: 512,
                        message: "备注最大长度为512个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        load(menuId) {
            this.dialog = true;
            this.axios
                .get(this.globalActionUrl.system.menu.edit, { params: { menuId } })
                .then(res => {
                    this.form = res;
                });
            this.initMenuType();
            this.initMenuParenTree();
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.axios
                        .post(this.globalActionUrl.system.menu.edit, this.form)
                        .then(res => {
                            this.close();
                            this.$emit("loadList");
                            this.$Message.success("提交成功");
                        });
                }
            });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        initMenuType() {
            this.axios
                .get(this.globalActionUrl.system.menu.listMenuType)
                .then(res => {
                    this.formControlData.menuType = res;
                });
        },
        // loadMenuParentTree({ action, parentNode, callback }) {
        //     this.axios
        //         .get(this.globalActionUrl.system.menu.listByPid, {
        //             params: {
        //                 pid: parentNode == null ? null : parentNode.id
        //             }
        //         })
        //         .then(res => {
        //             if (action === "LOAD_ROOT_OPTIONS") {
        //                 this.formControlData.menuParentId = this.normalizerPid(res);
        //             } else if (action === "LOAD_CHILDREN_OPTIONS") {
        //                 parentNode.children = this.normalizerPid(res);
        //             }
        //             callback();
        //         });
        // },
        // normalizerPid(node) {
        //     let arrNodes = [];
        //     arrNodes = node.map(item => {
        //         let node = {};
        //         node.id = item.id;
        //         node.label = item.title;
        //         node.children = item.children == null ? null : item.children;
        //         return node;
        //     });
        //     return arrNodes;
        // },
        initMenuParenTree() {
            this.axios
                .get(this.globalActionUrl.system.menu.listTreeNode)
                .then(res => {
                    this.formControlData.menuParentTreeNode = res;
                    console.log(this.formControlData.menuParentTreeNode);
                });
        },
        openMenuParentTree(instanceId) {
            this.loadMenuParentTree("LOAD_ROOT_OPTIONS");
        },
        closeMenuParentTree(value, instanceId) {
            console.log(value);
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