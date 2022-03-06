<template>
	<div>
		<div class="lx-form">
			<Form ref="form" :model="form" :label-width="80">
				<FormItem label="头像">
					<div class="avatar">
						<Avatar :src="form.userAvatar" size="80"></Avatar>
					</div>
				</FormItem>
				<FormItem label="名称">
					<Input v-model="form.userName" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="部门">
					<Input v-model="form.depart.departName" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="性别">
					<LxRadio :value.sync="form.userSex" :data="formControlData.userSex" class="lx-disable"></LxRadio>
				</FormItem>
				<FormItem label="所属角色">
					<LxCheckBox :value.sync="form.lsRoleId" :data="formControlData.roles" class="lx-disable"></LxCheckBox>
				</FormItem>
				<FormItem label="身份证号">
					<Input v-model="form.userIdentity" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="手机号码">
					<Input v-model="form.userMobile" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="出生年月">
					<Input v-model="form.userBirthday" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="状态">
					<LxRadio :value.sync="form.userUsageStatus" :data="formControlData.userUsageStatus" class="lx-disable"></LxRadio>
				</FormItem>
				<FormItem label="地址">
					<Input v-model="form.userAddress" class="lx-disable"></Input>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="form.comment" type="textarea" class="lx-disable" :autosize="{minRows: 3}"></Input>
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
	detailUser,
	queryRoleAll,
	queryDictItemAll
} from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			formControlData: {
				userSex: [],
				roles: []
			},
			form: {
				userAvatar: null,
				userAccount: null,
				userName: null,
				avatar: null,
				userIdentity: null,
				userMobile: null,
				userSex: null,
				lsRoleName: null,
				userBirthday: null,
				userAddress: null,
				usageStatus: null,
				comment: null,
				creator: null,
				createTime: null,
				editor: null,
				editTime: null
			}
		};
	},
	methods: {
		formInit(data) {
			this.loadDetailUser(data.userId);
			this.loadUserSex();
			this.loadUserUsageStatus();
			this.loadRole();
		},
		formClose() {
			this.$emit("closeDialog");
		},
		loadDetailUser(userId) {
			detailUser({ userId }).then(res => {
				this.form = res;
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
		loadRole() {
			queryRoleAll().then((res) => {
				this.formControlData.roles = this.globalHelper.mapKeyValue(
					res,
					"roleId",
					"roleName"
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
	}
};
</script>
<style scorep>
.avatar {
	width: 80px;
	height: 80px;
}
</style>
