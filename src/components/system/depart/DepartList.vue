<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<Button type="primary" icon="md-add" @click="showNewDialog" v-permission="'system:depart:save'">新增</Button>
				</div>
				<div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
					<div class="search-btn">
						<Input v-model="tableData.query.departName" clearable>
						<span slot="prepend">名称</span>
						</Input>
					</div>
					<div class="search-btn">
						<Button type="default" icon="md-search" @click="loadTableData()">查询</Button>
					</div>
					<div class="search-btn">
						<Button type="default" icon="md-search" @click="reset()">重置</Button>
					</div>
				</div>
			</div>
		</Card>
		<div class="custom-layout">
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.depart.queryDepartPage" :queryChildrenUrl="this.globalActionUrl.system.depart.queryDepartChildren" :removeDataUrl="this.globalActionUrl.system.depart.removeDepart" :renderTableData="this.renderTableData" :columns="this.tableData.columns">
			</LxTablePage>
			<DepartNew ref="newDialog" @loadTableData="loadTableData"></DepartNew>
			<DepartEdit ref="editDialog" @loadTableData="loadTableData"></DepartEdit>
		</div>
	</div>
</template>
<script>
import DepartNew from "./DepartNew";
import DepartEdit from "./DepartEdit";
export default {
	created() {},
	mounted() {
		this.initData();
	},
	data() {
		return {
			searchControlData: {},
			tableData: {
				rowKey: "departId",
				query: {
					departName: null,
					departType: null
				},
				columns: [
					{
						type: "selection",
						align: "center",
						width: 60
					},
					{
						title: "部门编号",
						key: "departCode",
						ellipsis: "true",
						tooltip: "true",
						width: 100
					},
					{
						title: "部门名称",
						key: "departName",
						ellipsis: "true",
						sortable: "custom",
						tree: true,
						render: (h, params) => {
							return this.initDepartName(h, params);
						}
					},
					{
						title: "层级",
						key: "treeLevel",
						ellipsis: "true",
						width: 100
					},
					{
						title: "子节点数",
						key: "treeSubNum",
						ellipsis: "true",
						width: 100
					},
					{
						title: "用户数量",
						key: "userCount",
						ellipsis: "true",
						width: 100
					},
					{
						title: "排序",
						key: "departSort",
						ellipsis: "true",
						tooltip: "true",
						width: 65
					},
					{
						title: "创建人员",
						key: "creatorCn",
						ellipsis: "true",
						tooltip: "true",
						width: 100
					},
					{
						title: "创建时间",
						key: "createTime",
						ellipsis: "true",
						tooltip: "true",
						width: 170
					},
					{
						title: "操作",
						key: "action",
						align: "center",
						fixed: "right",
						width: 250,
						render: (h, params) => {
							return this.initOperateButton(h, params);
						}
					}
				]
			}
		};
	},
	methods: {
		initData() {
			this.loadTableData();
		},
		loadTableData() {
			this.$refs.tablePage.loadTableData();
		},
		reset() {
			Object.keys(this.tableData.query).forEach((key) => {
				this.tableData.query[key] = null;
			});
			this.loadTableData();
		},
		showNewDialog() {
			this.$refs.newDialog.load();
		},
		showEditDialog(id) {
			this.$refs.editDialog.load(id);
		},
		showDetailForm(id) {
			this.$refs.detailDialog.load(id);
		},
		loadDepartType() {
			this.axios
				.get(this.globalActionUrl.system.depart.optionDepartType)
				.then((res) => {
					this.searchControlData.departType = res;
				});
		},
		initDepartName(h, params) {
			let result = [h("span", params.row.departName)];
			if (params.row.departDefaultStatus == 1) {
				result.push(
					h(
						"Tag",
						{
							props: {
								color: "primary"
							},
							style: {
								marginLeft: "10px"
							}
						},
						"默认"
					)
				);
			}
			return h("span", result);
		},
		initOperateButton(h, params) {
			let buttons = [
				h(
					"a",
					{
						directives: [
							{
								name: "permission",
								value: "system:depart:detail"
							}
						],
						style: {
							marginRight: "10px"
						},
						on: {
							click: () => {
								this.showDetailForm(params.row[this.tableData.rowKey]);
							}
						}
					},
					"查看"
				),
				h(
					"a",
					{
						directives: [
							{
								name: "permission",
								value: "system:depart:edit"
							}
						],
						style: {
							marginRight: "10px"
						},
						on: {
							click: () => {
								this.showEditDialog(params.row[this.tableData.rowKey]);
							}
						}
					},
					"编辑"
				)
			];
			if (params.row.departDefaultStatus == 0) {
				buttons.push(
					h(
						"a",
						{
							directives: [
								{
									name: "permission",
									value: "system:depart:remove"
								}
							],
							style: {
								marginRight: "10px"
							},
							on: {
								click: () => {
									this.remove(params.row[this.tableData.rowKey]);
								}
							}
						},
						"删除"
					)
				);
			}
			return h("div", { style: { float: "left" } }, buttons);
		},
		renderTableData(data) {
			var result =
				data == null
					? []
					: data.map(function (value) {
							value._disabled = value.departDefaultStatus == 1;
							return value;
					  });
			this.globalHelper.initTreeDataFields(this, result);
			return result;
		}
	},
	components: {
		DepartNew,
		DepartEdit
	}
};
</script>
<style scoped>
.save-btn {
	width: 10%;
	float: left;
}
.search-tool {
	width: 90%;
	text-align: right;
}
.search-btn {
	margin-left: 10px;
}
</style>
