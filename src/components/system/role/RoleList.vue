<template>
    <div>
        <div class="row">
            <Row>
                <Col span="2">
                <Button type="primary" icon="ios-searchParam" long @click="init">新增</Button>
                </Input>
                </Col>
                <Col span="2" offset="20">
                <Button type="primary" icon="ios-searchParam" long @click="init">查询</Button>
                </Input>
                </Col>
            </Row>
        </div>
        <TablePage :columns="columns" :data="data" :total="total" @init="init"></TablePage>
    </div>
</template>
<script>
export default {
    created() {
        this.init();
    },
    data() {
        return {
            control: {
                deleteStatus: [
                    {
                        label: "正常",
                        value: 1
                    },
                    {
                        label: "已删除",
                        value: 0
                    }
                ]
            },
            deleteParam: {
                ids: []
            },
            searchParam: {
                account: "",
                name: "",
                mobile: "",
                deleteStatus: 0
            },
            total: 0,
            data: [],
            columns: [
                {
                    title: "角色名称",
                    key: "name",
                    sortable: true
                },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "default",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index);
                                        }
                                    }
                                },
                                "修改"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ]
        };
    },
    methods: {
        init(params) {
            Object.assign(this.searchParam, params);
            this.axios.get(this.globalActionUrl.roleList, {params: this.searchParam}).then(res => {
                this.total = res == null ? 0 : res.total;
                this.data = res == null ? [] : res.records;
            });
        },
        detail(id) {
            this.$router.push({
                path: ""
            });
        },
        edit(id) {
            this.axios.post(this.globalActionUrl.roleList, this.searchParam).then(res => {
                this.total = res.total;
                this.data = res.records;
            });
        },
        delete(id) {
            this.delete.ids.push(id);
            this.$Modal.confirm({
                title: "提示框",
                content: "是否删除?",
                onOk: () => {
                    this.axios
                        .post(this.globalActionUrl.roleDelete, this.deleteParam)
                        .then(res => {
                            this.$Message.success("删除成功");
                            this.init();
                        });
                }
            });
        }
    }
};
</script>

<style scoped>
/* .row {
    margin-bottom: 20px;
} */
</style>
