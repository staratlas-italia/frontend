import styled from "styled-components";
import { Text, TextProps } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Currency } from "~/types";

type Props = TextProps & {
  value?: number | string;
  currency?: Currency;
};

const CurrencyImage = styled.img`
  width: 20px;
  height: 20px;
`;

export const Price = ({ value, currency = "USDC", ...props }: Props) => {
  return (
    <Flex align="center" className="space-x-2">
      <Text {...props}>
        {value
          ? (+value).toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          : "-"}
      </Text>
      <CurrencyImage
        src={`/images/currencies/${currency.toLowerCase()}_symbol.png`}
      />
    </Flex>
  );
};
