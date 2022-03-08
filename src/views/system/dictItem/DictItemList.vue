<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<Button type="primary" icon="md-add" @click="openDialogAdd">新增</Button>
				</div>
				<div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
					<div class="search-btn">
						<Input v-model="tableData.query.dictItemValue" clearable>
						<span slot="prepend">字典值</span></span>
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
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.dictItem.queryDictItemPage" :removeDataUrl="this.globalActionUrl.system.dictItem.removeDictItem" :columns="this.tableData.columns" @removeComplete="removeComplete"></LxTablePage>
			<LxDialog ref="dialogAdd" title="字典项新增" :mode="this.globalConsts.operateButtonProcessType.add" :width="500">
				<DictItemAdd ref="dictItemAdd" @loadTableData="loadTableData"></DictItemAdd>
			</LxDialog>
			<LxDialog ref="dialogEdit" title="字典项编辑" :mode="this.globalConsts.operateButtonProcessType.edit" :width="500">
				<DictItemEdit ref="dictItemEdit" @loadTableData="loadTableData"></DictItemEdit>
			</LxDialog>
		</div>
	</div>
</template>
<script>
import DictItemAdd from "./DictItemAdd";
import DictItemEdit from "./DictItemEdit";
import DictItemDetail from "./DictItemDetail";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() {
		console.log("加载DictItemList");
	},
	mixins: [mixinsForm],
	data() {
		return {
			searchControlData: {},
			tableData: {
				rowKey: "dictItemId",
				parent: {
					dictIndexCode: null
				},
				query: {
					dictIndexCode: null,
					dictItemValue: null
				},
				columns: [
					{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "字典键",
						key: "dictItemKey",
						ellipsis: "true",
						width: 85
					},
					{
						title: "字典值",
						key: "dictItemValue",
						ellipsis: "true",
						tree: true
					},
					{
						title: "层级",
						key: "treeLevel",
						ellipsis: "true",
						sortable: "custom",
						width: 85
					},
					{
						title: "子节点数",
						key: "treeSubNum",
						ellipsis: "true",
						width: 95
					},
					{
						title: "创建人员",
						key: "creatorCn",
						ellipsis: "true",
						width: 95
					},
					{
						title: "创建时间",
						key: "createTime",
						ellipsis: "true",
						width: 170
					},
					{
						title: "操作",
						key: "action",
						align: "center",
						fixed: "right",
						width: 180,
						render: (h, params) => {
							return this.initOperateButton(h, params);
						}
					}
				]
			}
		};
	},
	methods: {
		formInit(data) {
			this.tableData.parent.dictIndexCode = data.dictIndexCode;
			this.loadTableData();
		},
		formClose() {
			this.$emit("closeDialog");
		},
		loadTableData(isChildrenUpdate) {
			if (isChildrenUpdate) {
				this.reloadParentTalbeData();
			}
			this.initDependencyData();
			this.$refs.tablePage.loadTableData();
		},
		reset() {
			Object.keys(this.tableData.query).forEach(
				(key) => (this.tableData.query[key] = null)
			);
			this.loadTableData();
		},
		initDependencyData() {
			this.tableData.query.dictIndexCode = this.tableData.parent.dictIndexCode;
		},
		openDialogAdd() {
			this.$refs.dialogAdd.openDialog({ dictIndexCode: this.tableData.query.dictIndexCode });
		},
		openDialogEdit(data) {
			this.$refs.dialogEdit.openDialog({ [this.tableData.rowKey]: data });
		},
		openDialogDetail(data) {
			this.$refs.dialogDetail.openDialog({ [this.tableData.rowKey]: data });
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
							value: "system:dictIndex:edit"
						}
					},
					[
						h(
							"a",
							{
								on: {
									click: () => {
										this.$refs.tablePage.removeTableData(params.row[this.tableData.rowKey]);
									}
								}
							},
							"删除"
						)
					]
				)
			];
			return h("div", { class: ["lx-actionbar"] }, buttons);
		},
		/**
		 * 重新加载父组件的表格数据
		 */
		reloadParentTalbeData() {
			this.$emit("loadTableData");
		},
		removeComplete() {
			this.reloadParentTalbeData();
		}
	},
	components: {
		DictItemAdd,
		DictItemEdit,
		DictItemDetail
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