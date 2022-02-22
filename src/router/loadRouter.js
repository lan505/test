/*
 * @Description   
 * @Autor         lan505
 * @Version       1.0
 * @Date          2021-02-25 12:09:38
 * @LastEditTime  2022-02-22 21:00:30
 */
// const children = []

function build(menus) {
    const result = [];
    menus.forEach(menu => {
        let moduleName = menu.menuRouter;
        menu.children.forEach(child => {
            result.push({
                path: child.menuRouter,
                name: child.menuRouter.split("/")[2],
                component: () =>
                    import(`@/components/${moduleName}${child.menuRouter}`),
                meta: {
                    requiresAuth: true,
                    parentPathText: menu.menuName,
                    pathText: child.menuName,
                    button: child.children.map(value => value.menuAuthority)
                }
            });
        });
    });
    return result;
}

export default {
    build
};
