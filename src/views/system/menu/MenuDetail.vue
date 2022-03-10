<template>
	<div>
		<div class="lx-form" :style="{ height: '400px' }">
			<Form ref="form" :model="form" :label-width="80">
				<FormItem label="父级菜单">
					<Input v-model.number="form.treeParent.menuName" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="菜单名称">
					<Input v-model="form.menuName" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="菜单URL">
					<Input v-model="form.menuAuthority" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="菜单路由">
					<Input v-model="form.menuRouter" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="菜单图标">
					<Input v-model="form.menuIcon" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="菜单类型">
					<LxRadio :value.sync="form.menuType" :data="formControlData.menuType" class="lx-disable"></LxRadio>
				</FormItem>
				<FormItem label="菜单排序">
					<Input v-model.number="form.menuSort" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="启用状态">
					<LxSwitch :value.sync="form.menuEnable" class="lx-disable"></LxSwitch>
				</FormItem>
				<FormItem label="创建人员">
					<Input v-model="form.creator.userName" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="创建时间">
					<Input v-model="form.creator.createTime" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="编辑人员">
					<Input v-model="form.editor.userName" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="编辑时间">
					<Input v-model="form.editor.createTime" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="form.comment" type="textarea" maxlength="512" class="lx-disable" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
				</FormItem>
			</Form>
		</div>
		<div class="lx-form-footer">
			<Button type="text" size="large" @click="formClose">取消</Button>
		</div>
	</div>
</template>
<script>
import {
	detailMenu,
	queryDictItemAll
} from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			formControlData: {
				menuType: null
			},
			form: {
				menuId: null,
				treeParentId: null,
				treeParent: {},
				menuName: null,
				menuParentId: null,
				menuAuthority: null,
				menuRouter: null,
				menuIcon: null,
				menuType: null,
				menuSort: null,
				menuEnable: null,
				creator: {},
				editor: {},
				comment: null
			},
		};
	},
	methods: {
		formInit(data) {
			this.loadDetailMenu(data.menuId);
			this.loadMenuType();
		},
		formClose() {
			this.$emit("closeDialog");
		},
		loadDetailMenu(menuId) {
			detailMenu({ menuId }).then((res) => {
				this.form = res;
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
		}
	},
};
</script>
<style scorep>
</style>
