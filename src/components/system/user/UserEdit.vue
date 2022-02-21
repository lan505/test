<template>
	<div>
		<Modal v-model="dialog" title="用户编辑" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
			<Form class="form scroll" ref="form" :model="form" :label-width="80" :rules="validate">
				<FormItem label="名称" prop="userName">
					<Input v-model="form.userName" clearable></Input>
				</FormItem>
				<FormItem label="部门" prop="departId">
					<LxTreeSelect :value.sync="form.departId" :valueObject="form.depart" :queryDataUrl="this.globalActionUrl.system.depart.queryDepartChildren" :treeFieldMap="{id: 'departId', label: 'departName'}"></LxTreeSelect>
				</FormItem>
				<FormItem label="性别" prop="userSex">
					<LxRadio :value.sync="form.userSex" :data="formControlData.userSex"></LxRadio>
				</FormItem>
				<FormItem label="所属角色" prop="lsRoleId">
					<LxCheckBox :value.sync="form.lsRoleId" :data="formControlData.roles"></LxCheckBox>
				</FormItem>
				<FormItem label="身份证号" prop="userIdentity">
					<Input v-model="form.userIdentity" clearable></Input>
				</FormItem>
				<FormItem label="手机号码" prop="userMobile">
					<Input v-model="form.userMobile" clearable></Input>
				</FormItem>
				<FormItem label="出生年月" prop="userBirthday">
					<LxDatePicker :value.sync="form.userBirthday" type="date" format="yyyy-MM-dd"></LxDatePicker>
				</FormItem>
				<FormItem label="状态" prop="userUsageStatus">
					<LxRadio :value.sync="form.userUsageStatus" :data="formControlData.userUsageStatus" :toInt="true"></LxRadio>
				</FormItem>
				<FormItem label="地址" prop="userAddress">
					<Input v-model="form.userAddress"></Input>
				</FormItem>
				<FormItem label="备注" prop="comment">
					<Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="text" size="large" @click="close">取消</Button>
				<Button type="primary" size="large" @click="save">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import {
	editUser,
	detailUser,
	queryRoleAll,
	existsUserName,
	queryDictItemAll
} from "@/assets/js/api/requestSystem";
export default {
	created() {},
	data() {
		return {
			formControlData: {
				userSex: [],
				userUsageStatus: [],
				roles: []
			},
			dialog: false,
			form: {
				userId: null,
				userName: null,
				departId: null,
				lsRoleId: [],
				userSex: null,
				userMobile: null,
				userIdentity: null,
				userAddress: null,
				userBirthday: null,
				userUsageStatus: null,
				comment: null
			},
			validate: {
				userName: [
					{
						required: true,
						message: "请输入名称",
						trigger: "blur"
					},
					{
						type: "string",
						min: 2,
						max: 32,
						message: "名称长度为2-32位",
						trigger: "blur"
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							this.verifyUserName(rule, value, callback);
						}
					}
				],
				departId: [
					{
						required: true,
						type: "string",
						message: "请选择部门",
						trigger: "blur"
					}
				],
				lsRoleId: [
					{
						required: true,
						type: "array",
						message: "请选择角色",
						trigger: "change"
					}
				],
				userSex: [
					{
						required: true,
						type: "number",
						message: "请选择性别",
						trigger: "change"
					}
				],
				userMobile: [
					{
						required: true,
						message: "请输入手机号码",
						trigger: "blur"
					},
					{
						type: "string",
						min: 11,
						max: 11,
						message: "手机号码为11位",
						trigger: "blur"
					}
				],
				userIdentity: [
					{
						type: "string",
						min: 18,
						max: 18,
						message: "身份证号为18位",
						trigger: "blur"
					}
				],
				userBirthday: [
					{
						type: "string",
						message: "请选择出生日期",
						trigger: "change"
					}
				],
				userAddress: [
					{
						type: "string",
						max: 256,
						message: "地址最大长度为256个字符",
						trigger: "blur"
					}
				],
				userUsageStatus: [
					{
						required: true,
						type: "number",
						message: "请选择状态",
						trigger: "change"
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
		load(userId) {
			this.dialog = true;
			this.loadDetailUser(userId);
			this.loadUserSex();
			this.loadUserUsageStatus();
			this.loadRoleKeyValue();
		},
		close() {
			this.$refs.form.resetFields();
			this.dialog = false;
		},
		save() {
            console.log(this.form);
			// this.$refs.form.validate((valid) => {
			// 	if (valid) {
			// 		editUser(this.form).then((res) => {
			// 			this.close();
			// 			this.$emit("loadTableData");
			// 			this.$Message.success("提交成功");
			// 		});
			// 	}
			// });
		},
		visibleChange(data) {
			if (!data) {
				this.close();
			}
		},
		loadDetailUser(data) {
			detailUser({ userId: data }).then((res) => {
				this.form = res;
				this.form.lsRoleId = res.lsRole.map((item) => item.roleId);
				this.form.departId = res.depart.departId;
			});
		},
		loadUserSex() {
			queryDictItemAll({
				dictIndexCode: this.globalConsts.dictIndexCode.userSex
			}).then((res) => {
				this.formControlData.userSex = this.globalHelper.mapKeyValue(
					res,
					"dictItemKey",
					"dictItemValue",
					true
				);
			});
		},
		loadUserUsageStatus() {
			queryDictItemAll({
				dictIndexCode: this.globalConsts.dictIndexCode.userUsageStatus
			}).then((res) => {
				this.formControlData.userUsageStatus = this.globalHelper.mapKeyValue(
					res,
					"dictItemKey",
					"dictItemValue",
					true
				);
			});
		},
		loadRoleKeyValue() {
			queryRoleAll().then((res) => {
				this.formControlData.roles = this.globalHelper.mapKeyValue(
					res,
					"roleId",
					"roleName"
				);
			});
		},
		verifyUserName(rule, value, callback) {
			if (value != null) {
				existsUserName({
					userId: this.form.userId,
					userName: value
				}).then((res) => {
					if (res) {
						callback(new Error("名称已存在，请重新输入"));
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
	padding-right: 15px;
}
</style>
