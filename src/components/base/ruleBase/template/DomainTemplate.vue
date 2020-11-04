<template>
    <div class="domain">
        <component :is="this.getComponent()" :targetTypeDataSource="this.targetTypeDataSource" :templateForm.sync="templateForm.obj"></component>
    </div>
</template>
<script>
import SingleValueTemplate from "./SingleValueTemplate";
import MultiValueTemplate from "./MultiValueTemplate";
import BooleanValueTemplate from "./BooleanValueTemplate";
export default {
    created() {
        
    },
    data() {
        return {
            // 数据源
            targetTypeDataSource: [
                {
                    targetType: "DOMAIN_LENGTH",
                    targetText: "域名长度",
                    targetComponent: "singleValue",
                },
                {
                    targetType: "DOMAIN_EXPIRE_DAY",
                    targetText: "域名到期天数",
                    targetComponent: "singleValue",
                },
                {
                    targetType: "DOMAIN_REGISTER_DAY",
                    targetText: "域名注册天数",
                    targetComponent: "singleValue",
                },
                {
                    targetType: "DOMAIN_LEVEL",
                    targetText: "域名级数",
                    targetComponent: "singleValue",
                },
                {
                    targetType: "DOMAIN_TOP",
                    targetText: "是否顶级域名",
                    targetComponent: "booleanValue",
                },
                {
                    targetType: "DOMAIN_SUFIXX",
                    targetText: "域名敏感后缀",
                    targetComponent: "multiValue",
                },
                {
                    targetType: "DOMAIN_PROVIDER",
                    targetText: "域名注册服务商",
                    targetComponent: "multiValue",
                },
                {
                    targetType: "DOMAIN_ENCODE",
                    targetText: "域名特殊编码",
                    targetComponent: "multiValue",
                },
                {
                    targetType: "DOMAIN_SIMILAR",
                    targetText: "域名品牌相似",
                    targetComponent: "multiValue",
                },
            ],
            form: {

            }
        };
    },
    props:{
        // 模板数据表单
        templateForm: {},
    },
    methods: {
        getComponent(targetType) {
            if(typeof(targetType) == "undefined"){
                targetType = this.targetTypeDataSource[0].targetType;
            }
            for(let obj of this.targetTypeDataSource) {
                if(obj.targetType === targetType){
                    return obj.targetComponent;
                }
            }
            
        },
    },
    components: {
        "singleValue": SingleValueTemplate,
        "multiValue": MultiValueTemplate,
        "booleanValue": BooleanValueTemplate,
    }
};
</script>
<style scorep>
.domain {
    width: 100%;
}
</style>
