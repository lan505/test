/*
 * @Description   这是路由表，用于和后端菜单数据进行绑定处理
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-03-11 15:15:16
 */
const routerTable =  [
    {
        name: "UserList",
        path: "/user/UserList",
        component: () => import(`@/views/system/user/UserList`),
    },
    {
        name: "RoleList",
        path: "/role/RoleList",
        component: () => import(`@/views/system/role/RoleList`),
    },
    {
        name: "DepartList",
        path: "/depart/DepartList",
        component: () => import(`@/views/system/depart/DepartList`),
    },
    {
        name: "MenuList",
        path: "/menu/MenuList",
        component: () => import(`@/views/system/menu/MenuList`),
    },
    {
        name: "DictIndexList",
        path: "/dictIndex/DictIndexList",
        component: () => import(`@/views/system/dictIndex/DictIndexList`),
    },
    {
        name: "DictItemList",
        path: "/dictItem/DictItemList",
        component: () => import(`@/views/system/dictItem/DictItemList`),
    }
]

export default routerTable;
