<template>
    <div style="">
        <!-- <LxSelect :value.sync="selecteditemType" :data="this.itemTypeDataSource" bindKey="itemType" bindValue="itemText" @update:value="onChangeConfigType"></LxSelect> -->
        <component :is="this.getComponent()"></component>
    </div>
</template>
<script>
export default {
    created() {
        console.log('加载域名组件模板');
    },
    data() {
        return {
            // 选中的名称类型
            selecteditemType: "DOMAIN_LENGTH",
            // 数据源
            itemTypeDataSource: [
                {
                    itemType: "DOMAIN_LENGTH",
                    itemText: "域名长度",
                    itemComponent: "SingleValueTemplate",
                },
                {
                    itemType: "DOMAIN_EXPIRE_DAY",
                    itemText: "域名到期天数",
                    itemComponent: "SingleValueTemplate",
                },
                {
                    itemType: "DOMAIN_REGISTER_DAY",
                    itemText: "域名注册天数",
                    itemComponent: "SingleValueTemplate",
                },
                {
                    itemType: "DOMAIN_LEVEL",
                    itemText: "域名级数",
                    itemComponent: "SingleValueTemplate",
                },
                {
                    itemType: "DOMAIN_TOP",
                    itemText: "是否顶级域名",
                    itemComponent: DomainExpireDay,
                },
                {
                    itemType: "DOMAIN_SUFIXX",
                    itemText: "域名敏感后缀",
                    itemComponent: DomainExpireDay,
                },
                {
                    itemType: "DOMAIN_PROVIDER",
                    itemText: "域名注册服务商",
                    itemComponent: DomainExpireDay,
                },
                {
                    itemType: "DOMAIN_EXPIRE_DAY",
                    itemText: "域名特殊编码",
                    itemComponent: DomainExpireDay,
                },
                {
                    itemType: "DOMAIN_EXPIRE_DAY",
                    itemText: "域名品牌相似",
                    itemComponent: DomainExpireDay,
                },
            ],
            form: {

            }
        };
    },
    methods: {
        getComponent(itemType) {
                console.log(itemType);
            if(itemType === null){
                itemType = this.selecteditemType;
                console.log("itemType为空");
            }
            console.log("加载具体组件1：" + this.selecteditemType);
            console.log("加载具体组件2：" + itemType);
            for(let obj of this.itemTypeDataSource) {
                if(obj.itemType === itemType){
                    return obj.itemComponent;
                }
            }
            
        }
    },
    components: {
    }
};
</script>
<style scorep>
</style>
