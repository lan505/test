const children = []

function build(menus) {
    menus.forEach(menu => {
        let moduleName = menu.menuUrl;
        menu.children.forEach(child => {
            children.push({
                path: child.menuUrl,
                name: child.menuRouter,//camelCase(child.menuUrl.split("/")),
                component: resolve => require([`../components/${moduleName}/${child.menuUrl.split("/")[1]}/${upperCamelCase(child.menuUrl.split("/"))}`], resolve),
                meta: {
                    requiresAuth: true,
                    button: child.children
                }
            });
        });
    });
    return children;
}

function camelCase(data) {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i]) {
            result += data[i].substring(0, 1).toUpperCase() + data[i].substring(1);
        }
    }
    result = result.substring(0, 1).toLowerCase() + result.substring(1);
    console.log("路由名：" + result);
    return result;
}

function upperCamelCase(data) {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i]) {
            result += data[i].substring(0, 1).toUpperCase() + data[i].substring(1);
        }
    }
    return result;
}

export default {
    build
}