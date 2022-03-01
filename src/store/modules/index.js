
export function loadModules() {
    const context = import.meta.globEager("./*.js")
    const modules = {};

    Object.keys(context).forEach((key) => {
        if (key === "./index.js") return;
        modules[key.replace(/(\.\/|\.js)/g, '')] = context[key].default
    });
    
    return { context, modules }
}

export const { context, modules } = loadModules();