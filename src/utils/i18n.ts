import type { InjectionKey, Ref } from "vue";

export type LaunchpadLocale = "zh" | "en";

export interface LocaleMessages {
  [key: string]: LocaleMessages | string;
}

export interface LaunchpadI18nBridge {
  locale: Ref<LaunchpadLocale>;
  setLocale: (locale: LaunchpadLocale) => void;
  t: (key: string) => string;
}

export const launchpadI18nKey: InjectionKey<LaunchpadI18nBridge> = Symbol("launchpad-i18n");
