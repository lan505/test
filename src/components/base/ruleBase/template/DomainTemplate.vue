<template>
    <div class="domain">
        <Select class="lxSelect" v-model="classTemplate.targetType" style="width:100%" @on-change="initData">
            <Option v-for="item in targetTypeDataSource" :value="item.targetType" :key="item.targetType">{{ item.targetText }}</Option>
        </Select>
        <component ref="targetComponent" :is="currentTargetTypeDataSource.targetComponent" :targetTypeDataSource="this.targetTypeDataSource" :targetTemplate.sync="classTemplate.targetTemplate" @saveValidateResult="saveValidateResult" @changeTargetTemplateData="changeTargetTemplateData"></component>
    </div>
</template>
<script>
import SingleValueTemplate from "./SingleValueTemplate";
import MultiValueTemplate from "./MultiValueTemplate";
import BooleanValueTemplate from "./BooleanValueTemplate";
export default {
    created() {
        this.initData();
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
            // 当前加载显示的组件
            currentTargetTypeDataSource: {},
            // 子组件数据结构
            // targetTemplate: {
            // }
        };
    },
    props: {
        // 模板数据表单
        classTemplate: {},
    },
    methods: {
        // 初始化数据
        initData() {
            this.initDefaultObject();
            for (let obj of this.targetTypeDataSource) {
                if (this.classTemplate.targetType === obj.targetType) {
                    this.currentTargetTypeDataSource = obj;
                    break;
                }
            }
        },
        // 初始化默认的对象
        initDefaultObject() {
            if (Object.keys(this.classTemplate).length == 0) {
                this.$set(this.classTemplate, "targetType", this.targetTypeDataSource[0].targetType);
                this.$set(this.classTemplate, "targetClass", this.targetTypeDataSource[0].targetComponent);
                this.$set(this.classTemplate, "targetTemplate", {});
            }
        },
        /**
         * 校验子组件并获取数据
         */
        validateTargetTemplate() {
            this.$refs["targetComponent"].validateTargetTemplate();
        },
        // 子组件返回校验是否成功、数据对象的回调
        saveValidateResult(valid, data) {
            this.classTemplate.targetTemplate = data;
            this.$emit("saveValidateResult", valid);
        },
        // 改变目标模板数据
        changeTargetTemplateData(data) {
            this.$emit("changeTargetTemplateData", {
                targetType: this.currentTargetTypeDataSource.targetType,
                targetClass: this.currentTargetTypeDataSource.targetComponent,
                targetTemplate: data,
            });
        },
    },
    components: {
        SINGLE_VALUE: SingleValueTemplate,
        MULTI_VALUE: MultiValueTemplate,
        BOOLEAN_VALUE: BooleanValueTemplate,
    },
};
</script>
<style scorep>
.domain {
    width: 100%;
}
.lxSelect {
    margin-bottom: 10px;
}
</style>
