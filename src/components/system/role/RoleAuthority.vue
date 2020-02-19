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
                <Tree ref="tree" :data="authority" show-checkbox></Tree>
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
            authority: [],
            form: {
                roleId: null,
                lsMenuId: []
            }
        };
    },
    methods: {
        load(id) {
            this.dialog = true;
            this.loadRoleAuthority(id);
            this.form.roleId = id;
        },
        close() {
            this.dialog = false;
        },
        save() {
            this.fullData();
            this.axios
                .post(this.globalActionUrl.role.assignAuthority, this.form)
                .then(res => {
                    this.close();
                    this.$Message.success("提交成功");
                });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        loadRoleAuthority(id) {
            this.axios
                .get(this.globalActionUrl.role.assignAuthority, {
                    params: {
                        id: id
                    }
                })
                .then(res => {
                    this.authority = this.recursion(res);
                });
        },
        fullData() {
            this.form.lsMenuId = [];
            this.$refs.tree.getCheckedAndIndeterminateNodes().map(item => {
                this.form.lsMenuId.push(item.id);
            });
        },
        recursion(data) {
            for(let i=0; i<data.length; i++){
                if(data[i].level < 3){
                    data[i].checked = false;
                }
                if(data[i].children != null && data[i].children.length > 0){
                    this.recursion(data[i].children);
                }
            }
            return data;
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
