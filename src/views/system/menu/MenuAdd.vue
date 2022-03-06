<template>
	<div>
		<div class="lx-form" :style="{ height: '400px' }">
			<Form ref="form" :model="form" :label-width="80" :rules="validate">
				<FormItem label="父级菜单" prop="treeParentId">
					<LxTreeSelect :value.sync="form.treeParentId" :queryDataUrl="this.globalActionUrl.system.menu.queryMenuChildren" :treeFieldMap="{id: 'menuId', label: 'menuName'}"></LxTreeSelect>
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
					<LxSwitch :value.sync="form.menuEnable"></LxSwitch>
				</FormItem>
				<FormItem label="备注" prop="comment">
					<Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
				</FormItem>
			</Form>
		</div>
		<div class="lx-form-footer">
			<Button type="text" size="large" @click="formClose">取消</Button>
			<Button type="primary" size="large" @click="formSave">确定</Button>
		</div>
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
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			formControlData: {
				menuType: null,
				menuEnable: null
			},
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
		formInit() {
			this.loadMenuType();
			this.loadMenuEnable();
		},
		formClear() {
			this.$refs.form.resetFields();
		},
		formClose() {
			this.formClear();
			this.$emit("closeDialog");
		},
		formSave() {
			this.$refs.form.validate(valid => {
				if (valid) {
					saveMenu(this.form).then(res => {
						this.formClose();
						this.$emit("loadTableData");
						this.$Message.success("提交成功");
					});
				}
			});
		},
		loadMenuType() {
			queryDictItemAll({
				dictIndexCode: this.globalConsts.dictIndexCode.menuType
			}).then(res => {
				this.formControlData.menuType = this.globalHelper.mapKeyValue(
					res,
					"dictItemKey",
					"dictItemValue",
					true
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
</style>
