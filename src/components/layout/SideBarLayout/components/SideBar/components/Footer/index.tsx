import Link from "next/link";
import packageJson from "~/../package.json";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { SocialLinks } from "~/components/layout/SideBarLayout/components/SideBar/components/SocialLinks";
import { LocaleSelector } from "~/components/LocaleSelector";
import { Translation } from "~/i18n/Translation";

export const Footer = () => (
  <Flex direction="col">
    <Flex justify="center" pb={5}>
      <LocaleSelector />
    </Flex>
    <Flex pb={8} justify="center">
      <Link href="https://forms.gle/UhjNWDnsXq5bDxhE7" target="_blank">
        <Text color="text-white" weight="semibold" size="sm">
          <Translation id="Layout.Sidebar.Feedback.title" />
        </Text>
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
