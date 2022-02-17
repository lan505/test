<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-17 18:55:11
-->
<template>
	<div>
		<Treeselect :async="true" :options="formControlData.data" :load-options="loadTreeSelectData" :autoLoadRootOptions="false" :normalizer="normalizer" loadingText="加载中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
	</div>
</template>

<script>
import axios from "@/assets/js/global/globalAxios";
export default {
	name: "LxTreeSelect",
	created() {},
	mounted() {
		// this.loadTreeSelectData({});
	},
	data() {
		return {
			formControlData: {
				isDefaultDepart: false,
				selectedDepartId: null,
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
		loadTreeSelectData({ action, parentNode, callback, searchQuery, instanceId }) {
			axios({
				url: this.queryDataUrl,
				method: "get",
				params: {
					[this.treeParentName]:
						parentNode == null ? this.treeParentId : this.normalizer(parentNode).id
				}
			}).then((res) => {
				if (action == "LOAD_ROOT_OPTIONS") {
					this.formControlData.data = res;
					callback();
				} else if (action == "LOAD_CHILDREN_OPTIONS") {
					parentNode.children = res;
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
			var result = {
				children: null
			};
			for (let keyName in this.treeFieldMap) {
				var originDataValue = this.treeFieldMap[keyName];
				result[keyName] = node[originDataValue];
			}
			return result;
		}
	}
};
</script>

<style scoped>
</style>
