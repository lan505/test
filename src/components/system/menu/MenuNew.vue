<template>
    <div>
        <Modal v-model="dialog" title="系统菜单新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
            <div class="form scroll">
                <Form ref="form" :model="form" :label-width="80" :rules="validate">
                    <FormItem label="父级菜单" prop="pid">
                        <Treeselect v-model="form.pid" :options="formControlData.pid" :loadOptions="loadPid" :autoLoadRootPptions="false" loadingText="搜索中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
                    </FormItem>
                    <FormItem label="菜单名称" prop="name">
                        <Input v-model="form.name" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单URL" prop="url">
                        <Input v-model="form.url" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单路由" prop="router">
                        <Input v-model="form.router" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单图标" prop="icon">
                        <Input v-model="form.icon" clearable></Input>
                    </FormItem>
                    <FormItem label="菜单类型" prop="menuType">
                        <RadioGroup v-model="form.menuType">
                            <Radio v-for="item in formControlData.menuType" :label="item.key" :key="item.key">{{item.value}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="备注" prop="comment">
                        <Input v-model="form.comment" type="textarea" :autosize="{minRows: 5, maxRows: 10}"></Input>
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
                pid: null
            },
            dialog: false,
            form: {
                pid: null,
                name: null,
                url: null,
                router: null,
                icon: null,
                menuType: null,
                comment: null
            },
            validate: {
                pid: [
                    {
                        required: true,
                        message: "请选择父级菜单",
                        trigger: "blur"
                    }
                ],
                name: [
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
                url: [
                    {
                        required: true,
                        message: "请输入菜单URL",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "菜单URL长度为1-32位",
                        trigger: "blur"
                    }
                ],
                icon: [
                    {
                        required: true,
                        message: "请输入菜单图标",
                        trigger: "blur"
                    },
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
        load(dialog) {
            this.dialog = true;
            this.axios.get(this.globalActionUrl.dictIndex.listMenuType).then(res => {
                this.control.menuType = res;
            });
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.axios
                        .post(this.globalActionUrl.menu.save, this.form)
                        .then(res => {
                            this.close();
                            this.$emit("load");
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
        loadPid({ action, parentNode, callback }) {
            this.axios
                .get(this.globalActionUrl.menu.listByPid, {
                    params: {
                        pid: parentNode == null ? null : parentNode.id
                    }
                })
                .then(res => {
                    if (action === "LOAD_ROOT_OPTIONS") {
                        this.formControlData.pid = this.normalizerPid(res);
                    } else if (action === "LOAD_CHILDREN_OPTIONS") {
                        parentNode.children = this.normalizerPid(res);
                    }
                    callback();
                });
        },
        normalizerPid(node) {
            let arrNodes = [];
            arrNodes = node.map(item => {
                let node = {};
                node.id = item.key;
                node.label = item.value;
                node.children = item.subNum == 0 ? item.children : null;
                node.isNew = true;
                return node;
            });
            return arrNodes;
        },
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
