<template>
    <div class="layout">
        <Sider class="scroll" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <div class="personal-details">
                <div class="avatar">
                    <img :src="this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userAvatar" width="80" height="80" style="border-radius:40px; background-color: white;">
                </div>
                <div class="login-name">
                    <Dropdown trigger="click" placement="bottom-start" @on-click="dropdown">
                        <a href="javascript:void(0)" class="user-name">
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
            <div class="menu">
                <Menu class="menu" ref="menu" @on-select="selectMenu" :open-names="menuInfo.openNames" :active-name="menuInfo.activeName" theme="dark" width="auto">
                    <Submenu :key="menu.id" :name="menu.menuRouter || menu.menuId" v-for="menu in menuInfo.menus">
                        <template slot="title">
                            <Icon :type="menu.menuIcon"></Icon>
                            {{menu.menuName}}
                        </template>
                        <MenuItem :key="childMenu.id" :name="childMenu.menuRouter" v-for="childMenu in menu.children">
                        <Icon :type="childMenu.menuIcon" size="16" style="margin-top: -2px;"></Icon>{{childMenu.menuName}}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </Sider>
        <Layout :style="{marginLeft: '200px', height: '100%'}">
            <Header class="header">
            </Header>
            <Content class="scroll" :style="{padding: '16px'}">
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
import { USER_INFO, INIT_USER_LOGIN_INFO } from "../../assets/js/global/globalMutationType";
import { userInfo } from "../../assets/js/global/systemModuleApi";
export default {
    data() {
        return {
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
            let userLoginInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            // 不为空则说明已登录
            if (userLoginInfo != null) {
                this.initMenus(userLoginInfo);
            } else {
                userInfo().then(res => {
                        this.$store.commit(INIT_USER_LOGIN_INFO, res);
                        this.initMenus(res);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        initMenus(data) {
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
        selectMenu(url) {
            console.log(url);
            this.$router.push({
                name: url
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
                    name: "personalCenter"
                });
            } else if (data === "logout") {
                this.$Modal.confirm({
                    title: "提示框",
                    content: "是否需要退出系统?",
                    onOk: () => {
                        sessionStorage.clear();
                        this.logout();
                        this.$router.push({
                            path: "/"
                        });
                    }
                });
            } else {
            }
        },
        logout() {
             this.axios
                    .post(this.globalActionUrl.system.user.logout)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
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
.personal-details {
    width: 100%;
    height: 140px;
    padding: 14px 24px;
}
.menu {
    z-index: 0;
}

</style>