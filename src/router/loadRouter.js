const children = []

function build(menus) {
    menus.forEach(menu => {
        let moduleName = menu.url;
        menu.lsChildMenu.forEach(child => {
            children.push({
                path: child.url,
                name: camelCase(child.url.split("/")),
                component: resolve => require([`../components/${moduleName}/${child.url.split("/")[1]}/${upperCamelCase(child.url.split("/"))}`], resolve),
                meta: {
                    requiresAuth: true
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