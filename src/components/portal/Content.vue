<template>
    <div class="layout">
        <Layout>
            <Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" @on-collapse="onCollapse">
                <div class="personal-details">
                    <div :class="isCollapsed ? 'menu-avatar menu-avatar-menu-hide' : 'menu-avatar'">
                        <Avatar :class="isCollapsed ? 'avatar-menu-hide' : 'avatar'" :src="this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userAvatar" />
                    </div>
                </div>
                <div class="menu-div">
                    <Menu class="menu" :class="menuitemClasses" ref="menu" :accordion="true" @on-select="selectMenu" @on-open-change="openChange" :open-names="menuInfo.openNames" :active-name="menuInfo.activeName" theme="dark" width="auto">
                        <Submenu :key="menu.id" :name="menu.menuRouter" v-for="(menu, i) in menuInfo.menus" :class="menuClassArrow(i)">
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
            <Layout :style="{height: '100%'}">
                <Header class="header">
                    <div class="header-left">
                        <Icon class="header-item hide-menu-icon" @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="24"></Icon>
                    </div>
                    <div class="header-right">
                        <Icon class="header-item" type="md-notifications-outline" size="30" />
                        <Avatar class="header-item" size="40" :src="this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userAvatar" />
                        <Dropdown class="header-item" trigger="hover" placement="bottom-start" @on-click="dropdown">
                            <a href="javascript:void(0)" class="dropdown-a">
                                {{this.$store.state.user.loginInfo == null ? null : this.$store.state.user.loginInfo.userName}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="personal-center">个人中心</DropdownItem>
                                <DropdownItem name="logout" divided>退出系统</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>
                <Content class="content scroll" :style="{padding: '16px'}">
                    <div>
                        <router-view></router-view>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import {
    USER_INFO,
    INIT_USER_LOGIN_INFO,
    INIT_WEBSOCKET
} from "@/assets/js/global/globalMutationType";
import { queryLoginUserInfo } from "@/assets/js/api/requestSystem";
export default {
    data() {
        return {
            // 是否收缩菜单
            isCollapsed: false,
            menuInfo: {
                // 激活的菜单
                activeName: 0,
                // 展开的菜单
                openNames: [],
                // 菜单集合
                menus: []
            }
        };
    },
    created() {
        this.initUserInfo();
    },
    methods: {
        /**
         * 初始化用户信息
         */
        initUserInfo() {
            let userLoginInfo = JSON.parse(sessionStorage.getItem(USER_INFO));
            // 不为空则说明已登录
            if (userLoginInfo != null) {
                this.initMenus(userLoginInfo);
            } else {
                queryLoginUserInfo({})
                    .then(res => {
                        this.$store.commit(INIT_USER_LOGIN_INFO, res);
                        this.initMenus(res);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        /**
         * 初始化菜单
         */
        initMenus(data) {
            // 初始化websocket
            this.$store.commit(INIT_WEBSOCKET, this);
            if (data != null && data.lsUserMenu.length > 0) {
                this.menuInfo.menus = data.lsUserMenu;
                this.setDefaultMenuOpenNames(data.lsUserMenu[0].menuUrl);
                var childMenu = data.lsUserMenu[0].children;
                if (childMenu != null && childMenu.length > 0) {
                    this.menuInfo.activeName = childMenu[0].menuUrl;
                }
                this.updateMenu();
            }
        },
        // 选择菜单MenuItem时
        selectMenu(menuRouter) {
            let name = menuRouter.split("/")[2];
            console.log("selectMenu " + menuRouter);
            this.$router.push({
                name: name
            });
        },
        // Menu展开/关闭时触发
        openChange(menuRouter) {
            console.log("openChange " + menuRouter);
            if (menuRouter != null && menuRouter.length > 0) {
                // 如果包含index，则跳转到index首页
                if (menuRouter[0].toLowerCase().indexOf("index") != -1) {
                    this.$router.push({
                        name: "index"
                    });
                }
                this.setDefaultMenuOpenNames(menuRouter);
                this.setSessionStorageDefaultMenuOpenNames();
            }
        },
        /**
         * 设置展开菜单的数组到sessionStorage
         */
        setSessionStorageDefaultMenuOpenNames() {
            sessionStorage.setItem("openNames", this.menuInfo.openNames);
        },
        /**
         * 从sessionStorage获取展开菜单的数组
         */
        getSessionStorageDefaultMenuOpenNames() {
            return sessionStorage.getItem("openNames");
        },
        /**
         * 设置展开菜单的数组，每次设置都清空上次的记录
         */
        setDefaultMenuOpenNames(data) {
            if (this.menuInfo.openNames.length > 0) {
                this.menuInfo.openNames = [];
            }
            this.menuInfo.openNames.push(data);
        },
        /**
         * 重置展开菜单的数组，从sessionStorage获取并更新menuInfo.openNames
         */
        resetDefaultMenuOpenNames() {
           this.setDefaultMenuOpenNames(this.getSessionStorageDefaultMenuOpenNames());
           return this.menuInfo.openNames;
        },
        // 更新菜单状态
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
        /**
         * 退出系统
         */
        logout() {
            this.axios
                .post(this.globalActionUrl.system.user.logout)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        /**
         * Sider展开/收缩
         */
        onCollapse(data) {
            // 如果是收缩菜单状态，则关闭菜单展开效果,否则还原激活的菜单
            if (data) {
                this.setDefaultMenuOpenNames([]);
            } else {
                this.resetDefaultMenuOpenNames();
            }
            this.updateMenu();
        },
        /**
         * 菜单隐藏
         */
        collapsedSider() {
            this.$refs.side.toggleCollapse();
        }
    },
    computed: {
        /**
         * 菜单箭头样式计算
         */
        menuClassArrow() {
            return function(index) {
                var menuClass = [];
                // 如果是第一个菜单则新增App.vue定义的样式
                if (index == 0) {
                    menuClass.push("hide-first-menu-arrow");
                } else {
                    // 如果是收缩菜单状态则新增App.vue定义的样式
                    if (this.isCollapsed) {
                        menuClass.push("hide-first-menu-arrow");
                    }
                }
                return menuClass;
            };
        },
        rotateIcon() {
            return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
        },
        menuitemClasses() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        }
    }
};
</script>

<style scoped>
.personal-details {
    width: 100%;
}
/* 隐藏菜单前的用户头像div样式 */
.menu-avatar {
    height: 100px;
    line-height: 100px;
    margin-left: 26px;
    transition: all 300ms;
}
/* 隐藏菜单后的用户头像div样式 */
.menu-avatar-menu-hide {
    margin-left: 20px;
    transition: all 300ms;
}
/* 隐藏菜单前的用户头像样式 */
.menu-avatar .avatar {
    width: 80px;
    height: 80px;
    transition: all 300ms;
}
/* 隐藏菜单后的用户头像样式 */
.menu-avatar .avatar-menu-hide {
    width: 40px;
    height: 40px;
    transition: all 300ms;
}
.menu-login-info {
    color: white;
    margin-top: 8px;
    margin-left: 26px;
}
.header {
    float: left;
    width: 100%;
    height: 50px;
    padding: 0 0 0 0;
    display: flex;
    background-color: white;
}
.header-left {
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}
.header-right {
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    padding-right: 20px;
}
.header-right .header-item {
    margin: 0 3px 0 3px;
}
.header-lerightft .header-item .name {
    color: #515a6e;
    font-size: 14px;
}
.content {
    background-color: #ececec;
}
.menu {
    z-index: 0;
}
/* 隐藏菜单的icon */
.hide-menu-icon {
    margin-left: 13px;
    cursor: pointer;
}
/* 右上角用户名称颜色 */
.dropdown-a {
    color: black;
}
/* 隐藏菜单栏的css */
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon {
    transition: all 0.3s;
}
.rotate-icon {
    transform: rotate(-90deg);
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>
