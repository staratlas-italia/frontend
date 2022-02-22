import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";

type Props = {
  title?: TranslationId;
};

export const LoadingView = ({ title }: Props) => (
  <BlurBackground py={5} justify="center" align="center">
    <Loader color="white" />
    <Text size="xl" color="white" weight="semibold">
      <Translation id={title || "Layout.Loader.title"} />
    </Text>
  </BlurBackground>
);
