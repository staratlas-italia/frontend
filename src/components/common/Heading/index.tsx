import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";

type Props = { title: TranslationId };

export const Heading = ({ title }: Props) => (
  <BlurBackground p={5}>
    <Text color="white" size="6xl" weight="bold">
      <Translation id={title} />
    </Text>
  </BlurBackground>
);
