<template>
    <div>
        <Modal v-model="dialog" title="查看系统用户" :mask-closable="false">
            <div class="form scroll">
                <Form :label-width="80">
                    <FormItem label="用户名">
                        <Input v-model="form.account" readonly></Input>
                    </FormItem>
                    <FormItem label="名称">
                        <Input v-model="form.name" readonly></Input>
                    </FormItem>
                    <FormItem label="身份证号">
                        <Input v-model="form.identity" readonly></Input>
                    </FormItem>
                    <FormItem label="手机号码">
                        <Input v-model="form.mobile" readonly></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <Radio :value="true">{{form.sex}}</Radio>
                    </FormItem>
                    <FormItem label="出生年月">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="form.birthday" readonly></DatePicker>
                    </FormItem>
                    <FormItem label="地址">
                        <Input v-model="form.address" readonly></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" readonly></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="close">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    created() {
        
    },
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
