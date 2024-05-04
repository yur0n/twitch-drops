import { mergeTranslations, TranslationMessages } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import russianMessages from "ra-language-russian";
import englishMessages from "ra-language-english";
import customEnglishMessages from "./locales/en";
import customRussianMessages from "./locales/ru";

const en = mergeTranslations(englishMessages, customEnglishMessages);
const ru = mergeTranslations(russianMessages, customRussianMessages);

const messages: { [key: string]: TranslationMessages } = { en, ru };

export const i18nProvider = polyglotI18nProvider(
  (locale) => messages[locale],
  "en",
  [
    { locale: "en", name: "English" },
    { locale: "ru", name: "Русский" },
  ]
);
