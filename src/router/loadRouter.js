// const children = []

function build(menus) {
    const result = [];
    menus.forEach(menu => {
        let moduleName = menu.menuUrl;
        menu.children.forEach(child => {
            console.log(`@/components/${moduleName}${child.menuRouter}`);
            result.push({
                path: child.menuUrl,
                name: child.menuRouter.split("/")[2],
                component: () =>
                    import(`@/components/${moduleName}${child.menuRouter}`),
                meta: {
                    requiresAuth: true,
                    parentPathText: menu.menuName,
                    pathText: child.menuName,
                    button: child.children.map(value => value.menuUrl)
                }
            });
        });
    });
    console.log(result);
    return result;
}

export default {
    build
};
