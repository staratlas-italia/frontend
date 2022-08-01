import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTranslations } from "~/i18n/getTranslations";
import { PromiseContent } from "~/types";

export const useTranslations = () => {
  const { locale } = useRouter();

  const [translations, setTranslations] =
    useState<PromiseContent<ReturnType<typeof getTranslations>>["default"]>();

  useEffect(() => {
    const run = async () => {
      const { default: translationsChunk } = await getTranslations(locale);

      setTranslations(translationsChunk);
    };

    run();
  }, [locale]);

  return translations;
};
