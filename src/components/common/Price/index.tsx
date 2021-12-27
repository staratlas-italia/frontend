import styled from "styled-components";
import { Text, TextProps } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Currency } from "~/types";

type Props = TextProps & {
  small?: boolean;
  value?: number | string;
  currency?: Currency;
  decimals?: number;
};

type P = { small?: boolean };

const CurrencyImage = styled.img<P>`
  width: ${({ small }) => (small ? 15 : 20)}px;
  height: ${({ small }) => (small ? 15 : 20)}px;
`;

export const Price = ({
  currency = "USDC",
  decimals = 2,
  small,
  value,
  ...props
}: Props) => {
  return (
    <Flex as="span" align="center" className="space-x-1">
      <Text {...props}>
        {value
          ? (+value)
              .toFixed(decimals)
              ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          : "-"}
      </Text>
      {!!value && (
        <CurrencyImage
          small={small}
          src={`/images/currencies/${currency.toLowerCase()}_symbol.png`}
        />
      )}
    </Flex>
  );
};
