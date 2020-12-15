<template>
    <div class="class-template">
        <div style="width: 540px;">
            <div style="width: 100%;">
                <LxSelect class="lxSelect" :value.sync="classTemplate.targetType" :data="targetTypeDataSource" bindKey="targetType" bindValue="targetText" :clearable="false" @update:value="targetTypeOnchange"></LxSelect>
            </div>
            <div style="width: 100%;">
                <component ref="targetComponent" :key="refresh" :is="currentTargetTypeDataSource.targetComponent" :selectedTargetType="selectedTargetType" :targetTemplate.sync="classTemplate.targetTemplate" @saveValidateResult="saveValidateResult" @changeTargetTemplateData="changeTargetTemplateData"></component>
            </div>
        </div>
    </div>
</template>
<script>
import SingleValueTemplate from "../basetemplate/SingleValueTemplate";
import MultiValueTemplate from "../basetemplate/MultiValueTemplate";
import BooleanValueTemplate from "../basetemplate/BooleanValueTemplate";
import DefaultValueTemplate from "../basetemplate/DefaultValueTemplate";
export default {
    created() {
        this.initData();
    },
    data() {
        return {
            // 数据源
            targetTypeDataSource: [
                {
                    targetType: "WEB_EXTERNAL_LINKS",
                    targetText: "外链数量",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "WEB_EMPTY_LINKS",
                    targetText: "空链数量",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "WEB_ICON",
                    targetText: "icon信息",
                    targetComponent: "DEFAULT_VALUE",
                },
                {
                    targetType: "WEB_FORM",
                    targetText: "From/Input表单数量",
                    targetComponent: "SINGLE_VALUE",
                },
                {
                    targetType: "WEB_TITLE",
                    targetText: "Title",
                    targetComponent: "MULTI_VALUE",
                },
                {
                    targetType: "WEB_KEYWORD",
                    targetText: "关键字识别",
                    targetComponent: "MULTI_VALUE",
                },
            ],
            // 刷新子组件
            refresh: null,
            // 当前选择的targetType
            selectedTargetType: null,
            // 当前加载显示的组件
            currentTargetTypeDataSource: {},
        };
    },
    props: {
        // 模板数据表单
        classTemplate: {},
    },
    methods: {
        // 初始化数据
        initData(targetType) {
            this.initDefaultObject();
        },
        // 初始化默认的对象
        initDefaultObject() {
            if (Object.keys(this.classTemplate).length == 0) {
                this.$set(
                    this.classTemplate,
                    "targetType",
                    this.targetTypeDataSource[0].targetType
                );
                this.$set(
                    this.classTemplate,
                    "targetClass",
                    this.targetTypeDataSource[0].targetComponent
                );
                this.$set(this.classTemplate, "targetTemplate", {});
            }
            this.loadTargetComponent();
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
        // 加载targetType对应的组件
        loadTargetComponent() {
            for (let obj of this.targetTypeDataSource) {
                if (this.classTemplate.targetType === obj.targetType) {
                    this.currentTargetTypeDataSource = obj;
                    // 刷新子组件，防止当targetTypeOnchange改变时，相同子组件不会重新加载的问题
                    this.refresh = new Date().getTime();
                    break;
                }
            }
        },
        // targetType改变时，清空targetTemplate对象
        targetTypeOnchange(data) {
            this.selectedTargetType = data;
            this.classTemplate.targetType = data;
            this.classTemplate.targetTemplate = {};
            this.loadTargetComponent();
        },
    },
    components: {
        SINGLE_VALUE: SingleValueTemplate,
        MULTI_VALUE: MultiValueTemplate,
        BOOLEAN_VALUE: BooleanValueTemplate,
        DEFAULT_VALUE: DefaultValueTemplate
    },
};
</script>
<style scorep>
.class-template {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
.lxSelect {
    margin-bottom: 10px;
}
</style>
