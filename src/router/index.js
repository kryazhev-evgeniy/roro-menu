import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    meta: { auth: true },
    component: () => import("../views/admin/Users.vue"),
  },
  {
    path: "/admin/dishes",
    name: "admin-dihes",
    meta: { auth: true },
    component: () => import("../views/admin/Dishes.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.getters.Token;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !token) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
