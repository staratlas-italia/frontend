import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

export type ToolbarState = "table" | "grid";

type Props = { type?: ToolbarState; onChange?: (type: ToolbarState) => void };

export const Toolbar = ({ type = "grid", onChange }: Props) => (
  <Flex justify="end">
    <Flex
      as="button"
      className="relative"
      pb={5}
      onClick={() => onChange?.(type === "grid" ? "table" : "grid")}
    >
      {type === "grid" ? (
        <Text size="xl" color="white" weight="bold">
          Show table
        </Text>
      ) : (
        <Text size="xl" color="white" weight="bold">
          Show grid
        </Text>
      )}
    </Flex>
  </Flex>
);
