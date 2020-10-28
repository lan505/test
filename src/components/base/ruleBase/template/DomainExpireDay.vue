<template>
    <div style="">
        <LxSelect :value.sync="selectedItemType" :data="this.dataSource" bindKey="itemType" bindValue="itemText" @update:value="onChangeConfigType"></LxSelect>
    </div>
</template>
<script>
export default {
    created() {},
    data() {
        return {
            
        };
    },
    props: {
        selectedItemType: null,
        itemTypeDataSource: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {},
};
</script>
<style scorep>
</style>
