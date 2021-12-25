// 做全局路由
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // 从cookie获取令牌

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {

    // 获取令牌判断用户是否登录
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === "/login") {
            // 若已登录重定向至首页
            next({ path: '/' })
        } else {
            // 已登录，获取用户角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                // 先请求用户信息
                const { roles } = await store.dispatch('user/getInfo')
                // 根据角色生成动态路由
                const acRoutes = await store.dispatch('permission/generateRoutes', roles)
                // 添加至router
                router.addRoutes(acRoutes)
                // 重定向
                next({ ...to, replace: true })
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})