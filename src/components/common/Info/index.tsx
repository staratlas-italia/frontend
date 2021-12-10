import { PropsWithChildren } from "react";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

type Props = PropsWithChildren<{
  title?: string;
  loading?: boolean;
}>;

export const InfoRow = ({ loading, title, children }: Props) => {
  return (
    <Flex direction="col">
      <Text size="xl">
        {loading ? (
          <Flex pl={2}>
            <Loader />
          </Flex>
        ) : (
          children || "-"
        )}
      </Text>
      <Text weight="bold" transform="uppercase" size="sm" color="gray-300">
        {title}
      </Text>
    </Flex>
  );
};
