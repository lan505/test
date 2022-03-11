<template>
	<div class="layout">
		<Layout>
			<Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" @on-collapse="onCollapse" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
				<div class="personal-details">
					<div :class="isCollapsed ? 'menu-avatar menu-avatar-menu-hide' : 'menu-avatar'">
						<Avatar :class="isCollapsed ? 'avatar-menu-hide' : 'avatar'" :src="loginInfo == null ? null : loginInfo.userAvatar" />
					</div>
				</div>
				<div class="menu-div">
					<ul class="menu ivu-menu ivu-menu-dark ivu-menu-vertical" :class="menuItemClasses" style="width: auto;" @click="openHomeMenu">
						<li class="ivu-menu-submenu">
							<div class="ivu-menu-submenu-title"><i class="ivu-icon ivu-icon-md-home" style="font-size: 22px;"></i> <span>首页</span></div>
							<ul class="ivu-menu" style="display: none;"></ul>
						</li>
					</ul>
					<Menu class="menu" :class="menuItemClasses" ref="menu" :accordion="true" @on-select="selectMenu" @on-open-change="openChange" :open-names="menuInfo.openNames" :active-name="menuInfo.activeName" theme="dark" width="auto">
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
			<!-- <Layout :style="{ marginLeft: '200px', overflow: 'auto'}"> -->
			<Layout :class="layoutClasses">
				<Header class="header">
					<div class="header-left">
						<Icon class="hide-menu-icon" @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="24"></Icon>
						<Breadcrumb class="header-breadcrumb">
							<BreadcrumbItem :key="i" v-for="(path, i) in routerPath">{{path}}</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div class="header-right">
						<Badge :count="115" class="header-item header-message" overflow-count="99">
							<Icon type="md-notifications-outline" size="30" />
						</Badge>
						<Avatar class="header-item" size="40" :src="loginInfo == null ? null : loginInfo.userAvatar" />
						<Dropdown class="header-item" trigger="hover" placement="bottom-start" @on-click="dropdown">
							<a href="javascript:void(0)" class="dropdown-a">
								{{loginInfo == null ? null : loginInfo.userName}}
								<Icon type="ios-arrow-down"></Icon>
							</a>
							<DropdownMenu slot="list">
								<DropdownItem name="personal-center">个人中心</DropdownItem>
								<DropdownItem name="logout" divided>退出系统</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</Header>
				<Content class="content" :style="{padding: '16px'}">
					<div style="height: 900px">
						<router-view></router-view>
					</div>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
