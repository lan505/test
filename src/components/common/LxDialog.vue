<script>
import globalConsts from "@/assets/js/global/globalConsts";
export default {
	name: "LxDialog",
	created() {},
	mounted() {
		if (this.$slots.default) {
			var slotObject = this.$slots.default[0];
			var refName = slotObject.data.ref;
			this.slotInstance = slotObject.context.$refs[refName];
			this.slotInstance.$on("closeDialog", () => {
				console.log("emit closeDialog");
				this.closeDialog();
			});
		}
	},
	data() {
		return {
			/**
			 * 是否显示对话框
			 */
			showDialog: false,
			/**
			 * slot实例
			 */
			slotInstance: null
		};
	},
	props: {
		/**
		 * 操作模式：新增、编辑、详情
		 */
		mode: {
			type: String,
			validator: function (value) {
				return (
					value === globalConsts.operateButtonProcessType.add ||
					value === globalConsts.operateButtonProcessType.edit ||
					value === globalConsts.operateButtonProcessType.detail
				);
			}
		},
		/**
		 * 标题
		 */
		title: {
			type: String
		}
	},
	methods: {
		/**
		 * 打开对话框
		 */
		openDialog(data) {
			this.showDialog = true;
			this.formInit(data);
		},
		/**
		 * 关闭对话框
		 */
		closeDialog() {
			console.log("closeDialog");
			this.showDialog = false;
		},
		/**
		 * 初始化slot组件里的form表单方法
		 */
		formInit(data) {
			var refName = this.$slots.default[0].data.ref;
			this.$slots.default[0].context.$refs[refName].formInit(data);
		},
		getDialogMode(type) {
			var result = {
				type: null,
				props: {}
			};
			if (type === globalConsts.dialogOpenProcessType.dialog) {
				result.type = "Modal";
				result.props = {
					footerHide: true
				};
				// result.event = {
				// 	"on-cancel": () => {
				// 		console.log("on-cancel");
				// 		this.closeDialog();
				// 	}
				// };
			} else if (type === globalConsts.dialogOpenProcessType.page) {
				result.type = "Page";
			} else if (type === globalConsts.dialogOpenProcessType.drawer) {
				result.type = "Drawer";
				result.props = {
					maskClosable: false,
					width: 70
				};
				// result.event = {
				// 	"on-close": () => {
				// 		console.log("on-close");
				// 		this.closeDialog();
				// 	}
				// };
			} else {
				console.error("dialogOpenProcessType exception");
			}
			result.event["on-visible-change"] = (data) => {
				// 如果是false，则代表关闭
				if (!data) {
					console.log("on-visible-change");
					this.closeDialog();
				}
			};
			return result;
		}
	},
	render(h) {
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
		return h(
			dialogInfo.type,
			{
				props: Object.assign({}, dialogInfo.props, {
					value: this.showDialog,
					title: this.title
				}),
				on: Object.assign({}, dialogInfo.event)
			},
			this.$slots.default
		);
	},
	renderError(h, err) {
		return h("pre", { style: { color: "red" } }, err.stack);
	}
};
</script>

<style scoped>
.ivu-modal-wrap {
	width: 500px;
}
</style>