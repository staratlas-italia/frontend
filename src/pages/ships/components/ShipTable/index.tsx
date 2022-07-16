import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import shallow from "zustand/shallow";
import { ButtonGroup } from "~/components/controls/ButtonGroup";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Table } from "~/components/Table";
import { useShips } from "~/hooks/useShips";
import { useShipsDealsStore } from "~/stores/useShipsDealsStore";
import { columns } from "./columns";

export type MarketAction = "buy" | "sell";

export const ShipTable = () => {
  const { ships } = useShips();
  const fetchPrices = useShipsDealsStore((s) => s.fetch);

  const { data, atlasPrice } = useShipsDealsStore(
    (s) => ({ data: Object.values(s.data), atlasPrice: s.atlasPrice }),
    shallow
  );

  const [action, setAction] = useState<MarketAction>("buy");

  const intl = useIntl();

  const { locale } = useRouter();

  const cols = useMemo(
    () =>
      columns({
        action,
        locale,
        atlasPrice,
        formatMessage: intl.formatMessage,
      }),
    [action, atlasPrice, intl]
  );

  const fetch = useCallback(() => fetchPrices(ships), [ships]);

  return (
    <BlurBackground className="relative overflow-hidden" p={5} mdP={8}>
      <Flex
        className="overflow-scroll space-y-5"
        direction="col"
        justify="center"
      >
        <ButtonGroup
          items={[
            ["buy", "Ships.Table.Buy.action.title"],
            ["sell", "Ships.Table.Sell.action.title"],
          ]}
          onAction={(action) => setAction(action as MarketAction)}
          selectedItem={action}
        />
        <Table columns={cols} data={data} fetchData={fetch} />
      </Flex>
    </BlurBackground>
  );
};
