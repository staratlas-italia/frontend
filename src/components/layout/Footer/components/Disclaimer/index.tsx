import { Text } from "~/components/common/Text";
import { Translation } from "~/i18n/Translation";

export const Disclaimer = () => {
  return (
    <Text color="white" size="xs">
      <Translation id="Layout.Footer.Disclaimer.text" />
    </Text>
  );
};
