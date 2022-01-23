import { PropsWithChildren } from "react";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";

type Props = PropsWithChildren<{ title: TranslationId }>;

export const Heading = ({ children, title }: Props) => (
  <BlurBackground align="center" p={5} justify="between">
    <Text color="white" size="6xl" weight="bold">
      <Translation id={title} />
    </Text>
    {children}
  </BlurBackground>
);
