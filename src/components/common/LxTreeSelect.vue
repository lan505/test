<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-18 18:42:28
-->
<template>
	<div>
		<Treeselect v-model="formControlData.value" :options="formControlData.data" :loadOptions="loadTreeSelectData" @input="input" @open="open" :normalizer="normalizer" :autoLoadRootOptions="false" loadingText="加载中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据">
			<label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }">
				{{ node.label }} ({{ node.raw.treeSubNum }})
			</label>
		</Treeselect>
	</div>
</template>

<script>
import axios from "@/assets/js/global/globalAxios";
export default {
    name: "LxTreeSelect",
    created() {},
    mounted() {},
    data() {
        return {
            formControlData: {
                value: null,
                data: null
            }
        };
    },
    props: {
        /**
         * 绑定的值
         */
        value: null,
        /**
         * 查询数据URL
         */
        queryDataUrl: {
            type: String,
            required: true
        },
        /**
         * 查询绑定数据URL
         */
        queryBindUrl: {
            type: String,
            required: false
        },
        /**
         * 树形结构字段名
         */
        treeParentName: {
            type: String,
            default() {
                return "treeParentId";
            }
        },
        /**
         * 树形结构字段值
         */
        treeParentId: {
            type: String,
            default() {
                return "0";
            }
        },
        /**
         * 树形结构映射，把后端字段映射到TreeSelect需要的结构
         * 结构字段详见：https://www.vue-treeselect.cn/#node
         */
        treeFieldMap: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        loadTreeSelectData({
            action,
            parentNode,
            callback,
            searchQuery,
            instanceId
        }) {
            axios({
                url: this.queryDataUrl,
                method: "get",
                params: {
                    [this.treeParentName]:
                        parentNode == null
                            ? this.treeParentId
                            : this.normalizer(parentNode).id
                }
            }).then(res => {
                if (action == "LOAD_ROOT_OPTIONS") {
                    this.formControlData.data = res.map(value => {
                        value.children = null;
                        return value;
                    });
                    callback();
                } else if (action == "LOAD_CHILDREN_OPTIONS") {
                    parentNode.children = res.map(value => {
                        value.children = null;
                        return value;
                    });
                    callback();
                } else if (action == "ASYNC_SEARCH") {
                    // 参数2是传入搜索后返回的数据源
                    callback(null, []);
                } else {
                    console.warn("意外的action值");
                }
            });
        },
        normalizer(node) {
            for (var key in this.treeFieldMap) {
                var newKey = this.treeFieldMap[key];
                if (newKey) {
                    node[key] = node[newKey];
                }
            }
            return node;
        },
        input(value, instanceId) {
            this.$emit("update:value", value);
        },
        open(instanceId) {
            this.formControlData.data = null;
        },
        // 绑定编辑时的数据源
        bindValue(value) {
            axios({
                url: this.queryBindUrl,
                method: "get",
                params: {
                    departId: value
                }
            }).then(res => {
                this.formControlData.data = [this.normalizer(res)];
            });
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newVal, oldVal) {
                this.formControlData.value = newVal;
                // newVal和oldVal都为空，代表第一次赋值
                if (oldVal == null && newVal != null) {
                    console.log("加载回显");
                    this.bindValue(newVal);
                }
            }
        }
    }
};
</script>

<style scoped>
</style>
