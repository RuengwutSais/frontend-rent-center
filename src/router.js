import Vue from "vue";
import Router from "vue-router";

import DashboardLayout from "@/views/template/Layout/DashboardLayout.vue";
import Dashboard from "@/views/template/Dashboard.vue";
import UserProfile from "@/views/template/UserProfile.vue";
import TableList from "@/views/template/TableList.vue";
import Typography from "@/views/template/Typography.vue";
import Icons from "@/views/template/Icons.vue";
import Maps from "@/views/template/Maps.vue";
import UpgradeToPRO from "@/views/template/UpgradeToPRO.vue";


Vue.use(Router)

let router = new Router({
    mode: "history",
    linkExactActiveClass: "active",
    routes: [
        {
            path: "/admin",
            component: DashboardLayout,
            redirect: "/admin/dashboard",
            children: [
              {
                path: "dashboard",
                name: "DashboardView",
                component: Dashboard,
              },
              {
                path: "user",
                name: "User Profile",
                component: UserProfile,
              },
              {
                path: "table",
                name: "Table List",
                component: TableList,
              },
              {
                path: "typography",
                name: "Typography",
                component: Typography,
              },
              {
                path: "icons",
                name: "Icons",
                component: Icons,
              },
              {
                path: "maps",
                name: "Maps",
                meta: {
                  hideFooter: true,
                },
                component: Maps,
              },
              {
                path: "upgrade",
                name: "Upgrade to PRO",
                component: UpgradeToPRO,
              },
            ],
            meta: {
                guest: true,
            }
        },
        // {
        //     path: "/admin",
        //     name: "adminpage",
        //     component: () => 
        //         import(/* webpackChunkName: "demo" */ "./views/admin/adminPage.vue"),
        //     meta: {
        //         admin: true,
        //     },
        // },
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
        // {
        //     path: "/",
        //     name: "LandingPage",
        //     component: () =>
        //         import(/* webpackChunkName: "demo" */ "./views/LandingPage.vue"),
        //     meta: {
        //         guest: true,
        //     },
        // },
        // {
        //     path: "*",
        //     name: "404PAGE",
        //     component: () =>
        //         import(/* webpackChunkName: "demo" */ "./views/ERROR/404PAGE.vue"),
        //     meta: {
        //         guest: true
        //     }
        // }
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