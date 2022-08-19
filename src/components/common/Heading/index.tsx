import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";
import { StrictReactNode } from "~/types";

type Props = { title: TranslationId; rightContent?: StrictReactNode };

export const Heading = ({ title, rightContent = null }: Props) => (
  <BlurBackground p={5} justify="between">
    <Text color="text-white" size="4xl" weight="bold">
      <Translation id={title} />
    </Text>
    <Flex align="center">
      <>{rightContent}</>
    </Flex>
  </BlurBackground>
);
