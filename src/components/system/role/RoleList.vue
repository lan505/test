<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%">
				<div class="cm-flex" style="width: 100px">
					<Button type="primary" icon="md-add" @click="showNewDialog" v-permission="'system:role:save'">新增</Button>
				</div>
				<div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end">
					<div class="search-btn">
						<Input v-model="tableData.query.roleName" clearable>
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
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.role.queryRolePage" :removeDataUrl="this.globalActionUrl.system.role.removeRole" :renderTableData="this.renderTableData" :columns="this.tableData.columns">
			</LxTablePage>
			<RoleNew ref="newDialog" @loadTableData="loadTableData"></RoleNew>
			<RoleEdit ref="editDialog" @loadTableData="loadTableData"></RoleEdit>
			<RoleDetail ref="detailDialog" @loadTableData="loadTableData"></RoleDetail>
			<RoleAuthority ref="authorityForm" @loadTableData="loadTableData"></RoleAuthority>
		</div>
	</div>
</template>
<script>
import RoleNew from "./RoleNew";
import RoleEdit from "./RoleEdit";
import RoleDetail from "./RoleDetail";
import RoleAuthority from "./RoleAuthority";
export default {
	created() { },
	mounted() {
		this.initData();
	},
	data() {
		return {
			searchControlData: {},
			tableData: {
				rowKey: "roleId",
				query: {
					roleName: null
				},
				columns: [
					{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "角色编号",
						key: "roleCode",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom"
					},
					{
						title: "角色名称",
						key: "roleName",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom",
						render: (h, params) => {
							return this.initRoleName(h, params);
						}
					},
					{
						title: "创建人员",
						key: "creatorCn",
						ellipsis: "true",
						tooltip: "true"
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
						width: 190,
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
		showAuthorityForm(id) {
			this.$refs.authorityForm.load(id);
		},
		initRoleName(h, params) {
			let result = [h("span", params.row.roleName)];
			if (params.row.roleDefaultStatus == 1) {
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
								value: "system:role:detail",
								arg: () => {
									this.showDetailForm(params.row[this.tableData.rowKey]);
								}
							}
						],
						// on: {
						// 	click: () => {
						// 		console.log("触发角色详情点击事件");
						// 		this.showDetailForm(params.row[this.tableData.rowKey]);
						// 	}
						// }
					},
					"查看"
				),
				h(
					"a",
					{
						directives: [
							{
								name: "permission",
								value: "system:role:edit"
							}
						],
						on: {
							click: () => {
								this.showEditDialog(params.row[this.tableData.rowKey]);
							}
						}
					},
					"编辑"
				),
				h(
					"a",
					{
						directives: [
							{
								name: "permission",
								value: "system:role:authority"
							}
						],
						on: {
							click: () => {
								this.showAuthorityForm(params.row[this.tableData.rowKey]);
							}
						}
					},
					"权限"
				)
			];
			if (params.row.roleDefaultStatus == 0) {
				buttons.push(
					h(
						"a",
						{
							directives: [
								{
									name: "permission",
									value: "system:role:remove"
								}
							],
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
				);
			}
			return h("div", { class: ["toolbar"] }, buttons);
		},
		renderTableData(data) {
			return data == null
				? []
				: data.map(function (value) {
					value._disabled = value.roleDefaultStatus == 1;
					return value;
				});
		}
	},
	components: {
		RoleNew,
		RoleEdit,
		RoleDetail,
		RoleAuthority
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
