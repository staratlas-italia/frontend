import { TableIcon, ViewGridIcon } from "@heroicons/react/outline";
import { Flex } from "~/components/layout/Flex";

export type ToolbarState = "table" | "grid";

type Props = { type?: ToolbarState; onChange?: (type: ToolbarState) => void };

export const Toolbar = ({ type = "grid", onChange }: Props) => (
  <Flex justify="end">
    <Flex
      as="button"
      className="relative"
      onClick={() => onChange?.(type === "grid" ? "table" : "grid")}
    >
      {type === "grid" ? (
        <TableIcon className="h-8 w-8 text-white" />
      ) : (
        <ViewGridIcon className="h-8 w-8 text-white" />
      )}
    </Flex>
  </Flex>
);
