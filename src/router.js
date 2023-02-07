import Vue from "vue";
import Router from "vue-router";



Vue.use(Router)

let router = new Router({
    mode: "history",
    linkExactActiveClass: "active",
    routes: [
        {
            path: "/admin",
            name: "adminpage",
            component: () => 
                import(/* webpackChunkName: "demo" */ "./views/admin/adminPage.vue"),
            meta: {
                admin: true,
            },
        },
        {
            path: "/login",
            name: "Login",
            component: () =>
                import(/* webpackChunkName: "demo" */ "./views/LoginForm.vue"),
            meta: {
                guest: true,
            },
        },
        {
            path: "/register",
            name: "Register",
            component: () =>
                import(/* webpackChunkName: "demo" */ "./views/RegisterForm.vue"),
            meta: {
                guest: true,
            },
        },
        {
            path: "/",
            name: "LandingPage",
            component: () =>
                import(/* webpackChunkName: "demo" */ "./views/LandingPage.vue"),
            meta: {
                guest: true,
            },
        },
        {
            path: "*",
            name: "404PAGE",
            component: () =>
                import(/* webpackChunkName: "demo" */ "./views/ERROR/404PAGE.vue"),
            meta: {
                guest: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.meta.admin)) {
        if (localStorage.getItem("admin_token") !== null) {
            next();
        }else {
            next({
                path: "/404FOUND",
            });
        }
    }else if (to.matched.some((record) => record.meta.guest)) {
        if (localStorage.getItem("access_token") === null) {
            next();
        }
    }
});

export default router;