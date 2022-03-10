<template>
	<div class="table">
		<Table style="height: 100%;" :row-key="rowKey" :loading="this.tableData.loading" :columns="this.columns" :data="this.tableData.data" height="550" :load-data="onLoadChilren" @on-sort-change="onPageSort" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel">
		</Table>
		<div class="table-operate">
			<div class="table-remove">
				<div class="remove-box" :class="footToolBar.show ? '' : 'remove-hide'">
					<div><Button type="error" icon="md-trash" @click="removeTableData()">删除</Button></div>
					<div class="remove-desc">
						已选择 {{tableData.remove.ids.length}} 项
					</div>
				</div>
			</div>
			<div class="table-page">
				<Page class="page" :total="this.tableData.total" show-sizer show-total prev-text="上一页" next-text="下一页" @on-change="onPageIndex" @on-page-size-change="onPageSize" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from "@/assets/js/global/globalAxios";
export default {
	name: "LxTablePage",
	created() { },
	mounted() { },
	data() {
		return {
			tableData: {
				data: [],
				loading: true,
				total: 0,
				remove: {
					ids: []
				}
			},
			tablePage: {
				page: {
					current: 1,
					size: 10,
					orders: []
				}
			},
			footToolBar: {
				show: false
			}
		};
	},
	props: {
		/**
		 * 数据源的主键字段名
		 */
		rowKey: {
			type: String,
			default() {
				return "id";
			}
		},
		/**
		 * 查询参数
		 */
		queryParam: {
			type: Object,
			default() {
				return {};
			}
		},
		/**
		 * 查询数据url
		 */
		queryDataUrl: {
			type: String,
			default() {
				return "";
			}
		},
		/**
		 * 查询子节点数据url
		 */
		queryChildrenUrl: {
			type: String,
			default() {
				return "";
			}
		},
		/**
		 * 删除数据url
		 */
		removeDataUrl: {
			type: String,
			default() {
				return "";
			}
		},
		columns: {
			type: Array,
			default() {
				return [];
			}
		},
		children: {
			type: Array,
			default() {
				return [];
			}
		},
		/**
		 * 渲染表格数据方法
		 */
		renderTableData: {
			type: Function,
			default(data) {
				return data;
			}
		}
	},
	methods: {
		/**
		 * 加载表格数据
		 */
		loadTableData(param) {
			this.resetTableData();
			axios({
				url: this.queryDataUrl,
				method: "post",
				data: { ...this.queryParam, ...this.tablePage, ...param }
			})
				.then(res => {
					this.tableData.total = res == null ? 0 : res.total;
					this.tableData.data = this.renderTableData(res.records);
					this.resetPageOrder();
					this.resetRemoveIds();
					this.resetLoadingStatus();
				})
				.catch(error => {
					console.error(error);
					this.resetLoadingStatus();
				});
		},
		/**
		 * 重置表格加载中的状态
		 */
		resetLoadingStatus() {
			this.tableData.loading = false;
		},
		/**
		 * 重置分页排序
		 */
		resetPageOrder() {
			this.tablePage.page.orders = [];
		},
		/**
		 * 重置删除ID参数
		 */
		resetRemoveIds() {
			this.tableData.remove.ids = [];
			this.onFootToolBar();
		},
		/**
		 * 重置删除ID参数
		 */
		resetTableData() {
			this.tableData.data = [];
		},
		/**
		 * 删除表格数据
		 */
		removeTableData(...id) {
			if (id != null && id.filter(Boolean).length > 0) {
				this.tableData.remove.ids.push(...id);
			}
			if (this.tableData.remove.ids.length > 0) {
				this.$Modal.confirm({
					title: "提示框",
					content: "是否删除当前数据?",
					onOk: () => {
						axios({
							url: this.removeDataUrl,
							method: "post",
							data: this.tableData.remove
						}).then(res => {
							this.tableData.remove.ids = [];
							this.$Message.success("删除成功");
							this.loadTableData();
							this.$emit("removeComplete", true);
						});
					}
				});
			} else {
				this.$Message.info("请选择要删除的数据");
			}
		},
		/**
		 * 点击某一项
		 */
		onSelect(param, row) {
			this.tableData.remove.ids.push(row[this.rowKey]);
			this.onFootToolBar();
		},
		/**
		 * 取消某一项
		 */
		onSelectCancel(param, row) {
			this.tableData.remove.ids.splice(
				this.tableData.remove.ids.findIndex(
					item => item === row[this.rowKey]
				),
				1
			);
			this.onFootToolBar();
		},
		/**
		 * 点击全选
		 */
		onSelectAll(param) {
			for (let i = 0; i < param.length; i++) {
				this.tableData.remove.ids.push(param[i][this.rowKey]);
			}
			this.onFootToolBar();
		},
		/**
		 * 取消全选
		 */
		onSelectAllCancel() {
			this.resetRemoveIds();
		},
		/**
		 * 底部工具栏
		 */
		onFootToolBar() {
			this.footToolBar.show = this.ArrayUtil.isNotEmpty(
				this.tableData.remove.ids
			);
		},
		/**
		 * 分页排序
		 */
		onPageSort(param) {
			if (param.order != "normal") {
				this.tablePage.page.orders.push({
					column: param.key,
					asc: param.order == "asc"
				});
			}
			this.loadTableData();
		},
		/**
		 * 分页页码
		 */
		onPageIndex(param) {
			this.tablePage.page.current = param;
			this.loadTableData();
		},
		/**
		 * 分页大小
		 */
		onPageSize(param) {
			this.tablePage.page.size = param;
			this.loadTableData();
		},
		// 加载table的子节点数据
		onLoadChilren(item, callback) {
			axios({
				url: this.queryChildrenUrl,
				method: "get",
				params: { ...this.queryParam, [this.rowKey]: item[this.rowKey] }
			}).then(res => {
				this.renderTableData(res);
				callback(res);
			});
		}
	}
};
</script>

<style scoped>
.table {
	width: 100%;
	height: 100%;
}
.table-operate {
	display: flex;
	margin-top: 10px;
	height: 50px;
}
.table-remove {
	display: flex !important;
	align-items: center;
	background: #fff;
	font-size: 14px;
	margin-right: 20px;
	flex-grow: 1;
}
.remove-box {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: 4px;
	padding: 0 10px 0 10px;
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.308);
}
.remove-desc {
	font-size: 16px;
	margin-left: 16px;
}
.remove-hide {
	display: none !important;
}
.table-page {
	width: 480px;
	height: 100%;
}
.page {
	float: right;
}
</style>
