import { Text } from "~/components/common/Text";

type Param = {
  name: string;
  accessor: string;
  sortDisabled?: boolean;
};

export const buildImageColumn = ({ accessor, name, sortDisabled }: Param) => ({
  Header: name,
  accessor,
  sortDisabled,
  Cell: ({ cell }) => (
    <Text className="my-3">
      <img src={cell.value} className="h-16 w-16 object-cover" />
    </Text>
  ),
});
