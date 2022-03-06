<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<LxAuth value="system:dictIndex:save">
						<Button type="primary" icon="md-add" @click="openDialogAdd">新增</Button>
					</LxAuth>
				</div>
				<div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
					<div class="search-btn">
						<Input v-model="tableData.query.name" clearable>
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
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.dictIndex.queryDictIndexPage" :removeDataUrl="this.globalActionUrl.system.dictIndex.removeDictIndex" :columns="this.tableData.columns"></LxTablePage>
			<LxDialog ref="dialogAdd" title="字典类新增" :mode="this.globalConsts.operateButtonProcessType.add" :width="900">
				<DictIndexAdd ref="dictIndexAdd" @loadTableData="loadTableData"></DictIndexAdd>
			</LxDialog>
			<LxDialog ref="dialogEdit" title="字典类编辑" :mode="this.globalConsts.operateButtonProcessType.edit" :width="900">
				<DictIndexEdit ref="dictIndexEdit" @loadTableData="loadTableData"></DictIndexEdit>
			</LxDialog>
			<LxDialog ref="dialogDialogDictItem" title="字典值列表" :mode="this.globalConsts.operateButtonProcessType.edit" :width="1200">
				<DictItemList ref="dictItemList" @loadTableData="loadTableData"></DictItemList>
			</LxDialog>
		</div>
	</div>
</template>
<script>
import DictIndexAdd from "./DictIndexAdd";
import DictIndexEdit from "./DictIndexEdit";
import DictItemList from "../dictItem/DictItemList";
export default {
	created() { },
	mounted() {
		this.initData();
	},
	data() {
		return {
			searchControlData: {},
			tableData: {
				rowKey: "dictIndexId",
				query: {
					dictIndexName: null
				},
				columns: [
					{
						type: "selection",
						align: "center",
						width: 60
					},
					{
						title: "字典类编号",
						key: "dictIndexCode",
						ellipsis: "true",
						tooltip: "true",
						width: 200
					},
					{
						title: "字典类名称",
						key: "dictIndexName",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom"
					},
					{
						title: "字典项总数",
						key: "dictIndexSubNum",
						ellipsis: "true",
						tooltip: "true",
						sortable: "custom"
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
						width: 270,
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
		loadTableData(param) {
			this.$refs.tablePage.loadTableData(param);
		},
		reset() {
			Object.keys(this.tableData.query).forEach(
				(key) => (this.tableData.query[key] = null)
			);
			this.loadTableData();
		},
		openDialogAdd() {
			this.$refs.dialogAdd.openDialog();
		},
		openDialogEdit(data) {
			this.$refs.dialogEdit.openDialog({ [this.tableData.rowKey]: data });
		},
		openDialogDictItem(data) {
			this.$refs.dialogDialogDictItem.openDialog({ dictIndexCode: data });
		},
		initOperateButton(h, params) {
			let buttons = [
				h(
					"LxAuth",
					{
						props: {
							value: "system:dictIndex:edit"
						}
					},
					[
						h(
							"a",
							{
								on: {
									click: () => {
										this.openDialogDictItem(params.row.dictIndexCode);
									}
								}
							},
							"字典项"
						)
					]
				),
				h(
					"LxAuth",
					{
						props: {
							value: "system:dictIndex:edit"
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
			if (params.row.dictIndexDefaultStatus == 0) {
				buttons.push(
					h(
						"LxAuth",
						{
							props: {
								value: "system:dictIndex:remove"
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
					value._disabled = value.dictIndexDefaultStatus == 1;
					return value;
				});
		}
	},
	components: {
		DictIndexAdd,
		DictIndexEdit,
		DictItemList
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