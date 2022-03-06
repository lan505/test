<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<LxAuth value="system:depart:save">
						<Button type="primary" icon="md-add" @click="openDialogAdd">新增</Button>
					</LxAuth>
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
		<div class="lx-custom-layout">
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.depart.queryDepartPage" :queryChildrenUrl="this.globalActionUrl.system.depart.queryDepartChildren" :removeDataUrl="this.globalActionUrl.system.depart.removeDepart" :renderTableData="this.renderTableData" :columns="this.tableData.columns">
			</LxTablePage>
			<LxDialog ref="dialogAdd" title="部门新增" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<DepartAdd ref="departAdd" @loadTableData="loadTableData"></DepartAdd>
			</LxDialog>
			<LxDialog ref="dialogEdit" title="部门编辑" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<DepartEdit ref="departEdit" @loadTableData="loadTableData"></DepartEdit>
			</LxDialog>
		</div>
	</div>
</template>
<script>
import DepartAdd from "./DepartAdd";
import DepartEdit from "./DepartEdit";
export default {
	created() { },
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
		openDialogAdd() {
			this.$refs.dialogAdd.openDialog();
		},
		openDialogEdit(id) {
			this.$refs.dialogEdit.openDialog({ [this.tableData.rowKey]: id });
		},
		openDialogDetail(id) {
			this.$refs.dialogDetail.openDialog({ [this.tableData.rowKey]: id });
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
					"LxAuth",
					{
						props: {
							value: "system:depart:edit"
						}
					},
					[
						h(
							"a",
							{
								on: {
									click: () => {
										this.openDialogEdit(params.row[this.tableData.rowKey]);
									}
								}
							},
							"编辑"
						)
					]
				)
			];
			if (params.row.departDefaultStatus == 0) {
				buttons.push(
					h(
						"LxAuth",
						{
							props: {
								value: "system:depart:remove"
							}
						},
						[
							h(
								"a",
								{
									on: {
										click: () => {
											this.$refs.tablePage.removeTableData(
												params.row[this.tableData.rowKey]
											);
										}
									}
								},
								"删除"
							)
						]
					)
				);
			}
			return h("div", { class: ["lx-actionbar"] }, buttons);
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
		DepartAdd,
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
