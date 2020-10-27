// const children = []

function build(menus) {
    const result = [];
    menus.forEach(menu => {
        let moduleName = menu.menuUrl;
        menu.children.forEach(child => {
            result.push({
                path: child.menuUrl,
                name: child.menuRouter.split("/")[2],
                component: () => import(`@/components/${moduleName}${child.menuRouter}`),
                meta: {
                    requiresAuth: true,
                    button: child.children.map(value => value.menuUrl)
                }
            });
        });
    });
    return result;
}

export default {
    build
}