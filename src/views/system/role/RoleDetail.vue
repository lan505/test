<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-01-13 17:20:26
-->
<template>
	<div>
		<div class="lx-form">
			<Form ref="form" :model="form" :label-width="80">
				<FormItem label="角色编号">
					<Input v-model="form.roleCode" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="角色名称">
					<Input v-model="form.roleName" class="lx-disable"></Input>
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
					<Input v-model="form.comment" type="textarea" class="lx-disable" :autosize="{minRows: 5, maxRows: 5}"></Input>
				</FormItem>
			</Form>
		</div>
		<div class="lx-form-footer">
			<Button type="text" size="large" @click="formClose">取消</Button>
		</div>
	</div>
</template>
<script>
import { detailRole } from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			form: {
				roleName: null,
				roleCode: null,
				comment: null,
				creator: null,
				editor: null,
			},
		};
	},
	methods: {
		formInit(data) {
			this.loadDetailRole(data.roleId);
		},
		formClose() {
			this.$emit("closeDialog");
		},
		loadDetailRole(roleId) {
			detailRole({ roleId }).then((res) => {
				this.form = res;
			});
		}
	},
};
</script>
<style scorep>
</style>
