import { en } from "./resources/en";
import { vn } from "./resources/vn";
import { createI18n } from "vue3-i18n";

export const configLocalization = () => {
    return createI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages: {
            en: en,
            vi: vn,
        },
    });
};
