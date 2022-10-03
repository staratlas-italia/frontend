import { CITIZEN_MINT_USDC_PRICE } from "~/common/constants";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

const Item = ({ title, value }: { title: string; value: string }) => (
  <Flex justify="between">
    <Text color="text-gray-200">{title}</Text>
    <Text color="text-white" weight="semibold">
      {value}
    </Text>
  </Flex>
);

export const TransactionDetails = () => {
  return (
    <Flex direction="col" className="space-y-5">
      <Text color="text-white" size="xl" weight="semibold">
        Dettagli transazione
      </Text>
      <Flex direction="col" className="bg-gray-500 rounded-xl" p={6}>
        <Item title="Data" value={"-"} />
        <Item title="Importo" value={`-${CITIZEN_MINT_USDC_PRICE} USDC`} />
        <Item title="Stato" value="Completed" />
        <Item title="Fee" value="0.00005 SOL" />
      </Flex>
    </Flex>
  );
};
