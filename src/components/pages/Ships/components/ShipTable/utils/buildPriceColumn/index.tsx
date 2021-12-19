import { Price } from "~/components/common/Price";
import { ColorName } from "~/components/layout/Pane";
import { Currency } from "~/types";

type Param = {
  accessor: string;
  color?: ColorName;
  currency: Currency;
  name: string;
};

export const buildPriceColumn = ({ accessor, currency, name }: Param) => ({
  Header: name,
  accessor,
  Cell: ({ cell }) => <Price currency={currency} value={cell.value} />,
});
