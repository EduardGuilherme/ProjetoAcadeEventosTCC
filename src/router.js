import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import CreateEvent from "./views/CreateEvent.vue";
import Favorite from "./views/Favorite.vue";
import Menu from "./views/Menu.vue";
import Event from "./views/Event.vue";
import ConfirmationCreateEvent from "./views/ConfirmationCreateEvent.vue";
import CreateAccount from './views/CreateAccount.vue';
import CreateProfile from './views/CreateProfile.vue';
import Configuration from "./views/Configuration.vue"
import AdministratorPage from "./views/AdministratorPage.vue";
import Auth from "./auth/index.js";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/home"
            });
          }
        }
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/create-event",
      name: "create-event",
      component: CreateEvent,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/favorite",
      name: "favorite",
      component: Favorite,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/event/:id",
      name: "event",
      component: Event,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: ConfirmationCreateEvent,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccount,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/create-profile",
      name: "create-profile",
      component: CreateProfile,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/configuration",
      name: "Configuration",
      component: Configuration,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (Auth.is_Auth()) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        }
      }
    },
    {
      path: "/administrator",
      name: "AdministratorPage",
      component: AdministratorPage,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (!to.matched.some(record => record.meta.requiresAuth)) {
          next();
        } else {
          if (parseInt(localStorage.getItem('is_admin')) !== 0) {
            next();
          } else {
            next({
              path: "/home"
            });
          }
        }
      }
    },
  ]
});
