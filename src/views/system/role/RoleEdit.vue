<template>
	<div>
		<div>
			<Form ref="form" :model="form" :label-width="80" :rules="validate">
				<FormItem label="角色编号" prop="roleCode">
					<Input v-model="form.roleCode" clearable></Input>
				</FormItem>
				<FormItem label="角色名称" prop="roleName">
					<Input v-model="form.roleName" clearable></Input>
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
	editRole,
	detailRole,
	existsRoleName,
	existsRoleCode
} from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			formControlData: {},
			dialog: false,
			form: {
				roleId: 0,
				roleCode: null,
				roleName: null,
				comment: null
			},
			validate: {
				roleName: [
					{
						required: true,
						message: "请输入角色名称",
						trigger: "blur"
					},
					{
						type: "string",
						min: 1,
						max: 12,
						message: "角色名称长度为1-12位",
						trigger: "blur"
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							if (value != null) {
								existsRoleName({
									roleName: value,
									roleId: this.form.roleId
								}).then((res) => {
									if (res) {
										callback(new Error("角色名称已存在，请重新输入"));
									} else {
										callback();
									}
								});
							}
						}
					}
				],
				roleCode: [
					{
						required: true,
						message: "请输入角色编号",
						trigger: "blur"
					},
					{
						type: "string",
						min: 1,
						max: 32,
						message: "角色编号长度为1-32位",
						trigger: "blur"
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							if (value != null) {
								existsRoleCode({
									roleName: value,
									roleId: this.form.roleId
								}).then((res) => {
									if (res) {
										callback(new Error("角色编号已存在，请重新输入"));
									} else {
										callback();
									}
								});
							}
						}
					}
				],
				comment: [
					{
						type: "string",
						max: 512,
						message: "备注最大长度为512个字符",
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		formInit(data) {
			this.loadDetailRole(data.roleId);
		},
		formClose() {
			this.$refs.form.resetFields();
			this.$emit("closeDialog");
		},
		formSave() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					editRole(this.form).then((res) => {
						this.formClose();
						this.$emit("loadTableData");
						this.$Message.success("提交成功");
					});
				}
			});
		},
		loadDetailRole(roleId) {
			detailRole({ roleId }).then((res) => {
				Object.keys(this.form).forEach((item) => {
					this.form[item] = res[item];
				})
				console.log(this.form);
			});
		}
	}
};
</script>
<style scorep>
</style>
