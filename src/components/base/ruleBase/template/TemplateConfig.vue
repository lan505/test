<template>
    <div>
        <Card style="width:350px;">
            <div slot="title">
                {{1}}
                <LxSelect :data="configType" bindKey="type" bindValue="title"></LxSelect>
                <Icon type="ios-trash-outline" size="24" color="red"/>
            </div>
            <ul>
                啥劳动法卡死
            </ul>
        </Card>
    </div>
</template>
<script>
export default {
    created() {},
    data() {
        return {
            // 规则配置数据源
            configType: [
                {
                    type: "domain",
                    title: "域名相关",
                },
                {
                    type: "host",
                    title: "主机相关",
                },
                {
                    type: "web",
                    title: "网页内容",
                },
            ],
            cityList: [
                {
                    value: "New York",
                    label: "New York",
                },
                {
                    value: "London",
                    label: "London",
                },
                {
                    value: "Sydney",
                    label: "Sydney",
                },
            ],
        };
    },
    methods: {},
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
}
</style>
