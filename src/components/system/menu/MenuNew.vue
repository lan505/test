<template>
	<div>
		<Modal v-model="dialog" title="菜单新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
			<div class="form scroll">
				<Form ref="form" :model="form" :label-width="80" :rules="validate">
					<FormItem label="父级菜单" prop="treeParentId">
						<Treeselect v-model="form.treeParentId" :options="formControlData.treeParent" :normalizer="normalizerTreeMenuParent" :autoLoadRootOptions="false" loadingText="搜索中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
					</FormItem>
					<FormItem label="菜单名称" prop="menuName">
						<Input v-model="form.menuName" clearable></Input>
					</FormItem>
					<FormItem label="菜单权限" prop="menuAuthority">
						<Input v-model="form.menuAuthority" clearable></Input>
					</FormItem>
					<FormItem label="菜单路由" prop="menuRouter">
						<Input v-model="form.menuRouter" clearable></Input>
					</FormItem>
					<FormItem label="菜单图标" prop="menuIcon">
						<Input v-model="form.menuIcon" clearable></Input>
					</FormItem>
					<FormItem label="菜单类型" prop="menuType">
						<LxRadio :value.sync="form.menuType" :data="formControlData.menuType"></LxRadio>
					</FormItem>
					<FormItem label="菜单排序" prop="menuSort">
						<Input v-model.number="form.menuSort" clearable></Input>
					</FormItem>
					<FormItem label="启用状态" prop="menuEnable">
						<LxSwitch :value.sync="form.menuEnable" :data="formControlData.menuEnable"></LxSwitch>
					</FormItem>
					<FormItem label="备注" prop="comment">
						<Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="close">取消</Button>
				<Button type="primary" size="large" @click="save">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import {
	saveMenu,
	queryMenuTreeNode,
	existsMenuName,
	existsMenuRouter,
	queryDictItemAll
} from "@/assets/js/api/requestSystem";
export default {
	created() { },
	data() {
		return {
			formControlData: {
				menuType: null,
				menuEnable: null,
				treeParent: null
			},
			dialog: false,
			form: {
				treeParentId: null,
				menuName: null,
				menuAuthority: null,
				menuRouter: null,
				menuIcon: null,
				menuType: null,
				menuSort: null,
				menuEnable: 0,
				comment: null
			},
			validate: {
				menuName: [
					{
						required: true,
						message: "请输入菜单名称",
						trigger: "blur"
					},
					{
						min: 1,
						max: 32,
						message: "菜单名称长度为1-3位",
						trigger: "blur"
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							this.verifyMenuName(rule, value, callback);
						}
					}
				],
				menuRouter: [
					{
						max: 32,
						message: "菜单路由长度为32位",
						trigger: "blur"
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							this.verifyMenuRouter(rule, value, callback);
						}
					}
				],
				menuIcon: [
					{
						min: 1,
						max: 32,
						message: "菜单图标长度为1-32位",
						trigger: "blur"
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							this.verifyMenuRouter(rule, value, callback);
						}
					}
				],
				menuType: [
					{
						required: true,
						type: "number",
						message: "请选择菜单类型",
						trigger: "change"
					}
				],
				menuSort: [
					{
						type: "number",
						message: "请输入数字",
						trigger: "blur"
					}
				],
				comment: [
					{
						max: 512,
						message: "备注最大长度为512个字符",
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		load() {
			this.dialog = true;
			this.loadMenuType();
			this.loadMenuEnable();
			this.loadTreeMenuParent();
		},
		close() {
			this.$refs.form.resetFields();
			this.dialog = false;
		},
		save() {
			this.$refs.form.validate(valid => {
				if (valid) {
					saveMenu(this.form).then(res => {
						this.close();
						this.$emit("loadTableData");
						this.$Message.success("提交成功");
					});
				}
			});
		},
		visibleChange(data) {
			if (!data) {
				this.close();
			}
		},
		loadMenuType() {
			queryDictItemAll({
				dictIndexCode: this.globalConsts.dictIndexCode.menuType
			}).then(res => {
				this.formControlData.menuType = this.globalHelper.mapKeyValue(
					res,
					"dictItemKey",
					"dictItemValue"
				);
			});
		},
		loadMenuEnable() {
			queryDictItemAll({
				dictIndexCode: this.globalConsts.dictIndexCode.boolean
			}).then(res => {
				this.formControlData.menuEnable = this.globalHelper.mapKeyValue(
					res,
					"dictItemKey",
					"dictItemValue",
					true
				);
			});
		},
		loadTreeMenuParent() {
			queryMenuTreeNode().then(res => {
				this.formControlData.treeParent = res;
				console.log("queryMenuTreeNode");
				console.log(this.formControlData.treeParent);
			});
		},
		normalizerTreeMenuParent(node) {
			console.log("normalizerTreeMenuParent");
			console.log(node);
			return {
				id: node.id,
				label: node.title,
				children: node.children
			};
		},
		verifyMenuName(rule, value, callback) {
			if (value != null) {
				existsMenuName({
					menuName: value
				}).then(res => {
					if (res) {
						callback(new Error("菜单名称已存在，请重新输入"));
					} else {
						callback();
					}
				});
			} else {
				callback();
			}
		},
		verifyMenuRouter(rule, value, callback) {
			if (value != null) {
				existsMenuRouter({
					menuRouter: value
				}).then(res => {
					if (res) {
						callback(new Error("菜单路由已存在，请重新输入"));
					} else {
						callback();
					}
				});
			} else {
				callback();
			}
		}
	}
};
</script>
<style scorep>
.form {
	width: 100%;
	height: 400px;
	overflow-y: auto;
	padding-right: 15px;
}
</style>