import {
	CLEAR_USER_LOGIN_INFO,
	INIT_USER_LOGIN_INFO,
	INIT_WEBSOCKET,
	INIT_MENU,
	SET_SESSION_STORAGE_MENU_OPEN_NAMES,
	SET_MENU_OPEN_NAMES,
	RESET_MENU_OPEN_NAMES
} from "@/assets/js/global/globalMutationType";
import globalConsts from "@/assets/js/global/globalConsts";
import { queryLoginUserInfo, logout } from "@/assets/js/api/requestSystem";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
	data() {
		return {
			// 是否收缩菜单
			isCollapsed: false
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
			// 不为空则说明已登录
			if (this.loginInfo != null) {
				this.initMenus(this.loginInfo);
			} else {
				queryLoginUserInfo()
					.then(res => {
						this.initApplicationData(res);
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
			this.initWebSocket(this);
			if (data != null && data.lsUserMenu.length > 0) {
				this.initMenu(data);
			}
		},
		// 选择菜单MenuItem时
		selectMenu(menuRouter) {
			// let name = menuRouter.split("/")[2];
			// this.$router.push({
			// 	name: name
			// });
			this.$router.push({
				name: menuRouter
			});
		},
		// Menu展开/关闭时触发
		openChange(menuRouter) {
			this.setMenuOpenNames(menuRouter);
			this.setSessionStorageMenuOpenNames();
			this.updateMenu();
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
					name: "PersonalCenter"
				});
			} else if (data === "logout") {
				this.$Modal.confirm({
					title: "提示框",
					content: "是否需要退出系统?",
					onOk: () => {
						this.onLogout();
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
		onLogout() {
			logout()
				.then(res => {
					console.log(res);
					this.clearUserLoginInfo();
					this.setMenuOpenNames();
				})
				.catch(error => {
					console.log(error);
				});
		},
		/**
		 * Sider展开/收缩
		 */
		onCollapse(close) {
			// 如果是收缩菜单状态，则关闭菜单展开效果,否则还原激活的菜单
			if (close) {
				this.setMenuOpenNames();
			} else {
				this.initApplicationMenuOpenNamesValue();
			}
			this.updateMenu();
		},
		/**
		 * 跳转到首页菜单
		 */
		openHomeMenu() {
			this.$router.push({
				name: "Index"
			});
		},
		/**
		 * 菜单隐藏
		 */
		collapsedSider() {
			this.$refs.side.toggleCollapse();
		},
		...mapActions({
			initApplicationData: globalConsts.vuex.action.initApplicationData,
			initApplicationMenuOpenNamesValue:
				globalConsts.vuex.action.initApplicationMenuOpenNamesValue
		}),
		...mapMutations({
			initMenu: INIT_MENU,
			initWebSocket: INIT_WEBSOCKET,
			initUserLoginInfo: INIT_USER_LOGIN_INFO,
			clearUserLoginInfo: CLEAR_USER_LOGIN_INFO,
			setSessionStorageMenuOpenNames: SET_SESSION_STORAGE_MENU_OPEN_NAMES,
			setMenuOpenNames: SET_MENU_OPEN_NAMES,
			resetMenuOpenNames: RESET_MENU_OPEN_NAMES
		})
	},
	computed: {
		/**
		 * 菜单箭头样式计算
		 */
		menuClassArrow() {
			return function (index) {
				var menuClass = [];
				// 如果是收缩菜单状态则新增App.vue定义的样式
				if (this.isCollapsed) {
					menuClass.push("hide-first-menu-arrow");
				}
				return menuClass;
			};
		},
		/**
		 * 旋转样式
		 */
		rotateIcon() {
			return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
		},
		/**
		 * 左菜单item样式
		 */
		menuItemClasses() {
			return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
		},
		/**
		 * 右布局样式
		 */
		layoutClasses() {
			return [
				this.isCollapsed ? "layout-content-hide" : "layout-content"
			];
		},
		...mapState({
			menuInfo: state => state.menuInfo,
			loginInfo: state => state.user.loginInfo,
			routerPath: state => state.routerPath,
		})
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
	transition: all 200ms;
}
/* 隐藏菜单后的用户头像div样式 */
.menu-avatar-menu-hide {
	margin-left: 20px;
	transition: all 200ms;
}
/* 隐藏菜单前的用户头像样式 */
.menu-avatar .avatar {
	width: 80px;
	height: 80px;
	transition: all 200ms;
}
/* 隐藏菜单后的用户头像样式 */
.menu-avatar .avatar-menu-hide {
	width: 40px;
	height: 40px;
	transition: all 200ms;
}
.menu-login-info {
	color: white;
	margin-top: 8px;
	margin-left: 26px;
}
.header {
	float: left;
	/* width: calc(100% - 200px); */
	width: 100%;
	height: 50px;
	padding: 0 0 0 0;
	/* position: fixed; */
	z-index: 100;
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
	margin: 0 10px 0 10px;
	cursor: pointer;
}
.header-lerightft .header-item .name {
	color: #515a6e;
	font-size: 14px;
}
.header-message {
	line-height: 0px;
}
.content {
	overflow-y: auto;
	background-color: #ececec;
	/* margin-top: 50px; */
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
/* 面包屑样式 */
.header-breadcrumb {
	margin-left: 10px;
}
/* 隐藏菜单栏的css */
.layout {
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
}
/* 右布局样式 */
.layout-content {
	margin-left: 200px;
	overflow: auto;
	transition: all 200ms;
}
/* 右布局样式随左菜单收缩样式 */
.layout-content-hide {
	margin-left: 80px;
	overflow: auto;
	transition: all 200ms;
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
