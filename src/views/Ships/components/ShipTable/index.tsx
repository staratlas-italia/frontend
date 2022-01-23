import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { ButtonGroup } from "~/components/controls/ButtonGroup";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Table } from "~/components/Table";
import { columns } from "~/views/Ships/components/ShipTable/columns";
import {
  MarketAction,
  useShipsTable,
} from "~/views/Ships/components/ShipTable/useShipsTable";

export const ShipTable = () => {
  const [action, setAction] = useState<MarketAction>("buy");

  const [fetch, { data, atlasPrice }] = useShipsTable();

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

  return (
    <BlurBackground className="relative overflow-hidden" p={5} mdP={8}>
      <Flex
        className="overflow-scroll space-y-5"
        direction="col"
        justify="center"
      >
        <ButtonGroup
          items={[
            ["buy", "I want to buy"],
            ["sell", "I want to sell"],
          ]}
          onAction={(action) => setAction(action as MarketAction)}
          selectedItem={action}
        />
        <Table
          columns={cols}
          data={data}
          fetchData={fetch}
          //loading={loading}
        />
      </Flex>
    </BlurBackground>
  );
};
