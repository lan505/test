<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-14 18:58:53
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>   

<script>
export default {
    name: "App",
    created() {
        this.$store.dispatch(this.globalConsts.vuex.action.initApplicationData);
    }
};
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
}
/* table表格宽度设置100% */
.ivu-table-body > table {
    width: 100% !important;
}
.ivu-table-header > table {
    width: 100% !important;
}
/* 隐藏第一个菜单的右侧箭头 */
.hide-first-menu-arrow > div > i:last-child {
    display: none;
}
/* 隐藏菜单的箭头 */
.hide-menu-arrow > div > i:last-child {
    display: none;
}
/* 全局重写左菜单的背景颜色 */
.ivu-layout-sider {
    background-color: #0b2135 !important;
}
/* 全局重写左菜单的模块的背景颜色 */
.ivu-menu-submenu-title {
    background-color: #0b2135 !important;
}
/* 全局重写左菜单的模块的子菜单背景颜色 */
.ivu-menu {
    background-color: #021527 !important;
}
.ivu-modal-confirm-head-icon-confirm {
    color: #2d8cf0;
}
.ivu-input-group-prepend {
    background-color: #ffffff;
}
/* .ivu-table-overflowY {
    overflow-y: scroll;
} */
/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
/* .ivu-table-overflowY::-webkit-scrollbar {
    width:8px;
} */
/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
/* .ivu-table-overflowY::-webkit-scrollbar-track {
    background:rgb(236, 47, 40);
} */
/*内层轨道，滚动条中间部分（位置4）*/
/* .ivu-table-overflowY::-webkit-scrollbar-track-piece {
    background:rgb(241, 241, 241);
} */
/*滚动条里面可以拖动的那部分（位置5）*/
/* .ivu-table-overflowY::-webkit-scrollbar-thumb {
    background:rgb(187, 187, 187);
    border-radius:4px;
} */
/* .ivu-table-overflowY::-webkit-scrollbar-corner {
    background:rgb(233, 76, 14);
} */
/*定义右下角拖动块的样式（位置7）*/
/* .ivu-table-overflowY::-webkit-scrollbar-resizer  {
    background:#FF0BEE;
} */
</style>
