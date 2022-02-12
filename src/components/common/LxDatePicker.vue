<script>
import { DatePicker } from "view-design";
export default {
    name: "LxDatePicler",
    extends: DatePicker,
    methods: {
        // 重写方法
        emitChange(type) {
            this.$nextTick(() => {
                this.$emit("on-change", this.publicStringValue, type);
                this.dispatch(
                    "FormItem",
                    "on-form-change",
                    this.publicStringValue
                );
            });
            this.bindParentValue(this.publicStringValue);
        },
        // 自定义绑定父组件value方法
        bindParentValue(data) {
            this.$emit("update:value", data);
        }
    }
};
</script>

<style scoped>
</style>
