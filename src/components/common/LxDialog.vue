<script>
import globalConsts from "@/assets/js/global/globalConsts";
export default {
	name: "LxDialog",
	created() { },
	mounted() {
		if (this.$slots.default) {
			var slotObject = this.$slots.default[0];
			var refName = slotObject.data.ref;
			this.slotInstance = slotObject.context.$refs[refName];
			this.slotInstance.$on("closeDialog", () => {
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
		 * 对话框操作模式（新增、编辑、详情其中一种）
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
		 * 对话框标题
		 */
		title: {
			type: String
		},
		/**
		 * 对话框宽度(当其值不大于 100 时以百分比显示，大于 100 时为像素)
		 */
		width: {
			type: Number,
			default() {
				return 70;
			}
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
			this.showDialog = false;
			this.slotInstance.formClear();
		},
		/**
		 * 初始化slot组件里的form表单方法
		 */
		formInit(data) {
			this.slotInstance.formInit(data);
		},
		getDialogMode(type) {
			var result = {
				type: null,
				props: {},
				style: {},
				class: [],
				event: {},
			};
			if (type === globalConsts.dialogOpenProcessType.dialog) {
				result.type = "Modal";
				result.props = {
					footerHide: true,
					maskClosable: false
				};
			} else if (type === globalConsts.dialogOpenProcessType.page) {
				result.type = "Page";
			} else if (type === globalConsts.dialogOpenProcessType.drawer) {
				result.type = "Drawer";
				result.props = {
					styles: {
						position: "static",
						paddingBottom: "53px"
					},
					inner: true,
					maskClosable: false
				};
			} else {
				console.error("dialogOpenProcessType exception");
			}
			result.props.width = this.width;
			result.event["on-visible-change"] = (data) => {
				// 如果是data=false，则代表关闭
				if (!data && this.showDialog) {
					this.closeDialog();
				}
			};
			return result;
		}
	},
	render(h) {
		console.log(this.$parent.$parent.$prop);
		
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
				class: Object.assign([], dialogInfo.class),
				style: Object.assign({}, dialogInfo.style),
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
</style>