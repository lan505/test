<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu ref="menu" @on-select="selectMenu" :open-names="openNames" :active-name="activeName" theme="dark" width="auto">
                <Submenu :key="menu.id" :name="menu.url" v-for="menu in menus">
                    <template slot="title">
                        <Icon :type="menu.icon"></Icon>
                        {{menu.name}}
                    </template>
                    <MenuItem :key="childMenu.id" :name="childMenu.url" v-for="childMenu in menu.lsChildMenu">
                    <Icon :type="childMenu.icon"></Icon>{{childMenu.name}}
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px', height: '100%'}">
            <Header class="header">
                <div class="login-user">
                    <Dropdown trigger="click" placement="bottom-end" @on-click="dropdown">
                        <a href="javascript:void(0)" class="user-name">
                            张三
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="personal-center">个人中心</DropdownItem>
                            <DropdownItem name="logout" divided>退出系统</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Avatar icon="ios-person" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                </div>
            </Header>
            <Content :style="{padding: '16px', overflow: 'auto'}">
                <Card>
                    <div>
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import loadRouter from "../../router/loadRouter";
import VueCookies from "vue-cookies";

export default {
    data() {
        return {
            activeName: 0,
            openNames: [],
            menus: []
        };
    },
    created() {
        this.initMenu();
    },
    methods: {
        initMenu() {
            this.axios
                .get(this.globalActionUrl.menuListUserMenu)
                .then(res => {
                    if (res != null) {
                        this.menus = res;
                        this.openNames.push(res[0].url);
                        var childMenu = res[0].lsChildMenu;
                        if (childMenu != null && childMenu.length > 0) {
                            this.activeName = childMenu[0].url;
                        }
                        this.updateMenu();
                        this.createRouter(res);
                    }
                })
                .catch(error => {});
        },
        selectMenu(url) {
            this.$router.push({
                path: url
            });
        },
        updateMenu() {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
                this.$refs.menu.updateActiveName();
            });
        },
        createRouter(data) {
            let routers = loadRouter.init(data);
            if (routers) {
                let lastRouter = this.$router.options.routes[
                    this.$router.options.routes.length - 1
                ];
                //lastRouter.redirect = routers[0].path;
                routers.forEach(item => {
                    lastRouter.children.push(item);
                });
                this.$router.addRoutes(this.$router.options.routes);
                console.log(this.$router.options);
            }
        },
        dropdown(data) {
            if (data === "personal-center") {
                this.$router.push({
                    name: "userCenter"
                });
            } else if (data === "logout") {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否需要退出系统?",
                    onOk: () => {
                        this.$router.push({
                            name: "login"
                        });
                    }
                });
            } else {
            }
        }
    }
};
</script>
<style scoped>
.layout {
    height: 100%;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.header {
    height: 50px;
    background-color: #ffffff;
    padding: 0 17px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.login-user {
    float: right;
    height: 100%;
    line-height: 100%;
}
.login-user .user-name {
    color: #515a6e;
    font-weight: 700;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
