import React from "react";
import { useIntl } from "react-intl";
import { Text } from "~/components/common/Text";

type Props = {
  text: string;
};

export const Description = ({ text }: Props) => {
  const intl = useIntl();

  return (
    <Text as="p" size="base" smSize="lg" mdSize="xl" color="text-gray-100">
      {text.substring(0, 200).trim()}
      {"..."}
    </Text>
  );
};
