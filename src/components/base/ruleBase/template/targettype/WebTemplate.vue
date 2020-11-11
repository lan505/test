<template>
    <div class="domain">
        <LxSelect :value.sync="targetTemplate.targetType" :data="targetTypeDataSource" bindKey="targetType" bindValue="targetText" :clearable="false"></LxSelect>
        <component :is="targetTemplate.targetModel" :targetTypeDataSource="this.targetTypeDataSource" :targetTemplate.sync="targetTemplate"></component>
    </div>
</template>
<script>
import SingleValueTemplate from "../basetemplate/SingleValueTemplate";
import MultiValueTemplate from "../basetemplate/MultiValueTemplate";
import BooleanValueTemplate from "../basetemplate/BooleanValueTemplate";
export default {
    created() {
        console.log("created");
        console.log(this.targetTemplate);
    },
    mounted() {
        this.initTargetComponent();
        console.log("mounted");
        console.log(this.targetTemplate);
    },
    data() {
        return {
            // 数据源
            targetTypeDataSource: [
                {
                    targetType: "DOMAIN_LENGTH",
                    targetText: "域名长度",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "DOMAIN_EXPIRE_DAY",
                    targetText: "域名到期天数",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "DOMAIN_REGISTER_DAY",
                    targetText: "域名注册天数",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "DOMAIN_LEVEL",
                    targetText: "域名级数",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "DOMAIN_TOP",
                    targetText: "是否顶级域名",
                    targetComponent: "BOOLEAN_VALUE",
                },
                {
                    targetType: "DOMAIN_SUFIXX",
                    targetText: "域名敏感后缀",
                    targetComponent: "MULTI_VALUE",
                },
                {
                    targetType: "DOMAIN_PROVIDER",
                    targetText: "域名注册服务商",
                    targetComponent: "MULTI_VALUE",
                },
                {
                    targetType: "DOMAIN_ENCODE",
                    targetText: "域名特殊编码",
                    targetComponent: "MULTI_VALUE",
                },
                {
                    targetType: "DOMAIN_SIMILAR",
                    targetText: "域名品牌相似",
                    targetComponent: "MULTI_VALUE",
                },
            ],
        };
    },
    props:{
        // 模板数据表单
        targetTemplate: {},
    },
    methods: {
        // 初始化目标组件
        initTargetComponent() {
            debugger;
            // 如果没有targetType则设置默认第一个targetType
            if(this.targetTemplate.targetType === undefined){
                this.targetTemplate.targetType = this.targetTypeDataSource[0].targetType;
                this.targetTemplate.targetModel = this.targetTypeDataSource[0].targetComponent;
                return;
            }
            for(let obj of this.targetTypeDataSource) {
                if(this.targetTemplate.targetType === obj.targetType){
                    currentComponent = obj.targetComponent;
                    break;
                }
            }
        },
        // getTemplateForm() {
        //     this.$emit("update:value", this.templateForm);
        // }
    },
    components: {
        "SINGLE_VALUE": SingleValueTemplate,
        "MULTI_VALUE": MultiValueTemplate,
        "BOOLEAN_VALUE": BooleanValueTemplate,
    }
};
</script>
<style scorep>
.domain {
    width: 100%;
}
</style>
