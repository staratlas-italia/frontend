import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

type Param = {
  name: string;
  accessor: string;
  prefix?: string;
  suffix?: string;
};

export const buildDiscountColumn = ({
  accessor,
  name,
  prefix,
  suffix,
}: Param) => ({
  Header: name,
  accessor,
  Cell: ({ cell }) => (
    <Flex justify="end">
      <Text
        align="center"
        weight="medium"
        color={cell.value > 0 ? "text-emerald-300" : "text-red-300"}
        className="px-4 py-2"
      >
        {cell.value ? (
          <>
            {prefix || null}
            {Math.abs(cell.value).toFixed(2)}
            {suffix || null}
          </>
        ) : (
          "-"
        )}
      </Text>
    </Flex>
  ),
});
