<template>
	<Card>
		<div>
			<Modal v-model="dialog" title="字典类别新增" :width="1400" :mask-closable="false" @on-visible-change="visibleChange">
				<div class="cm-flex" style="justify-content: flex-end;">
					<div class="cm-flex" style="">
						<Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
					</div>
					<div class="cm-flex" style="">
						<div class="search-btn">
							<LxSelect :value.sync="tableData.query.dictItemCode" :url="this.globalActionUrl.system.dictItem.listDictIndexCode"></LxSelect>
						</div>
						<div class="search-btn">
							<Button type="default" icon="md-search" @click="loadTableData()">查询</Button>
						</div>
						<div class="search-btn">
							<Button type="default" icon="md-search" @click="reset()">重置</Button>
						</div>
					</div>
				</div>
				<div class="custom-layout">
					<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.dictItem.queryDictItemPage" :removeDataUrl="this.globalActionUrl.system.dictItem.removeDictItem" :columns="this.tableData.columns"></LxTablePage>
					<DictItemNew ref="newDialog" @loadTableData="loadTableData"></DictItemNew>
					<DictItemEdit ref="editDialog" @loadTableData="loadTableData"></DictItemEdit>
					<DictItemDetail ref="detailDialog" @loadTableData="loadTableData"></DictItemDetail>
				</div>
			</Modal>
		</div>
	</Card>
</template>
<script>
import DictItemNew from "./DictItemNew";
import DictItemEdit from "./DictItemEdit";
import DictItemDetail from "./DictItemDetail";
export default {
	created() {},
	mounted() {
		// this.initData();
	},
	data() {
		return {
			dialog: false,
			searchControlData: {},
			tableData: {
				rowKey: "dictItemId",
				query: {
					dictItemCode: null
				},
				columns: [
					{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "字典值",
						key: "dictItemKey",
						ellipsis: "true",
						width: 85
					},
					{
						title: "字典项",
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
		initData(dictIndexCode) {
			this.tableData.query.dictIndexCode = dictIndexCode;
			this.loadTableData(dictIndexCode);
		},
		loadTableData() {
			this.dialog = true;
			this.$refs.tablePage.loadTableData();
		},
		reset() {
			Object.keys(this.tableData.query).forEach(
				(key) => (this.tableData.query[key] = null)
			);
			this.loadTableData();
		},
		close() {
			this.dialog = false;
		},
		visibleChange(data) {
			if (!data) {
				this.close();
			}
		},
		showNewDialog() {
			this.$refs.newDialog.load(this.tableData.query.dictIndexCode);
		},
		showEditDialog(id) {
			this.$refs.editDialog.load(id);
		},
		showDetailForm(id) {
			this.$refs.detailDialog.load(id);
		},
		initOperateButton(h, params) {
			let buttons = [
				h(
					"Button",
					{
						props: {
							type: "default",
							size: "small",
							icon: "md-create"
						},
						style: {
							marginRight: "5px"
						},
						on: {
							click: () => {
								this.showEditDialog(params.row.dictItemId);
							}
						}
					},
					"编辑"
				),
				h(
					"Button",
					{
						props: {
							type: "default",
							size: "small",
							icon: "md-trash"
						},
						style: {
							marginRight: "5px"
						},
						on: {
							click: () => {
								this.remove(params.row.dictItemId);
							}
						}
					},
					"删除"
				)
			];
			return h("div", { style: { float: "left" } }, buttons);
		}
	},
	components: {
		DictItemNew,
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