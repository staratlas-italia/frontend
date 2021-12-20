import { Price } from "~/components/common/Price";
import { Flex } from "~/components/layout/Flex";
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
  Cell: ({ cell }) => (
    <Flex justify="end">
      <Price currency={currency} value={cell.value} />
    </Flex>
  ),
});

export const buildAtlasPriceColumn = ({
  accessor,
  atlasValue,
  currency,
  name,
}: Param & { atlasValue: number }) => ({
  Header: name,
  accessor,
  Cell: ({ cell }) => (
    <Flex justify="end" className="space-x-2">
      {cell.value ? (
        <>
          <Price currency={"USDC"} value={cell.value * atlasValue} />
          <Flex>
            (<Price small size="sm" currency={currency} value={cell.value} />)
          </Flex>
        </>
      ) : (
        "-"
      )}
    </Flex>
  ),
});
