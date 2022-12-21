import classNames from "classnames";
import { FormattedNumber } from "react-intl";
import styled from "styled-components";
import { Text, TextProps } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Currency } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Props = TextProps & {
  inverse?: boolean;
  small?: boolean;
  value?: number | string | null;
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
  inverse,
  ...props
}: Props) => {
  return (
    <Flex
      direction={inverse ? "row-reverse" : "row"}
      as="span"
      align="center"
      className={classNames("space-x-1", {
        "space-x-reverse": inverse,
      })}
    >
      <Text {...props}>
        {!isNullOrUndefined(value) ? (
          <FormattedNumber
            value={+(value || 0)}
            minimumFractionDigits={decimals}
            maximumFractionDigits={decimals}
          />
        ) : (
          "-"
        )}
      </Text>
      {!isNullOrUndefined(value) && currency !== "NONE" && (
        <CurrencyImage
          small={small}
          src={`/images/currencies/${currency.toLowerCase()}_symbol.png`}
        />
      )}
    </Flex>
  );
};
