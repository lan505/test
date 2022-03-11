<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%">
				<div class="cm-flex" style="width: 100px">
					<LxAuth value="system:role:save">
						<Button type="primary" icon="md-add" @click="openDialogAdd">新增</Button>
					</LxAuth>
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
		<div class="lx-custom-layout">
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.role.queryRolePage" :removeDataUrl="this.globalActionUrl.system.role.removeRole" :renderTableData="this.renderTableData" :columns="this.tableData.columns">
			</LxTablePage>
			<LxDialog ref="dialogAdd" title="角色新增" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<RoleAdd ref="roleAdd" @loadTableData="loadTableData"></RoleAdd>
			</LxDialog>
			<LxDialog ref="dialogEdit" title="角色编辑" :mode="this.globalConsts.operateButtonProcessType.edit" :width="500">
				<RoleEdit ref="roleEdit" @loadTableData="loadTableData"></RoleEdit>
			</LxDialog>
			<LxDialog ref="dialogDetail" title="角色详情" :mode="this.globalConsts.operateButtonProcessType.detail" :width="500">
				<RoleDetail ref="roleDetail" @loadTableData="loadTableData"></RoleDetail>
			</LxDialog>
			<LxDialog ref="dialogAuthority" title="角色权限" :mode="this.globalConsts.operateButtonProcessType.edit" :width="700">
				<RoleAuthority ref="roleAuthority" @loadTableData="loadTableData"></RoleAuthority>
			</LxDialog>
		</div>
	</div>
</template>
<script>
import RoleAdd from "./RoleAdd";
import RoleEdit from "./RoleEdit";
import RoleDetail from "./RoleDetail";
import RoleAuthority from "./RoleAuthority";
export default {
	created() {},
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
		openDialogAdd() {
			this.$refs.dialogAdd.openDialog();
		},
		openDialogEdit(data) {
			this.$refs.dialogEdit.openDialog({ [this.tableData.rowKey]: data });
		},
		openDialogDetail(data) {
			this.$refs.dialogDetail.openDialog({ [this.tableData.rowKey]: data });
		},
		openDialogAuthority(data) {
			this.$refs.dialogAuthority.openDialog({ [this.tableData.rowKey]: data });
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
					"LxAuth",
					{
						props: {
							value: "system:role:detail"
						}
					},
					[
						h(
							"a",
							{
								on: {
									click: () => {
										this.openDialogDetail(params.row[this.tableData.rowKey]);
									}
								}
							},
							"查看"
						)
					]
				),
				h(
					"LxAuth",
					{
						props: {
							value: "system:role:edit"
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
				),
				h(
					"LxAuth",
					{
						props: {
							value: "system:role:authority"
						}
					},
					[
						h(
							"a",
							{
								on: {
									click: () => {
										this.openDialogAuthority(params.row[this.tableData.rowKey]);
									}
								}
							},
							"权限"
						)
					]
				)
			];
			if (params.row.roleDefaultStatus == 0) {
				buttons.push(
					h(
						"LxAuth",
						{
							props: {
								value: "system:role:remove"
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
			return data == null
				? []
				: data.map(function (value) {
						value._disabled = value.roleDefaultStatus == 1;
						return value;
				  });
		}
	},
	components: {
		RoleAdd,
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
