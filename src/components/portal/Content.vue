<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <div class="personal-details">
                <div class="avatar">
                    <img :src="loginInfo.avatar" width="80" height="80" style="border-radius:40px; background-color: white;">
                </div>
                <div class="login-name">
                    <Dropdown trigger="click" placement="bottom-start" @on-click="dropdown">
                        <a href="javascript:void(0)" class="user-name">
                            {{loginInfo.name}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="personal-center">个人中心</DropdownItem>
                            <DropdownItem name="logout" divided>退出系统</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="menu">
                <Menu class="menu" ref="menu" @on-select="selectMenu" :open-names="menuInfo.openNames" :active-name="menuInfo.activeName" theme="dark" width="auto">
                    <Submenu :key="menu.id" :name="menu.url" v-for="menu in menuInfo.menus">
                        <template slot="title">
                            <Icon :type="menu.icon"></Icon>
                            {{menu.name}}
                        </template>
                        <MenuItem :key="childMenu.id" :name="childMenu.url" v-for="childMenu in menu.lsChildMenu">
                        <Icon :type="childMenu.icon" size="16" style="margin-top: -2px;"></Icon>{{childMenu.name}}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </Sider>
        <Layout :style="{marginLeft: '200px', height: '100%'}">
            <Header class="header">
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
import { USER_INFO } from "../../assets/js/global/globalMutationType";
export default {
    data() {
        return {
            loginInfo: {
                avatar: require("../../assets/images/default-user.png"),
                account: null,
                name: null
            },
            menuInfo: {
                activeName: 0,
                openNames: [],
                menus: []
            }
        };
    },
    created() {
        this.initUserInfo();
    },
    methods: {
        initUserInfo() {
            let sessionUserInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            // 不为空则说明已登录
            if (sessionUserInfo != null) {
                this.initMenus(sessionUserInfo);
            } else {
                this.axios
                    .get(this.globalActionUrl.user.getUserInfo)
                    .then(res => {
                        this.initMenus(res);
                        sessionStorage.setItem(USER_INFO, JSON.stringify(res));
                        this.$router.rebuild(res);
                        // this.$store.commit(USER_INFO, {
                        //     userInfo: res,
                        //     router: this.$router
                        // });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        initMenus(data) {
            if (data != null && data.lsLeftMenu.length > 0) {
                console.log("initMenus");
                this.menuInfo.menus = data.lsLeftMenu;
                this.menuInfo.openNames.push(data.lsLeftMenu[0].url);
                var childMenu = data.lsLeftMenu[0].lsChildMenu;
                if (childMenu != null && childMenu.length > 0) {
                    this.menuInfo.activeName = childMenu[0].url;
                }
                this.updateMenu();
                this.loginInfo.avatar = data.avatar;
                this.loginInfo.account = data.account;
                this.loginInfo.name = data.name;
            }
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
        dropdown(data) {
            if (data === "personal-center") {
                this.$router.push({
                    path: "/personalCenter"
                });
            } else if (data === "logout") {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否需要退出系统?",
                    onOk: () => {
                        //sessionStorage.removeItem(USER_INFO);
                        sessionStorage.clear();
                        this.$router.push({
                            path: "/"
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
.login-name {
    color: white;
    margin-top: 8px;
}
.login-name .user-name {
    color: #ffffff;
    font-size: 14px;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.personal-details {
    width: 100%;
    height: 140px;
    padding: 14px 24px;
}
.menu {
    z-index: 0;
}
</style>
