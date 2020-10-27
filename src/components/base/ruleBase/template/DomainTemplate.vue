<template>
    <div style="">
        <LxSelect :value.sync="selectedItemNameType" :data="this.dataSource" bindKey="itemNameType" bindValue="itemNameText" @update:value="onChangeConfigType"></LxSelect>
    </div>
</template>
<script>
export default {
    created() {},
    data() {
        return {
            // 选中的名称类型
            selectedItemNameType: "HOST_LENGTH",
            // 数据源
            dataSource: [
                {
                    itemNameType: "HOST_LENGTH",
                    itemNameText: "域名长度",
                },
                {
                    itemNameType: "DOMAIN_EXPIRE_DAY",
                    itemNameText: "域名到期天数",
                },
                {
                    itemNameType: "DOMAIN_REGISTER_DAY",
                    itemNameText: "域名注册天数",
                },
                {
                    itemNameType: "DOMAIN_LEVEL",
                    itemNameText: "域名级数",
                },
                {
                    itemNameType: "DOMAIN_TOP",
                    itemNameText: "是否顶级域名",
                },
                {
                    itemNameType: "DOMAIN_SUFIXX",
                    itemNameText: "域名敏感后缀",
                },
                {
                    itemNameType: "DOMAIN_PROVIDER",
                    itemNameText: "域名注册服务商",
                },
                {
                    itemNameType: "DOMAIN_EXPIRE_DAY",
                    itemNameText: "域名特殊编码",
                },
                {
                    itemNameType: "DOMAIN_EXPIRE_DAY",
                    itemNameText: "域名品牌相似",
                },
            ],
        };
    },
    methods: {},
};
</script>
<style scorep>
</style>
