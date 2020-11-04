<template>
  <div id="app">
    <router-view/>
  </div>
</template>   

<script>
// import router from "./router";
import store from "./store";
import { INIT_USER_LOGIN_INFO } from "./assets/js/global/globalMutationType";
export default {
    name: "App",
    created() {
        console.log("App creted");
        this.$store.commit(INIT_USER_LOGIN_INFO);
    }
};
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.ivu-modal-confirm-head-icon-confirm {
    color: #2d8cf0;
}
.ivu-input-group-prepend {
  background-color: #ffffff;
}
</style>
