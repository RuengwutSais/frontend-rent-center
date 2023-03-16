import Vue from "vue";
import Router from "vue-router";

import DashboardLayoutAdmin from "@/views/template/Layout/DashboardLayoutAdmin.vue";
import DashboardLayoutUser from "@/views/template/Layout/DashboardLayoutUser.vue";
import Dashboard from "@/views/template/Dashboard.vue";
import TableList from "@/views/template/TableList.vue";
import Typography from "@/views/template/Typography.vue";
import Icons from "@/views/template/Icons.vue";
import Maps from "@/views/template/Maps.vue";
import UpgradeToPRO from "@/views/template/UpgradeToPRO.vue";
import LayoutLandingPage from "@/views/template/Layout/LayoutLandingPage.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/admin",
      component: DashboardLayoutAdmin,
      redirect: "/admin/dashboard",
      children: [
        {
          path: "dashboard",
          name: "DashboardView",
          component: Dashboard,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "user",
          name: "User Profile",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/template/UserProfile.vue"),
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
      },
    },
    {
      path: "/manage",
      component: DashboardLayoutUser,
      redirect: "/manage/dashboard",
      children: [
        {
          path: "dashboard",
          name: "DashboardView",
          component: Dashboard,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "user",
          name: "User Profile",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/template/UserProfile.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "chatuser",
          name: "ChatPage",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/ChatTemplate.vue"),
          meta: {
            guest: true,
            hideFooter: true
          }
        },
      ]
    },
    {
      path: "/",
      component: LayoutLandingPage,
      redirect: "/landingpage",
      children: [
        {
          path: "landingpage",
          name: "LandingPage",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/LandingPage.vue"),
        },
        {
          path: "termpage",
          name: "TermPage",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/TermOfServicePage.vue"),
        },
        {
          path: "estatedetail",
          name: "EstateDetail",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/EstateDetailPage.vue"),
        },
        {
          path: "login",
          name: "Login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/LoginForm.vue"),
        },
        {
          path: "register",
          name: "Register",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/RegisterForm.vue"),
        },
        {
          path: "listestate",
          name: "listestate",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/ListEstatePage.vue")
        }
      ],
      meta: {
        guest: true,
      },
    },
    {
      path: "*",
      name: "404PAGE",
      component: () =>
        import(/* webpackChunkName: "demo" */ "./views/error/404PAGE.vue"),
      meta: {
        guest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.admin)) {
    if (localStorage.getItem("admin_token") !== null) {
      next();
    } else {
      next({
        path: "/404FOUND",
      });
    }
  } else if (to.matched.some((record) => record.meta.guest)) {    
    next();
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    if(localStorage.getItem("token") === null) {
      next({
        path: "/404FOUND",
      });
    }else {
      next();
    }
  }
});

export default router;
