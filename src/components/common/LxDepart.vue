<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2022-02-08 11:15:38
 * @LastEditTime : 2022-02-08 11:50:34
-->
<template>
	<div>
		<div class="depart-operate">
			<Icon class="default-icon" type="md-add-circle" size="20" @click="departSave" />
			<Icon class="default-icon" type="md-create" size="20" @click="departEdit" />
			<Icon :class="departData.isDefaultDepart ? 'not-operate-icon' : 'default-icon'" type="md-trash" size="20" @click="departRemove" />
			<Icon :class="departData.isDefaultDepart ? 'not-operate-icon' : 'default-icon'" type="md-arrow-round-up" size="20" @click="departUp" />
			<Icon :class="departData.isDefaultDepart ? 'not-operate-icon' : 'default-icon'" type="md-arrow-round-down" size="20" @click="departDown" />
		</div>
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
	created() {
        console.log("LxDepart created");
    },
    mounted() {
        console.log("LxDepart mounted");
    },
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
			queryDepartChildren({ treeParentId: item.departId }).then((res) => {
				callback(this.toTreeFormat(res));
			});
		},
		toTreeFormat(data) {
			return data.map((value) => {
				value._disabled = value.defaultDefaultStatus == 1;
				value.title = value.departName;
				value.children = [];
				value.loading = false;
				return value;
			});
		},
		selectChangeDepartUser(dataArray, item) {
			if (this.ArrayUtil.isNotEmpty(this.$refs.departTree.getSelectedNodes())) {
				this.departData.isDefaultDepart =
					this.$refs.departTree.getSelectedNodes()[0].departDefaultStatus == 1;
				this.departData.selectedDepartId =
					this.$refs.departTree.getSelectedNodes()[0].departId;
			}
		},
		renderDepartUser(h, { root, node, data }) {
			return h("span", [
				data.title,
				" (",
				h(
					"span",
					{
						style: {
							color: "#2d8cf0"
						}
					},
					data.userCount
				),
				h("Icon", {
					props: {
						type: "md-person",
						color: "#2d8cf0"
					}
				}),
				")"
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
}
.depart-data {
	padding: 5px;
}
.default-icon:hover {
	cursor: pointer;
	color: #2d8cf0;
}
.not-operate-icon {
	color: #dbdbdb;
}
</style>
