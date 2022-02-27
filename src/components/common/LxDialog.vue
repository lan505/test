<script>
import globalConsts from "@/assets/js/global/globalConsts";
export default {
	name: "LxDialog",
	created() { },
	mounted() { },
	data() {
		return {
			showDialog: false,
		}
	},
	methods: {
		open(id) {
			this.showDialog = true;
			console.log("open");
			// this.$refs[this.formRefName].formInit();
			console.log(this.$slots.default[0]);
			console.log(this.$slots.default[0].data.ref[this.formRefName]);
			this.formInit();
		},
		closeDialog() {
			this.showDialog = false;
			// this.$refs[this.formRefName].resetDialogForm();
		},
		formInit() {
			var refName = this.$slots.default[0].data.ref;
			this.$slots.default[0].context.$refs[refName].formInit();
		},
		getDialogMode(type) {
			var result = {
				type: null,
				props: {

				}
			};
			if (type === globalConsts.dialogOpenProcessType.dialog) {
				result.type = "Modal";
				result.props = {
					footerHide: true
				};
				result.event = {
					"on-cancel": () => {
						this.closeDialog();
					}
				};
			} else if (type === globalConsts.dialogOpenProcessType.page) {
				result.type = "Page";
			} else if (type === globalConsts.dialogOpenProcessType.drawer) {
				result.type = "Drawer";
				result.props = {
					maskClosable: false,
					width: 70
				};
				result.event = {
					"on-close": () => {
						this.closeDialog();
					}
				};
			} else {
				console.error("dialogOpenProcessType exception");
			}
			result.event["on-visible-change"] = (data) => {
				// 如果是false，则代表关闭
				if (!data) {
					this.closeDialog();
				}
			}
			return result;
		}
	},
	props: {
		/**
		 * 操作模式：新增、编辑、详情
		 */
		mode: {
			type: String,
			validator: function (value) {
				return value === globalConsts.operateButtonProcessType.add ||
					value === globalConsts.operateButtonProcessType.edit ||
					value === globalConsts.operateButtonProcessType.detail;
			},
		},
		title: {
			type: String
		}
	},
	render(h) {
		console.log("render");
		console.log(this.$slots.default[0]);
		var loginInfo = this.$store.state.user.loginInfo;
		var dialogAdd = loginInfo.systemCustomData.dialogAddProcessType;
		var dialogEdit = loginInfo.systemCustomData.dialogEditProcessType;
		var dialogDetail = loginInfo.systemCustomData.dialogDetailProcessType;
		var dialogInfo = null;
		if (this.mode === globalConsts.operateButtonProcessType.add) {
			dialogInfo = this.getDialogMode(dialogAdd);
		} else if (this.mode === globalConsts.operateButtonProcessType.edit) {
			dialogInfo = this.getDialogMode(dialogEdit);
		} else if (this.mode === globalConsts.operateButtonProcessType.detail) {
			dialogInfo = this.getDialogMode(dialogDetail);
		} else {
			console.error("operateButtonProcessType is error");
		}
		return h(dialogInfo.type,
			{
				props: Object.assign({}, dialogInfo.props, {
					value: this.showDialog,
					title: this.title
				}),
				on: Object.assign({}, dialogInfo.event)
			}, this.$slots.default);
	},
	renderError(h, err) {
		return h('pre', { style: { color: 'red' } }, err.stack)
	}
};
</script>

<style scoped>
</style>