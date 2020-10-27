<template>
    <div>
        <div class="item-select-control">
            <LxSelect :value.sync="selectItemType" :data="this.configType" bindKey="itemType" bindValue="itemTitle" @update:value="onChangeConfigType"></LxSelect>
        </div>
    </div>
</template>
<script>
export default {
    created() {},
    data() {
        return {
            control: {
                valueType: {
                    boolean: "boolean",
                    string: "string",
                    array: "array",
                    int: "int"
                },
                logicType: {
                    lt: ">",
                    gt: "<",
                    eq: "=",
                    or: "or",
                    in: "all",
                    in: "all"
                },
                dataSource: [
                    {
                        itemNameType: "HOST_LENGTH",
                        itemNameText: "域名长度",
                        itemValueType: valueType.int,
                    },
                    {
                        itemNameType: "DOMAIN_EXPIRE_DAY",
                        itemNameText: "域名到期天数",
                        itemValueType: valueType.int,
                    },
                    {
                        itemNameType: "DOMAIN_REGISTER_DAY",
                        itemNameText: "域名注册天数",
                        itemValueType: valueType.int,
                    },
                    {
                        itemNameType: "DOMAIN_LEVEL",
                        itemNameText: "域名级数",
                        itemValueType: valueType.int,
                    },
                    {
                        itemNameType: "DOMAIN_TOP",
                        itemNameText: "是否顶级域名",
                        itemValueType: valueType.boolean,
                    },
                    {
                        itemNameType: "DOMAIN_SUFIXX",
                        itemNameText: "域名敏感后缀",
                        itemValueType: logicType.array,
                    },
                    {
                        itemNameType: "DOMAIN_PROVIDER",
                        itemNameText: "域名注册服务商",
                        itemValueType: logicType.array,
                    },
                    {
                        itemNameType: "DOMAIN_EXPIRE_DAY",
                        itemNameText: "域名特殊编码",
                        itemValueType: logicType.array,
                    },
                    {
                        itemNameType: "DOMAIN_EXPIRE_DAY",
                        itemNameText: "域名品牌相似",
                        itemValueType: logicType.array,
                    },
                ]
            },
            form: {
                ruleBaseItemType: null,
                ruleBaseItemLogic: null,
                ruleBaseItemValue: null,
            },
        };
    },
    methods: {

    },
};
</script>
<style scorep>
</style>
