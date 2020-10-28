<template>
    <div class="box">
        <div class="head">
            <div class="item-select-control">
                <LxSelect :value.sync="selectedConfigType" :data="this.configType" bindKey="classType" bindValue="classTitle" :clearable="false" @update:value="onChangeConfigType"></LxSelect>
            </div>
            <div class="item-index">
                <Badge :count="count" type="primary"></Badge>
            </div>
            <div class="item-remove-icon">
                <Icon type="ios-trash-outline" size="24" color="red" @click="removeConfigType" />
            </div>
        </div>
        <Divider />
        <div class="body">
            <component :is="selectComponent"></component>
        </div>
    </div>
</template>
<script>
import DomainTemplate from "./DomainTemplate";
export default {
    created() {
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
        count: {
            type: Number,
            default() {
                return 1;
            },
        },
    },
    methods: {
        removeConfigType() {
            console.log(this.count);
        },
        onChangeConfigType(value) {
            if(value === null){
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
    width: 450px;
    height: 200px;
    border: 1px solid #e8eaec;
    border-radius: 4px;
    margin-bottom: 10px;
}
.item-index {
    margin-right: 10px;
    width: 37px;
    height: 30px;
    float: left;
}
.item-select-control {
    margin-right: 10px;
    width: 340px;
    float: left;
}
.item-remove-icon {
    width: 30px;
    height: 30px;
    float: left;
    text-align: center;
    padding-top: 3px;
    cursor: pointer;
}
.head {
    height: 30px;
    padding: 10px 10px 10px 10px;
}
.body {
    height: auto;
    padding: 10px 10px 10px 10px;
}
</style>
