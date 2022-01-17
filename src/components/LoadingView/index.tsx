import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Translation } from "~/i18n/Translation";

export const LoadingView = () => (
  <BlurBackground py={5} justify="center" align="center">
    <Loader color="white" />
    <Text size="xl" color="white" weight="semibold">
      <Translation id="Layout.Loader.title" />
    </Text>
  </BlurBackground>
);
