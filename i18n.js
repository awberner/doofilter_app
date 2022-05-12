import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//empty for now
import en from "./app/assets/locales/en";
import fr from "./app/assets/locales/fr";
import de from "./app/assets/locales/de";

const resources = {
    fr: {
        translation: fr,
    },
    en: {
        translation: en,
    },
    de: {
        translation: de,
    }
};


const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: cb => cb('en'),
    init: () => {},
    cacheUserLanguage: () => {},
};


i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        whitelist: ['en', 'fr', 'de', 'es'],
        resources,
        //language to use if translations in user language are not available
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // not needed for react!!
        },
    });

export default i18n;
