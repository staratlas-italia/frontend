import { useMemo } from "react";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { useSwapProgramPrice } from "~/hooks/useSwapProgramPrice";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";

const Item = ({ title, value }: { title: string; value: string }) => (
  <Flex justify="between">
    <Text color="text-gray-200">{title}</Text>
    <Text color="text-white" weight="semibold">
      {value}
    </Text>
  </Flex>
);

export const TransactionDetails = () => {
  const amount = useSwapProgramPrice();

  const { quantity, vaultCurrency } = useSwapStateAccount();

  const dateLabel = useTranslation(
    "citizenship.checkout.confirmed.details.date.label"
  );

  const amountLabel = useTranslation(
    "citizenship.checkout.confirmed.details.amount.label"
  );

  const stateLabel = useTranslation(
    "citizenship.checkout.confirmed.details.state.label"
  );

  const feeLabel = useTranslation(
    "citizenship.checkout.confirmed.details.fee.label"
  );

  const state = useTranslation(
    "citizenship.checkout.confirmed.details.state.completed"
  );

  const date = useMemo(() => new Date().toLocaleDateString(), []);

  return (
    <Flex direction="col" className="space-y-5">
      <Text color="text-white" size="xl" weight="semibold">
        <Translation id="citizenship.checkout.confirmed.details.label" />
      </Text>

      <Flex direction="col" className="bg-gray-700 rounded-xl" p={6}>
        <Item title={dateLabel} value={date} />
        <Item
          title={amountLabel}
          value={`-${(amount * (quantity || 1)).toFixed(2)} ${vaultCurrency}`}
        />
        <Item title={stateLabel} value={state} />
        <Item title={feeLabel} value="0.00005 SOL" />
      </Flex>
    </Flex>
  );
};
