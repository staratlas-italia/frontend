import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { SocialLinks } from "~/components/layout/SideBarLayout/components/SideBar/components/SocialLinks";

export const Footer = () => {
  const { locale, asPath } = useRouter();

  return (
    <Flex py={5}>
      <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
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
      </Link>
      <SocialLinks />
    </Flex>
  );
};
