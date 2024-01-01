import i18n from "i18next";
import { en } from "./resources/en";
import { vn } from "./resources/vn";
import { initReactI18next } from "react-i18next";

export const configLocalization = () => {
  return i18n.use(initReactI18next).init({
    lng: "vn",
    fallbackLng: "vn",

    resources: {
      en: {
        translation: en,
      },
      vn: {
        translation: vn,
      },
    },
    debug: false,
    cache: {
      enabled: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });
};
