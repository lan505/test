<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-21 15:26:11
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
import {
	LOAD_ROOT_OPTIONS,
	LOAD_CHILDREN_OPTIONS,
	ASYNC_SEARCH
} from "@riophae/vue-treeselect";
export default {
	name: "LxTreeSelect",
	created() { },
	mounted() { },
	data() {
		return {
			formControlData: {
				value: null,
				data: null,
				// 保存临时根节点数据，便于在open事件直接复制处理，把open事件的处理提前到watch监听valueObject里
				tempRootData: null
			},
			// 是否已加载过子节点
			isLoadChildren: false
		};
	},
	props: {
		/**
		 * 绑定的键（key）
		 */
		value: {
			type: String
		},
		/**
		 * 绑定的值（value）
		 */
		valueObject: {
			type: Object
		},
		/**
		 * 查询数据URL
		 */
		queryDataUrl: {
			type: String,
			required: true
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
			required: true,
			validator: function (value) {
				var result = true;
				if (value == null || Object.keys(value).length === 0) {
					console.error("treeFieldMap对象为空");
					result = false;
				}
				if (!value.hasOwnProperty("id")) {
					console.error("treeFieldMap不包含id属性");
					result = false;
				}
				if (!value.hasOwnProperty("label")) {
					console.error("treeFieldMap不包含label属性");
					result = false;
				}
				return result;
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
				if (action == LOAD_ROOT_OPTIONS) {
					this.formControlData.data = res.map(value => {
						value.children = null;
						return value;
					});
					callback();
				} else if (action == LOAD_CHILDREN_OPTIONS) {
					parentNode.children = res.map(value => {
						value.children = null;
						return value;
					});
					callback();
				} else if (action == ASYNC_SEARCH) {
					// 参数2是传入搜索后返回的数据源
					callback(null, []);
				} else {
					console.warn("意外的action值");
				}
			});
		},
		normalizer(node) {
			for (var key in this.treeFieldMap) {
				var aliasKey = this.treeFieldMap[key];
				if (aliasKey) {
					var aliasValue = node[aliasKey];
					if (aliasValue) {
						node[key] = aliasValue;
					}
				}
			}
			return node;
		},
		input(value, instanceId) {
			this.$emit("update:value", value);
		},
		open(instanceId) {
			// 展开窗口时，如果没加载过子节点，则加载根节点
			if (!this.isLoadChildren) {
				// this.formControlData.data = null;
				// this.loadTreeSelectData({ action: LOAD_ROOT_OPTIONS });
				this.isLoadChildren = true;
				this.formControlData.data = this.formControlData.tempRootData;
			}
		},
		// 绑定编辑时的数据源
		bindValue(value) {
			this.formControlData.data = [value];
			console.log(this.value);
		},
		queryTempRootData() {
			axios({
				url: this.queryDataUrl,
				method: "get",
				params: {
					[this.treeParentName]: this.treeParentId
				}
			}).then(res => {
				this.formControlData.tempRootData = res.map(value => {
					value.children = null;
					return value;
				});
			});
		}
	},
	watch: {
		valueObject: {
			immediate: true,
			handler(newVal, oldVal) {
				// 复制给组件内部的value进行绑定
				this.formControlData.value = this.value;
				if (newVal != null) {
					this.bindValue(this.valueObject);
				}
				this.queryTempRootData();
			}
		}
	}
};
</script>

<style scoped>
</style>
