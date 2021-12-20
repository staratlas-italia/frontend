import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

type Param = {
  name: string;
  imageUrlAccessor: string;
  accessor: string;
  sortDisabled?: boolean;
};

export const buildNameColumn = ({
  accessor,
  imageUrlAccessor,
  name,
  sortDisabled,
}: Param) => ({
  Header: name,
  accessor,
  sortDisabled,
  Cell: ({ row, cell }) => (
    <Flex align="center" className="space-x-3">
      <img
        src={row.original[imageUrlAccessor]}
        className="h-16 w-16 object-cover"
      />
      <Text className="my-3">{cell.value}</Text>
    </Flex>
  ),
});
