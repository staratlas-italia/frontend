import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { SocialLinks } from "~/components/layout/SideBarLayout/components/SideBar/components/SocialLinks";
import { Translation } from "~/i18n/Translation";

export const Footer = () => {
  const { locale, asPath } = useRouter();

  return (
    <Flex direction="col">
      {/* <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
        <a>
          <Text
            color="white"
            size="4xl"
            transform="uppercase"
            weight="semibold"
          >
            {locale === "it" ? "en" : "it"}
          </Text>
        </a>
      </Link> */}
      <Flex pb={8} justify="center">
        <Link href="https://forms.gle/UhjNWDnsXq5bDxhE7">
          <a target="_blank">
            <Text color="white" weight="semibold" size="sm">
              <Translation id="Layout.Sidebar.Feedback.title" />
            </Text>
          </a>
        </Link>
      </Flex>
      <SocialLinks />
    </Flex>
  );
};
