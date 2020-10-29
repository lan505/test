<template>
    <div class="box">
        <div class="head">
            <div class="head-index">
                <Badge :count="count" type="primary"></Badge>
            </div>
            <div class="head-select">
                <LxSelect :value.sync="selectedConfigType" :data="this.configType" bindKey="classType" bindValue="classTitle" :clearable="false" @update:value="onChangeConfigType"></LxSelect>
            </div>
            <div class="head-remove">
                <Icon type="ios-trash-outline" size="24" color="red" @click="removeConfigType" />
            </div>
        </div>
        <Divider class="line" />
        <div class="body">
            <component :is="selectComponent"></component>
        </div>
    </div>
</template>
<script>
import DomainTemplate from "./DomainTemplate";
export default {
    created() {
        console.log(222);
        this.onChangeConfigType();
    },
    data() {
        return {
            // 选中的规则配置类型
            selectedConfigType: "domain",
            // 规则配置数据源
            configType: [
                {
                    classType: "domain",
                    classTitle: "域名相关",
                    classComponent: DomainTemplate,
                },
                {
                    classType: "host",
                    classTitle: "主机相关",
                    classComponent: DomainTemplate,
                },
                {
                    classType: "web",
                    classTitle: "网页内容",
                    classComponent: DomainTemplate,
                },
            ],
            selectComponent: null,
        };
    },
    props: {
        // 模板数量计数
        count: {
            type: Number,
            default() {
                return 1;
            },
        },
        // 模板数据对象
        value: {},
    },
    methods: {
        removeConfigType() {
            console.log(this.count);
        },
        onChangeConfigType(value) {
            if (typeof tmp == "undefined") {
                value = this.selectedConfigType;
            }
            console.log("改变：" + value);
            for (let item of this.configType) {
                if (value === item.classType) {
                    this.selectComponent = item.classComponent;
                    console.log(item);
                    break;
                }
            }
        },
    },
    components: {
        DomainTemplate,
    },
};
</script>
<style scorep>
.form {
    width: 100%;
    height: 400px;
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
    padding: 10px 10px 10px 10px;
    flex-direction: column;
}
</style>
