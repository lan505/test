<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<Button type="primary" icon="md-add" @click="showNewDialog" v-permission="'system:user:save'">新增</Button>
				</div>
				<div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
					<div class="search-btn">
						<Input v-model="tableData.query.userAccount" clearable>
						<span slot="prepend">账号</span>
						</Input>
					</div>
					<div class="search-btn">
						<Input v-model="tableData.query.userName" clearable>
						<span slot="prepend">名称</span>
						</Input>
					</div>
					<div class="search-btn">
						<Input v-model="tableData.query.userMobile" clearable>
						<span slot="prepend">手机</span>
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
			<div class="layout-left">
				<LxDepart ref="lxDepart" @select-change-depart="selectChangeDepart"></LxDepart>
			</div>
			<div class="layout-right">
				<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.user.queryUserPage" :removeDataUrl="this.globalActionUrl.system.user.removeUser" :renderTableData="this.renderTableData" :columns="this.tableData.columns"></LxTablePage>
				<UserNew ref="newDialog" @loadTableData="loadTableData"></UserNew>
				<UserEdit ref="editDialog" @loadTableData="loadTableData"></UserEdit>
				<UserDetail ref="detailDialog" @loadTableData="loadTableData"></UserDetail>
			</div>
		</div>
	</div>
</template>
<script>
import UserNew from "./UserNew";
import UserEdit from "./UserEdit";
import UserDetail from "./UserDetail";
export default {
	created() { },
	mounted() {
		this.initData();
	},
	data() {
		return {
			searchControlData: {
				userSex: null
			},
			tableData: {
				rowKey: "userId",
				query: {
					userAccount: null,
					userName: null,
					userMobile: null,
					userUsageStatus: null
				},
				columns: [
					{
						type: "selection",
						align: "center",
						width: 60
					},
					{
						title: "头像",
						key: "userAvatar",
						width: 70,
						render: (h, params) => {
							return h("div", [
								h("Avatar", {
									props: {
										src: this.initAvatar(params.row.userAvatar)
									}
								})
							]);
						}
					},
					{
						title: "账号",
						key: "userAccount",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom",
						width: 110
					},
					{
						title: "名称",
						key: "userName",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom",
						width: 140,
						render: (h, params) => {
							return this.initUserName(h, params);
						}
					},
					{
						title: "性别",
						key: "userSexCn",
						ellipsis: "true",
						tooltip: "true",
						width: 100
					},
					{
						title: "手机",
						key: "userMobile",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom",
						width: 130
					},
					{
						title: "出生年月",
						key: "userBirthday",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom",
						width: 130
					},
					{
						title: "状态",
						key: "userUsageStatusCn",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom",
						width: 100
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
						tooltip: "true"
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
			this.loadDepartData();
		},
		loadTableData(param) {
			this.$refs.tablePage.loadTableData(param);
		},
		loadDepartData() {
			this.$refs.lxDepart.loadDepartData();
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
		initAvatar(avatar) {
			return avatar == null || avatar == ""
				? require("@/assets/images/default-user.png")
				: avatar;
		},
		initUserName(h, params) {
			let result = [h("span", params.row.userName)];
			if (params.row.userDefaultStatus == 1) {
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
								value: "system:user:detail"
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
								value: "system:user:edit"
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
			if (params.row.userDefaultStatus == 0) {
				buttons.push(
					h(
						"a",
						{
							directives: [
								{
									name: "permission",
									value: "system:user:remove"
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
			return data == null
				? []
				: data.map(function (value) {
					value._disabled = value.userDefaultStatus == 1;
					return value;
				});
		},
		selectChangeDepart(departId) {
			this.loadTableData({ departId });
		}
	},
	components: {
		UserNew,
		UserEdit,
		UserDetail
	}
};
</script>
<style scoped>
.lx-custom-layout .layout-left {
	width: 200px;
	height: 550px;
	flex: none;
	border-radius: 4px;
	border: 1px solid #dbdbdb;
	overflow-x: auto;
	position: relative;
}
.lx-custom-layout .layout-right {
	flex: 1;
	width: calc(100% - 216px);
	height: 100%;
	margin-left: 16px;
	position: relative;
}
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
.hide-check-box {
	display: none;
}
</style>
