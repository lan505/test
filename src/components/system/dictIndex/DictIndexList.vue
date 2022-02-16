<template>
	<div>
		<Card>
			<div class="cm-flex row" style="width: 100%;">
				<div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.dictIndex.saveDictIndex)">
					<Button type="primary" icon="md-add" @click="showNewDialog">新增</Button>
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
						<Button type="default" icon="md-refresh" @click="refresh()">刷新</Button>
					</div>
					<div class="search-btn">
						<Button type="default" icon="md-search" @click="reset()">重置</Button>
					</div>
				</div>
			</div>
		</Card>
		<div class="custom-layout">
			<LxTablePage ref="tablePage" :rowKey="this.tableData.rowKey" :queryParam="this.tableData.query" :queryDataUrl="this.globalActionUrl.system.dictIndex.queryDictIndexPage" :queryChildrenUrl="this.globalActionUrl.system.dictIndex.queryDictIndexChildren" :removeDataUrl="this.globalActionUrl.system.dictIndex.removeDictIndex" :renderTableData="this.renderTableData" :columns="this.tableData.columns">
			</LxTablePage>
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
						width: 60,
						align: "center"
					},
					{
						title: "字典类别编号",
						key: "dictIndexCode",
						ellipsis: "true",
						tooltip: "true"
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
		refresh() {
			this.loadTableData();
		},
		showNewDialog() {
			this.$refs.newDialog.load();
		},
		showEditDialog(id) {
			this.$refs.editDialog.load(id);
		},
		showDictItemListDialog(dictIndexCode) {
			this.$refs.dictItemListDialog.load(dictIndexCode);
		},
		showButton(param) {
			return this.globalHelper.hasAuthority(this.$route.meta.button, param);
		},
		initOperateButton(h, params) {
			let buttons = [
				h(
					"a",
					{
						style: {
							marginRight: "10px",
							display: this.showButton(
								this.globalActionUrl.system.dictIndex.editDictIndex
							)
								? "inline"
								: "none"
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
						style: {
							marginRight: "10px",
							display: this.showButton(
								this.globalActionUrl.system.dictIndex.editDictIndex
							)
								? "inline"
								: "none"
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
						style: {
							marginRight: "5px",
							display: this.showButton(
								this.globalActionUrl.system.dictIndex.removeDictIndexDictIndex
							)
								? "inline"
								: "none"
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