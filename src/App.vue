<template>
  <div id="app">
    <router-view/>
  </div>
</template>   

<script>
import router from "./router";
import store from "./store";
import { RELOAD_ROUTER } from "./assets/js/global/globalMutationType";
export default {
    name: "App",
    created() {
        console.log("App creted");
        this.$router.rebuild();
        //store.commit(RELOAD_ROUTER, { router: router });
    }
};
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
