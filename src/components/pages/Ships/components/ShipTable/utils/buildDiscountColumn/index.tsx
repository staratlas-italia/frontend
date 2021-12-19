import { Text } from "~/components/common/Text";

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
    <Text
      align="center"
      weight="medium"
      color={cell.value > 0 ? "green-300" : "red-300"}
      className="px-4 py-2"
    >
      {prefix || null}
      {Math.abs(cell.value).toFixed(2)}
      {suffix || null}
    </Text>
  ),
});
