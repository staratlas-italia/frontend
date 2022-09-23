import Link from "next/link";
import { useRouter } from "next/router";
import packageJson from "~/../package.json";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { SocialLinks } from "~/components/layout/SideBarLayout/components/SideBar/components/SocialLinks";
import { Translation } from "~/i18n/Translation";

export const Footer = () => {
  const { locale, asPath } = useRouter();

  return (
    <Flex direction="col">
      <Flex justify="center" pb={5} className="space-x-5">
        <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
          <a>
            <Text
              color="text-white"
              size="2xl"
              transform="uppercase"
              weight={locale === "it" ? "bold" : "medium"}
            >
              IT
            </Text>
          </a>
        </Link>
        <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
          <a>
            <Text
              color="text-white"
              size="2xl"
              transform="uppercase"
              weight={locale === "en" ? "bold" : "medium"}
            >
              EN
            </Text>
          </a>
        </Link>
      </Flex>
      <Flex pb={8} justify="center">
        <Link href="https://forms.gle/UhjNWDnsXq5bDxhE7">
          <a target="_blank">
            <Text color="text-white" weight="semibold" size="sm">
              <Translation id="Layout.Sidebar.Feedback.title" />
            </Text>
          </a>
        </Link>
      </Flex>

      <SocialLinks />

      <Flex pb={8} justify="center">
        <Text color="text-white" size="xs" weight="semibold">
          v{packageJson.version}
        </Text>
      </Flex>
    </Flex>
  );
};
