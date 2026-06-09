import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { request } from "#app/utils/request.ts";

export interface UserProfile {
  id: string;
  name: string;
  role: "guest" | "developer" | "admin";
  token: string;
}

export interface LoginPayload {
  account: string;
  password: string;
}

export const useUserStore = defineStore("user", () => {
  const profile = ref<UserProfile | null>(null);
  const loading = ref(false);
  const isLoggedIn = computed(() => Boolean(profile.value?.token));
  const displayName = computed(() => profile.value?.name ?? "Launchpad Pilot");

  async function login(payload: LoginPayload) {
    loading.value = true;

    try {
      const data = await request.post<UserProfile>("/auth/login", payload, {
        skipAuth: true,
      });
      profile.value = data;
      localStorage.setItem("vue-launchpad-token", data.token);
      return data;
    } finally {
      loading.value = false;
    }
  }

  function useMockPilot() {
    const token = crypto.randomUUID();
    profile.value = {
      id: "pilot-001",
      name: "Vue Architect",
      role: "developer",
      token,
    };
    localStorage.setItem("vue-launchpad-token", token);
  }

  function logout() {
    profile.value = null;
    localStorage.removeItem("vue-launchpad-token");
  }

  return {
    displayName,
    isLoggedIn,
    loading,
    login,
    logout,
    profile,
    useMockPilot,
  };
});
