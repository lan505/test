<template>
    <div class="box">
        <div class="head">
            <div class="head-index">
                <Badge :count="index + 1" type="primary"></Badge>
            </div>
            <div class="head-select">
                <LxSelect :value.sync="templateForm.classType" :data="this.classTypeDataSource" bindKey="classType" bindValue="classTitle" :clearable="false" @update:value="classTypeOnchange"></LxSelect>
            </div>
            <div class="head-remove">
                <Icon type="ios-trash-outline" size="24" color="red" @click="removeCurrentTemplateType(index)" />
            </div>
        </div>
        <Divider class="line" />
        <div class="body">
            <component ref="classComponent" :is="currentComponent" :classTemplate.sync="templateForm.classTemplate" @saveValidateResult="saveValidateResult" @changeTargetTemplateData="changeTargetTemplateData"></component>
        </div>
    </div>
</template>
<script>
import DomainTemplate from "../targettype/DomainTemplate";
import HostTemplate from "../targettype/HostTemplate";
import WebTemplate from "../targettype/WebTemplate";
export default {
    created() {
        // this.initDefaultClassType();
        this.initData();
    },
    data() {
        return {
            // 规则配置数据源
            classTypeDataSource: [
                {
                    classType: "DOMAIN",
                    classTitle: "域名相关",
                    classComponent: DomainTemplate,
                },
                {
                    classType: "HOST",
                    classTitle: "主机相关",
                    classComponent: HostTemplate,
                },
                {
                    classType: "WEB",
                    classTitle: "网页内容",
                    classComponent: WebTemplate,
                },
            ],
            currentComponent: null,
        };
    },
    props: {
        // 模板数量索引
        index: {
            type: Number,
            default() {
                return 1;
            },
        },
        // 模板数据表单
        templateForm: {},
    },
    methods: {
        // 初始化数据
        initData() {
            this.initDefaultObject();
        },
        // 删除当前模板配置
        removeCurrentTemplateType(index) {
            this.$emit("removeTemplateConfig", index);
        },
        // 初始化默认的对象
        initDefaultObject() {
            // templateForm为空，则初始化默认值
            if (Object.keys(this.templateForm).length == 0) {
                this.$set(
                    this.templateForm,
                    "classType",
                    this.classTypeDataSource[0].classType
                );
                this.$set(this.templateForm, "classTemplate", {});
            }
            this.loadTargetComponent();
        },
        // classType改变则清空classTemplate对象
        classTypeOnchange(classType) {
            this.templateForm.classType = classType;
            this.templateForm.classTemplate = {};
            this.loadTargetComponent();
        },
        // 加载classType对应的组件
        loadTargetComponent() {
            for (let item of this.classTypeDataSource) {
                if (this.templateForm.classType === item.classType) {
                    this.currentComponent = item.classComponent;
                    break;
                }
            }
        },
        // 执行校验模板数据
        validateClassTemplate() {
            return this.$refs["classComponent"].validateTargetTemplate();
        },
        // 返回校验模板数据
        saveValidateResult(valid) {
            this.$emit("saveValidateResult", valid);
        },
        // 改变目标模板数据
        changeTargetTemplateData(data) {
            this.$emit("changeTargetTemplateData", this.index, data);
        },
    },
    watch: {
        // 'templateForm.classType'() {
        //     console.log("监听改变：" + this.templateForm.classType);
        // }
    },
    components: {
        DomainTemplate,
        HostTemplate,
        WebTemplate,
    },
};
</script>
<style scorep>
.form {
    width: 100%;
    overflow-y: auto;
}
.box {
    width: 100%;
    border: 1px solid #e8eaec;
    border-radius: 4px;
    margin-bottom: 10px;
    flex-direction: column;
}
.line {
    width: 100%;
    margin: 0 0 0 0;
}
.head {
    width: 100%;
    display: -webkit-flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    padding: 10px 10px 10px 10px;
    flex-direction: row;
    justify-content: space-between;
}
.head-index {
    min-width: 37;
    height: 30px;
}
.head-select {
    width: 360px;
    margin: 0 10px 0 10px;
    flex: 1;
}
.head-remove {
    width: 24px;
    height: 30px;
    padding-top: 3px;
    cursor: pointer;
}
.body {
    width: 100%;
    padding: 10px 0px 10px 0px;
    flex-direction: column;
}
</style>
