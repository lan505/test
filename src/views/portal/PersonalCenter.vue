<template>
	<Card>
		<div>
			<div class="user-center">
				<h2>基本信息</h2>
				<br>
				<div class="userAvatar-box">
					<Avatar :src="loginInfo.userAvatar" size="100" />
				</div>
				<div class="userAvatar-box">
					<Button @click="openAvatarForm()">修改头像</Button>
					<Button @click="openPasswordForm()">修改密码</Button>
				</div>
				<br>
				<div class="base-info">
					<Form ref="form" :label-width="80">
						<FormItem label="名称">
							<Input v-model="loginInfo.userName" class="lx-disable"></Input>
						</FormItem>
						<FormItem label="部门">
							<Input v-model="loginInfo.departName" class="lx-disable"></Input>
						</FormItem>
						<FormItem label="性别">
							<LxRadio :value.sync="loginInfo.userSex" :data="formControlData.userSex" class="lx-disable"></LxRadio>
						</FormItem>
						<FormItem label="所属角色">
							<LxCheckBox :value.sync="loginInfo.lsRoleId" :data="formControlData.roles" class="lx-disable"></LxCheckBox>
						</FormItem>
						<FormItem label="身份证号">
							<Input v-model="loginInfo.userIdentity" class="lx-disable"></Input>
						</FormItem>
						<FormItem label="手机号码">
							<Input v-model="loginInfo.userMobile" class="lx-disable"></Input>
						</FormItem>
						<FormItem label="出生年月">
							<Input v-model="loginInfo.userBirthday" class="lx-disable"></Input>
						</FormItem>
						<FormItem label="状态">
							<LxRadio :value.sync="loginInfo.userUsageStatus" :data="formControlData.userUsageStatus" class="lx-disable"></LxRadio>
						</FormItem>
						<FormItem label="地址">
							<Input v-model="loginInfo.userAddress" class="lx-disable"></Input>
						</FormItem>
					</Form>
				</div>
				<LxCropper ref="lxCropper" @confirm="confirmAvatarForm"></LxCropper>
				<PasswordForm ref="passwordForm" @confirm="confirmPasswordForm"></PasswordForm>
			</div>
		</div>
	</Card>
</template>
<script>
import { INIT_USER_LOGIN_INFO } from "@/assets/js/global/globalMutationType";
import {
	queryLoginUserInfo,
	changeUserPassword,
	uploadUserAvatar,
	queryRoleAll,
	queryDictItemAll
} from "@/assets/js/api/requestSystem";
import PasswordForm from "./PasswordForm.vue";
import { mapState } from "vuex";
export default {
	created() { },
	mounted() {
		this.loadRole();
		this.loadUserSex();
		this.loadUserUsageStatus();
	},
	data() {
		return {
			formControlData: {
				userSex: null,
				roles: null,
				roles: null
			}
		};
	},
	methods: {
		// 重新加载用户信息
		reloadUserLoginInfo() {
			queryLoginUserInfo()
				.then(res => {
					this.$store.commit(INIT_USER_LOGIN_INFO, res);
				})
				.catch(error => {
					console.log(error);
				});
		},
		// 打开头像裁剪
		openAvatarForm() {
			this.$refs.lxCropper.dialog = true;
		},
		// 确认头像裁剪
		confirmAvatarForm(data) {
			let param = new FormData();
			param.append("file", data);
			uploadUserAvatar(param).then(res => {
				this.reloadUserLoginInfo();
				this.$Message.success("上传成功");
			});
		},
		// 打开修改密码
		openPasswordForm() {
			this.$refs.passwordForm.dialog = true;
		},
		// 确认修改密码
		confirmPasswordForm(data) {
			changeUserPassword(data)
				.then(res => {
					this.$refs.passwordForm.close();
					this.$Message.success("密码修改成功");
				})
				.catch(error => {

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
	},
	computed: {
		...mapState({
			loginInfo: state => state.user.loginInfo,
		})
	},
	components: {
		PasswordForm
	}
};
</script>
<style scoped>
.user-center {
	width: 100%;
	height: 100%;
}
.userAvatar-box {
	width: 100%;
	margin-left: 80px;
	margin-bottom: 20px;
}
.base-info {
	width: 400px;
}
.avatar-layout {
	display: flex;
	justify-content: space-around;
}
.cropper-box {
	width: 250px;
	height: 250px;
}
</style>
