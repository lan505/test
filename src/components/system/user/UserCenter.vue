<template>
    <div class="user-center">
        <div class="avatar-box">
            <img class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg">
        </div>
        <div class="avatar-upload">
            <Button>修改头像</Button>
        </div>
        <br>
        <Row :gutter="16" class="row">
            <Col span="2" class="col">
            <div>用户名:</div>
            </Col>
            <Col span="6">
            <div>张三</div>
            </Col>
        </Row>
        <Row :gutter="16" class="row">
            <Col span="2" class="col">
            <div>手机号码:</div>
            </Col>
            <Col span="6">
            <div>18800002222</div>
            </Col>
        </Row>
        <Row :gutter="16" class="row">
            <Col span="2" class="col">
            <div>描述:</div>
            </Col>
            <Col span="6">
            <div>三味书屋是晚清绍兴府城内著名私塾，也是鲁迅12岁至17岁求学的地方，位于都昌坊口11号。塾师寿镜吾(晚署镜湖)，是一位方正、质朴和博学的人。他的为人和治学精神，给鲁迅留下难忘的印象。寿镜吾在这里坐馆教书达60年，从房屋建筑到室内陈设以至周围环境，基本保持当年原面貌。三味书屋是三开间的小花厅，本是寿家的书房。坐东朝西，北临小河，与周家老台门隔河相望.</div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>
<style scoped>
.user-center {
    width: 100%;
    margin: auto;
}
.avatar-box {
    width: 100%;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50px;
}
.avatar-upload {
    width: 100%;
    text-align: center;
}
.col {
    text-align: right;
    font-family: "PingFang SC";
    font-weight: bold;
}
.table {
    margin-top: 10px;
    margin: auto;
}
</style>
