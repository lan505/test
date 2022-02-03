<script>
import { DatePicker } from "view-design";
export default {
    extends: DatePicker,
    methods: {
        onChange(value, type) {
            console.log(value);
            console.log(type);
        },
        onOpenChange(data) {
            console.log(data);
        }
    }
};
</script>

<style scoped>
</style>
