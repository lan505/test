<template>
    <div>
        <Modal
            v-model="dialog"
            title="角色权限分配"
            :width="600"
            :mask-closable="false"
            @on-visible-change="visibleChange"
        >
            <div class="form scroll">
                <Tree ref="tree" :data="menuTreeData" show-checkbox></Tree>
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
            dialog: false,
            menuTreeData: []
        };
    },
    methods: {
        load(id) {
            this.dialog = true;
            this.loadRoleAuthority(id);
        },
        close() {
            this.dialog = false;
        },
        save() {
            // this.$refs.form.validate(valid => {
            //     if (valid) {
            //         this.axios
            //             .post(this.globalActionUrl.role.save, this.form)
            //             .then(res => {
            //                 this.close();
            //                 this.$emit("load");
            //                 this.$Message.success("提交成功");
            //             });
            //     }
            // });
            console.log(this.$refs.tree.getCheckedAndIndeterminateNodes());
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        loadRoleAuthority(id) {
            this.axios
                .get(this.globalActionUrl.menu.listTreeMenuByRoleId, {
                    params: {
                        roleId: id
                    }
                })
                .then(res => {
                    this.menuTreeData = res;
                });
        },
        addRenderNode(res) {
            var result = [];
            res.map(item => {
                if (item.level == 2) {
                    item.render = (h, { root, node, data }) => {
                        return h("div", {
                            style: {
                                width: "100px",
                                float: "right"
                            }
                        }, data.title);
                    };
                }
                if(item.children.length > 0){
                    this.addRenderNode(item.children);
                }
                result.push(item);
            });
            return result;
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
