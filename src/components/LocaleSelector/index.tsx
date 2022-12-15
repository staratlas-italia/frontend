import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "~/components/common/Text";

export const LocaleSelector = () => {
  const { locale, asPath } = useRouter();

  return (
    <div className="space-x-5">
      <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
        <Text
          color="text-white"
          size="2xl"
          transform="uppercase"
          weight={locale === "it" ? "bold" : "medium"}
        >
          IT
        </Text>
      </Link>
      <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
        <Text
          color="text-white"
          size="2xl"
          transform="uppercase"
          weight={locale === "en" ? "bold" : "medium"}
        >
          EN
        </Text>
      </Link>
    </div>
  );
};
