import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PromiseContent } from "~/types";
import { getTranslations } from "../getTranslations";

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
