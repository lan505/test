<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;">
					<Button type="primary" icon="md-add" @click="showNewDialog" v-permission="'system:dictIndex:save'">新增</Button>
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
		<div class="custom-layout">
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.dictIndex.queryDictIndexPage" :removeDataUrl="this.globalActionUrl.system.dictIndex.removeDictIndex" :columns="this.tableData.columns"></LxTablePage>
			<DictIndexNew ref="newDialog" @loadTableData="loadTableData"></DictIndexNew>
			<DictIndexEdit ref="editDialog" @loadTableData="loadTableData"></DictIndexEdit>
			<DictItemList ref="dictItemListDialog" @loadTableData="loadTableData"></DictItemList>
		</div>
	</div>
</template>
<script>
import DictIndexNew from "./DictIndexNew";
import DictIndexEdit from "./DictIndexEdit";
import DictItemList from "../dictItem/DictItemList";
export default {
	created() {},
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
						title: "字典类别编号",
						key: "dictIndexCode",
						ellipsis: "true",
						tooltip: "true",
						width: 100
					},
					{
						title: "字典类别名称",
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
						sortable: "custom",
						width: 120
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
						width: 100
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
		showNewDialog() {
			this.$refs.newDialog.load();
		},
		showEditDialog(id) {
			this.$refs.editDialog.load(id);
		},
		showDictItemListDialog(dictIndexCode) {
			this.$refs.dictItemListDialog.initData(dictIndexCode);
		},
		initOperateButton(h, params) {
			let buttons = [
				h(
					"a",
					{
						directives: [
							{
								name: "permission",
								value: "system:dictIndex:edit"
							}
						],
						style: {
							marginRight: "10px"
						},
						on: {
							click: () => {
								this.showDictItemListDialog(params.row.dictIndexCode);
							}
						}
					},
					"字典项"
				),
				h(
					"a",
					{
						directives: [
							{
								name: "permission",
								value: "system:dictIndex:edit"
							}
						],
						style: {
							marginRight: "10px"
						},
						on: {
							click: () => {
								this.showEditDialog(params.row.dictIndexId);
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
								value: "system:dictIndex:remove"
							}
						],
						style: {
							marginRight: "5px"
						},
						on: {
							click: () => {
								this.remove(params.row.dictIndexId);
							}
						}
					},
					"删除"
				)
			];
			return h("div", { style: { float: "left" } }, buttons);
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
		DictIndexNew,
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