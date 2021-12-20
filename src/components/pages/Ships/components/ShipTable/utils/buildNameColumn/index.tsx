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
    <Flex
      align="start"
      lgAlign="center"
      direction="col"
      lgDirection="row"
      justify="start"
      className="lg:space-x-3"
    >
      <img
        src={row.original[imageUrlAccessor]}
        className="h-12 w-12 object-cover"
      />
      <Text>{cell.value}</Text>
    </Flex>
  ),
});
