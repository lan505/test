<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2022-02-08 11:15:38
 * @LastEditTime : 2022-02-18 17:24:28
-->
<template>
	<div>
		<div class="depart-data">
			<Tree ref="departTree" :data="departData.data" :load-data="loadDepartChildrenData" @on-select-change="selectChangeDepartUser" :render="renderDepartUser"></Tree>
		</div>
	</div>
</template>

<script>
import {
	queryDepartPage,
	queryDepartChildren
} from "@/assets/js/api/requestSystem";
export default {
	name: "LxDepart",
	created() { },
	mounted() { },
	data() {
		return {
			departData: {
				isDefaultDepart: false,
				selectedDepartId: null,
				data: []
			}
		};
	},
	methods: {
		loadDepartData() {
			queryDepartPage({}).then((res) => {
				this.departData.data = this.toTreeFormat(res.records);
			});
		},
		loadDepartChildrenData(item, callback) {
			queryDepartChildren({ departId: item.departId }).then((res) => {
				callback(this.toTreeFormat(res));
			});
		},
		toTreeFormat(data) {
			return data.map((value) => {
				value._disabled = value.defaultDefaultStatus == 1;
				value.title = value.departName;
				if (value.treeSubNum > 0) {
					value.children = [];
					value.loading = false;
				}
				return value;
			});
		},
		selectChangeDepartUser(dataArray, item) {
			if (this.ArrayUtil.isNotEmpty(this.$refs.departTree.getSelectedNodes())) {
				this.departData.isDefaultDepart =
					this.$refs.departTree.getSelectedNodes()[0].departDefaultStatus == 1;
				this.$emit(
					"select-change-depart",
					this.$refs.departTree.getSelectedNodes()[0].departId
				);
			}
		},
		renderDepartUser(h, { root, node, data }) {
			return h("span", [
				data.title,
				"（",
				h(
					"span",
					data.userCount
				),
				h("Icon", {
					props: {
						type: "md-person",
						color: "#696969"
					}
				}),
				"）"
			]);
		},
		departSave() {
			console.log("departSave");
		},
		departEdit() {
			console.log("departEdit");
		},
		departRemove() {
			console.log("departRemove");
		},
		departUp() {
			console.log("departUp");
		},
		departDown() {
			console.log("departDown");
		}
	}
};
</script>

<style scoped>
.depart-operate {
	padding: 5px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #dbdbdb;
	background-color: #f8f8f9;
}
.depart-data {
	padding: 5px;
	overflow-x: auto;
}
.default-icon:hover {
	cursor: pointer;
	color: #2d8cf0;
}
.not-operate-icon {
	color: #dbdbdb;
}
</style>
