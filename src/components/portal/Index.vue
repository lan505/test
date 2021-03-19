<template>
    <div>
        <div class="index-title">
            <div class="index-card">
                <Card style="width:200px">
                    <div class="total-data">
                        <h1>123</h1>
                        <h3>今日任务数</h3>
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card>
                    <div class="total-data">
                        <h1>123</h1>
                        <h3>今日域名数</h3>
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card>
                    <div style="total-data">
                        <h1>123</h1>
                        <h3>今日高风险数</h3>
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card>
                    <div class="total-data">
                        <h1>123</h1>
                        <h3>今日中风险数</h3>
                    </div>
                </Card>
            </div>
            <div class="index-card">
                <Card>
                    <div class="total-data">
                        <h1>123</h1>
                        <h3>今日低风险数</h3>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>
<style scoped>
.index-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 50px;
}
.index-card {
    width: 200px;
}
.total-data {
    color: #17233d;
    text-align: center;
}
</style>
