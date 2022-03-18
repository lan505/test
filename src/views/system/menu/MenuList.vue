<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<LxAuth value="system:menu:save">
						<Button type="primary" icon="md-add" @click="openDialogAdd">新增</Button>
					</LxAuth>
				</div>
				<div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
					<div class="search-btn">
						<Input v-model="tableData.query.menuName" clearable>
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
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.menu.queryMenuPage" :queryChildrenUrl="this.globalActionUrl.system.menu.queryMenuChildren" :removeDataUrl="this.globalActionUrl.system.menu.removeMenu" :renderTableData="this.renderTableData" :columns="this.tableData.columns"></LxTablePage>
			<LxDialog ref="dialogAdd" title="菜单新增" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<MenuAdd ref="menuAdd" @loadTableData="loadTableData"></MenuAdd>
			</LxDialog>
			<LxDialog ref="dialogEdit" title="菜单编辑" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<MenuEdit ref="menuEdit" @loadTableData="loadTableData"></MenuEdit>
			</LxDialog>
			<LxDialog ref="dialogDetail" title="菜单详情" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<MenuDetail ref="menuDetail" @loadTableData="loadTableData"></MenuDetail>
			</LxDialog>
		</div>
	</div>
</template>
<script>
import MenuAdd from "./MenuAdd";
import MenuEdit from "./MenuEdit";
import MenuDetail from "./MenuDetail";
export default {
	created() { },
	mounted() {
		this.initData();
	},
	data() {
		return {
			searchControlData: {},
			tableData: {
				rowKey: "menuId",
				query: {
					menuName: null
				},
				columns: [
					{
						type: "selection",
						align: "center",
						width: 60
					},
					{
						title: "菜单名称",
						key: "menuName",
						ellipsis: "true",
						sortable: "custom",
						tree: true,
						render: (h, params) => {
							return this.initMenuName(h, params);
						}
					},
					{
						title: "权限",
						key: "menuAuthority",
						ellipsis: "true",
						width: 190
					},
					{
						title: "路由",
						key: "menuRouter",
						ellipsis: "true",
						tooltip: "true",
						width: 140
					},
					{
						title: "图标",
						key: "menuIcon",
						ellipsis: "true",
						tooltip: "true",
						width: 100
					},
					{
						title: "类型",
						key: "menuType",
						ellipsis: "true",
						tooltip: "true",
						width: 65
					},
					{
						title: "排序",
						key: "menuSort",
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
						width: 160,
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
		initMenuName(h, params) {
			let result = [h("span", params.row.menuName)];
			if (params.row.menuDefaultStatus == 1) {
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
								value: "system:menu:detail"
							}
						],
						style: {
							marginRight: "10px"
						},
						on: {
							click: () => {
								this.openDialogDetail(params.row[this.tableData.rowKey]);
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
								value: "system:menu:edit"
							}
						],
						style: {
							marginRight: "10px"
						},
						on: {
							click: () => {
								this.openDialogEdit(params.row[this.tableData.rowKey]);
							}
						}
					},
					"编辑"
				)
			];
			if (params.row.menuDefaultStatus == 0) {
				buttons.push(
					h(
						"a",
						{
							directives: [
								{
									name: "permission",
									value: "system:menu:remove"
								}
							],
							style: {
								marginRight: "10px"
							},
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
			return h("div", { style: { float: "left" } }, buttons);
		},
		renderTableData(data) {
			var result =
				data == null
					? []
					: data.map(function (value) {
						value._disabled = value.menuDefaultStatus == 1;
						return value;
					});
			this.globalHelper.initTreeDataFields(this, result);
			return result;
		}
	},
	components: {
		MenuAdd,
		MenuEdit,
		MenuDetail
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
