import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";

export const Links = () => {
  return (
    <Flex className="space-x-3">
      <Link href="https://staratlasitalia.com/termini-condizioni/">
        <a target="_blank">
          <Text color="white" decoration="underline" size="xs">
            <Translation id="Layout.Footer.TermsAndCondition.action.title" />
          </Text>
        </a>
      </Link>
      <Link href="https://staratlasitalia.com/privacy-policy/">
        <a target="_blank">
          <Text color="white" decoration="underline" size="xs">
            <Translation id="Layout.Footer.PrivacyPolicy.action.title" />
          </Text>
        </a>
      </Link>
    </Flex>
  );
};
