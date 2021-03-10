<template>
    <div>
        任务详情页即将接入，敬请关注。123 456
    </div>
</template>
<script>
import TaskBaseNew from "./TaskBaseNew";
import { taskBaseList } from "@/assets/js/api/baseModuleApi";
export default {
    created() {
        this.initData();
    },
    data() {
        return {
            
        };
    },
    methods: {
        initData() {
            this.loadList();
        },
        loadList() {
            taskBaseList(this.tableData.query).then((res) => {
                this.tableData.total = res == null ? 0 : res.total;
                this.tableData.data = res == null ? [] : res.records;
                this.tableData.loading = false;
                this.loadCompleted();
            });
        },
    },
    components: {
        TaskBaseNew,
    },
};
</script>
<style scoped>
.save-btn {
    width: 10%;
    float: left;
}
.search-tool {
    width: 90%;
    text-align: right;
}
.search-btn {
    margin-left: 10px;
}
.hide-check-box {
    display: none;
}
</style>