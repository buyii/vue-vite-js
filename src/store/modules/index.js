
export function loadModules() {
    const context = import.meta.glob("./*.js",{ eager: true })
    const modules = {};
    for (const path in context) {
        modules[path.replace(/(\.\/|\.js)/g, '')] = context[path].default
    }
    return { context, modules }
}

export const { context, modules } = loadModules();