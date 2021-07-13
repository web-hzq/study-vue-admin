import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入布局组件
import Layout from '../views/Layout'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: "console",
        hidden: true,
        meta: {
            name: "首页"
        }
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        meta: {
            name: "登录页"
        },
        component: () =>
            import ('../views/Login/index.vue')
    },
    {
        path: '/console',
        name: 'Console',
        redirect: "index",
        component: Layout,
        hidden: false,
        meta: {
            name: "控制台",
            icon: "console"
        },
        children: [{
            path: "/index",
            name: "Index",
            hidden: false,
            meta: {
                name: "控制台首页",
            },
            component: () =>
                import ("../views/Console/index.vue")
        }]
    },
    {
        path: '/info',
        name: 'Info',
        redirect: "infoIndex",
        component: Layout,
        hidden: false,
        meta: {
            name: "信息管理",
            icon: "info"
        },
        children: [{
                path: "/infoIndex",
                name: "InfoIndex",
                hidden: false,
                meta: {
                    name: "信息列表"
                },
                component: () =>
                    import ("../views/Info/index.vue")
            },
            {
                path: "/infoCategory",
                name: "InfoCategory",
                hidden: false,
                meta: {
                    name: "信息分类"
                },
                component: () =>
                    import ("../views/Info/category.vue")
            },
            {
                path: "/infoDetailed",
                name: "InfoDetailed",
                hidden: true,
                meta: {
                    keepAlive: true,
                    role: ['sale'],
                    name: "信息详情"
                },
                component: () =>
                    import ("../views/Info/detailed.vue")
            }
        ]
    },
    {
        path: '/user',
        name: 'User',
        redirect: "userIndex",
        component: Layout,
        hidden: false,
        meta: {
            name: "用户管理",
            icon: "user"
        },
        children: [{
                path: "/userIndex",
                name: "UserIndex",
                hidden: false,
                meta: {
                    name: "用户列表"
                },
                component: () =>
                    import ("../views/User/index.vue")
            },
            {
                path: "/equityPenetrationChart",
                name: "equityPenetrationChart",
                hidden: false,
                meta: {
                    name: "股权穿透"
                },
                component: () =>
                    import ("../views/equityPenetrationChart/index5.vue")
            }
        ]
    },
    //股权穿透图
    // {
    //     path: "/equityPenetrationChart",
    //     redirect: "/equityPenetrationChart/index",
    //     component: Layout,
    //     children: [{
    //         path: "index",
    //         name: "equityPenetrationChart",
    //         hidden: true,
    //         component: () =>
    //             import ("@/views/equityPenetrationChart/index.vue"),
    //         meta: {
    //             title: "股权穿透图",
    //             icon: "hybg",
    //             key: "imAnalysis",
    //             goBackShow: true,
    //         },
    //     }, ],
    // },
]

const router = new VueRouter({
    routes
})

export default router