<script>
import globalConsts from "@/assets/js/global/globalConsts";
import { Message } from "view-design";
export default {
	name: "LxAuth",
	props: {
		value: {
			type: String,
			default() {
				return "";
			},
		}
	},
	render(h) {
		var loginInfo = this.$store.state.user.loginInfo;
		var hasPermission = loginInfo.lsAuthString.indexOf(this.value) > -1;
		if (hasPermission) {
			return h('div', { class: ["lx-actionbar-item"] }, this.$slots.default);
		} else {
			var permissionProcessType = loginInfo.systemCustomData.permissionProcessType;
			if (permissionProcessType === globalConsts.permissionProcessType.hide) {
				return h('div', this.$slots.deny);
			} else if (permissionProcessType === globalConsts.permissionProcessType.show) {
				return h('div', {
					class: ["lx-auth-wrapper lx-actionbar-item"],
					on: {
						click: () => {
							Message.warning("权限不足");
						}
					}
				}, [
					h('div', this.$slots.default)
				]);
			}
		}
	}
};
</script>

<style scoped>
</style>