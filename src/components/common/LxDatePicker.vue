<script>
import { DatePicker } from "view-design";
export default {
	name: "LxDatePicler",
	extends: DatePicker,
	props: {
		lxValue: null
	},
	methods: {
		// 重写方法
		emitChange(type) {
			this.$nextTick(() => {
				this.$emit("on-change", this.publicStringValue, type);
				this.dispatch("FormItem", "on-form-change", this.publicStringValue);
                this.bindParentValue(this.publicStringValue);
			});
		},
		// 自定义绑定父组件value方法
		bindParentValue(data) {
			this.$emit("update:lxValue", data);
		}
	},
	watch: {
		lxValue: {
			immediate: true,
			handler() {
				this.value = this.lxValue;
			}
		}
	}
};
</script>

<style scoped>
</style>
