<template>
    <div>
        <Select ref="select" :multiple="multiple" clearable @on-open-change="initData" @on-change="onChange" :label="defaultText">
            <Tree ref="tree" :multiple="multiple" :data="data" :load-data="loadData" style="padding: 5px;" :render="renderContent" @on-select-change="onSelectChange"></Tree>
        </Select>
    </div>
</template>

<script>
export default {
    created() {
        //this.loadData();
    },
    data() {
        return {
            selectData: [],
            data: [],
            showTree: false,
        };
    },
    props: {
        url: {
            required: true,
            type: String,
            default() {
                return null;
            }
        },
        defaultText: {
            type: String,
            default() {
                return null;
            }
        },
        multiple: {
            type: Boolean,
            default() {
                return false;
            }
        },
        mapReceiveField: {
            type: Object,
            default() {
                return {
                    key: "key",
                    value: "value",
                    subNum: "subNum",
                    children: "children"
                };
            }
        },
        mapSendField: {
            default() {
                return {
                    key: "key",
                };
            }
        }
    },
    methods: {
        onFocus() {
            this.showTree = true;
        },
        onBlur() {
            this.showTree = false;
        },
        onChange(data) {
            console.log("onChange");
            this.$emit("input", data);
        },
        initData(isOpen) {
            if (isOpen && this.data.length == 0) {
                this.loadData();
            }
        },
        loadData(item, callback) {
            this.axios
                .get(this.url, {
                    params: {
                        [this.mapSendField.key]: item == null ? null : item.id,
                    }
                })
                .then(res => {
                    if (this.data.length == 0) {
                        this.data = this.mapTreeNode(res);
                    } else {
                        callback(this.mapTreeNode(res));
                    }
                });
        },
        mapTreeNode(data) {
            let arrNodes = [];
            arrNodes = data.map(item => {
                let node = {};
                node.id = item[this.mapReceiveField.key];
                node.title = item[this.mapReceiveField.value];
                node.children = item[this.mapReceiveField.children];
                if (item[this.mapReceiveField.subNum] > 0) {
                    node.loading = false;
                }
                return node;
            });
            return arrNodes;
        },
        onSelectChange(nodes) {

        },
        renderContent(h, { root, node, data }) {
            return h(
                "Option",
                {
                    style: {
                        display: "inline-block",
                        margin: "0"
                    },
                    props: {
                        value: data.id
                    }
                },
                data.title
            );
        },
        clear() {
            console.log(123);
            this.$refs.select.clearSingleSelect()
        }
    }
};
</script>

<style scoped>
.hideTree {
    display: none;
    width: 100%;
}
</style>
