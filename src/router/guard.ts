import "nprogress/nprogress.css";

import NProgress from "nprogress";
import type { Router } from "vue-router";
import { useUserStore } from "#app/store/user.ts";

const routeWhiteList = new Set(["/login"]);
const tokenKey = "vue-launchpad-token";

function readStoredToken() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem(tokenKey);
}

function getAccessToken() {
  const userStore = useUserStore();
  return userStore.profile?.token ?? readStoredToken();
}

export function setupRouterGuard(router: Router) {
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 120,
  });

  router.beforeEach((to) => {
    NProgress.start();

    const token = getAccessToken();

    if (token && to.path === "/login") {
      return { path: "/" };
    }

    if (token || routeWhiteList.has(to.path)) {
      return true;
    }

    return {
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    };
  });

  router.afterEach(() => {
    NProgress.done();
  });

  router.onError(() => {
    NProgress.done();
  });
}
