import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  // createWebHistory 相当于以前vue2的history 路径无#
  // 相对的createWebHashHistory 相当与hash模式 路径有# //区别就是后端需要不同的对应

  // createWebHistory()里面放的是路径访问时的默认路径，可以直接在这里配置
  // import.meta.env.BASE_URL就是相当于将这个配置放在了vite.config.js中的base中
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 配置路径 //用了懒加载（就是用户访问这个界面的时候才会加载相应的代码）
    { path: '/login', 
      component: () => import('@/views/login/LoginPage.vue')},
    { 
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      // 重定向（就是访问/路径的时候 默认访问 redirect里面定义好的路径
      redirect: '/article/manage',
      // 二级路由
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]

    }
  ],
})

// 在路径上设置登录访问拦截 有from和to
// 根据返回值来确定是否进行放行，韩式拦截
// 如果是 undifind或者true 放行
// false 拦回from的页面
// 如果是具体路径或者 路径对象 拦截到对应的地址
router.beforeEach((to) => {
  const userStore = useUserStore()
  if(!userStore.token && to.path !== '/login') {
    return '/login'
  }
})
export default router
