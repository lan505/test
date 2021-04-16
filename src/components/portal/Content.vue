<template>
    <div class="layout">
        <Sider class="scroll" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <div class="personal-details">
                <div class="menu-avatar">
                    <Avatar size="80" :src="this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userAvatar" />
                </div>
            </div>
            <div class="menu">
                <ul data-v-aa7c4f4e="" class="menu ivu-menu ivu-menu-dark ivu-menu-vertical" style="width: auto;" @click="indexMenu">
                    <li data-v-aa7c4f4e="" class="ivu-menu-submenu">
                        <div class="ivu-menu-submenu-title"><i data-v-aa7c4f4e="" class="ivu-icon ivu-icon-md-home" style="font-size: 22px;"></i> <span data-v-aa7c4f4e="">首页</span></div>
                        <ul class="ivu-menu" style="display: none;"></ul>
                    </li>
                </ul>
                <Menu class="menu" ref="menu" :accordion="true" @on-select="selectMenu" :open-names="menuInfo.openNames" :active-name="menuInfo.activeName" theme="dark" width="auto">
                    <Submenu :key="menu.id" :name="menu.menuRouter" v-for="menu in menuInfo.menus">
                        <template slot="title">
                            <Icon :type="menu.menuIcon" size="22"></Icon>
                            <span>{{menu.menuName}}</span>
                        </template>
                        <MenuItem :key="childMenu.id" :name="childMenu.menuRouter" v-for="childMenu in menu.children">
                        <Icon :type="childMenu.menuIcon" size="16" style="margin-top: -2px;"></Icon>
                        {{childMenu.menuName}}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </Sider>
        <Layout :style="{marginLeft: '200px', height: '100%'}">
            <Header class="header">
                <div class="header-login-info">
                    <div class="right-avatar">
                        <Avatar size="40" :src="this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userAvatar" />
                    </div>
                    <div class="right-panel">
                        <Dropdown trigger="hover" placement="bottom-start" @on-click="dropdown">
                            <a href="javascript:void(0)" class="name">
                                {{this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userName}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="personal-center">个人中心</DropdownItem>
                                <DropdownItem name="logout" divided>退出系统</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <Content class="content scroll" :style="{padding: '16px'}">
                <div>
                    <router-view></router-view>
                </div>
            </Content>
        </Layout>
    </div>
</template>
<script>
import {
    USER_INFO,
    INIT_USER_LOGIN_INFO,
    INIT_WEBSOCKET,
} from "@/assets/js/global/globalMutationType";
import { userInfo } from "@/assets/js/api/systemModuleApi";
export default {
    data() {
        return {
            menuInfo: {
                activeName: 0,
                openNames: [],
                menus: [],
            },
        };
    },
    created() {
        this.initUserInfo();
    },
    methods: {
        initUserInfo() {
            let userLoginInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            // 不为空则说明已登录
            if (userLoginInfo != null) {
                this.initMenus(userLoginInfo);
            } else {
                userInfo()
                    .then((res) => {
                        this.$store.commit(INIT_USER_LOGIN_INFO, res);
                        this.initMenus(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        initMenus(data) {
            // 初始化websocket
            this.$store.commit(INIT_WEBSOCKET, this);
            if (data != null && data.lsLeftMenu.length > 0) {
                this.menuInfo.menus = data.lsLeftMenu;
                this.menuInfo.openNames.push(data.lsLeftMenu[0].menuUrl);
                var childMenu = data.lsLeftMenu[0].children;
                if (childMenu != null && childMenu.length > 0) {
                    this.menuInfo.activeName = childMenu[0].menuUrl;
                }
                this.updateMenu();
            }
        },
        selectMenu(menuRouter) {
            let name = menuRouter.split("/")[2];
            console.log(name);
            this.$router.push({
                name: name,
            });
        },
        updateMenu() {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
                this.$refs.menu.updateActiveName();
            });
        },
        dropdown(data) {
            if (data === "personal-center") {
                this.$router.push({
                    name: "personalCenter",
                });
            } else if (data === "logout") {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否需要退出系统?",
                    onOk: () => {
                        sessionStorage.clear();
                        this.logout();
                        this.$router.push({
                            path: "/",
                        });
                    },
                });
            } else {
            }
        },
        logout() {
            this.axios
                .post(this.globalActionUrl.system.user.logout)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        indexMenu() {
            this.$router.push({
                name: "index",
            });
        }
    },
};
</script>

<style scoped>
.personal-details {
    width: 100%;
}
.menu-avatar {
    height: 100px;
    line-height: 100px;
    margin-left: 26px;
}
.menu-login-info {
    color: white;
    margin-top: 8px;
    margin-left: 26px;
}
.layout {
    height: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.header {
    height: 50px;
    padding: 0 16px 0 16px;
    background-color: #ffffff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.header-login-info {
    height: 50px;
    line-height: 50px;
    float: right;
}
.header-login-info .right-avatar {
    padding: 0 5px 0 5px;
    float: left;
}
.header-login-info .right-panel {
    padding: 0 5px 0 5px;
    float: left;
}
.right-panel .name {
    color: #515a6e;
    font-size: 14px;
}
.content {
    background: #f3f3f3;
}
.menu {
    z-index: 0;
}
</style>