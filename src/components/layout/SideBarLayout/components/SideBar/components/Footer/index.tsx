import { useRouter } from "next/router";
import { Flex } from "~/components/layout/Flex";
import { SocialLinks } from "~/components/layout/SideBarLayout/components/SideBar/components/SocialLinks";

export const Footer = () => {
  const { locale, asPath } = useRouter();

  return (
    <Flex px={8} pb={8} justify={"between"}>
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
      <SocialLinks />
    </Flex>
  );
};
