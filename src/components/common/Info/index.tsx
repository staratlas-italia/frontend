import { PropsWithChildren } from "react";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { ColorName } from "~/components/layout/Pane";

type Props = PropsWithChildren<{
  color?: ColorName;
  loading?: boolean;
  title?: string;
}>;

export const InfoRow = ({ color, loading, title, children }: Props) => {
  return (
    <Flex>
      <Flex direction="col">
        <Text size="xl">
          {loading ? (
            <Flex pl={2}>
              <Loader color="white" />
            </Flex>
          ) : (
            children || "-"
          )}
        </Text>
        <Text
          weight="bold"
          transform="uppercase"
          size="sm"
          color={color || "gray-300"}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};
