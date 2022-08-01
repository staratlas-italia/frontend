export const getTranslations = (locale?: string) => {
  switch (locale) {
    case "en":
      return import("src/i18n/translations/en.json");
    default:
      return import("src/i18n/translations/it.json");
  }
};
