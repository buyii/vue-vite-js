import { loadModules, context, modules } from "./modules/index.js"
import { createStore, createLogger } from "vuex"

console.log(loadModules())
export const key = Symbol();

export const store = createStore({
    modules,
    strict: true,
    plugins: [createLogger()]
});

// 热重载
if (import.meta.hot) {
    import.meta.hot?.accept(Object.keys(context), () => {
        const { modules } = loadModules()
        store.hotUpdate({
            modules
        })
    })
}

export default store;