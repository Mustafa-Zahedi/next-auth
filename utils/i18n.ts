import i18next from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
//import XHR from "i18next-xhr-backend";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translationEng from "@/public/locales/en/translation.json";
import translationGer from "@/public/locales/ger/translation.json";
import translationFre from "@/public/locales/fr/translation.json";
import translationTr from "@/public/locales/tr/translation.json";

const LangResources = {
  en: {
    translations: translationEng,
  },
  ger: {
    translations: translationGer,
  },
  fre: {
    translations: translationFre,
  },
  tr: {
    translations: translationTr,
  },
};

i18next
  // .use(XHR)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    react: {
      useSuspense: false, //   <---- FOR SUSPENSE ERRORS.
    },
    debug: false,
    lng: "en",
    //lng: ["en", "tr", "fre", "ger"],
    fallbackLng: "en", // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss,
    },

    //resources: LangResources,
    // have a common namespace used around the full app
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18next;
