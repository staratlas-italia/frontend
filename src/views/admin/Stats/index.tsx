import { useCallback, useEffect } from "react";
import { Heading } from "~/components/common/Heading";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { useChartsStore } from "~/stores/useChartsStore";
import { SaiBar } from "./components/SaiBar";
import { SaiPie } from "./components/SaiPie";

export const Stats = () => {
  const fetch = useChartsStore((state) => state.fetchChart);

  const fetchAllCharts = useCallback(
    (force: boolean = false) => {
      fetch("avg-ship-quantity", force);
      fetch("faction-pie", force);
      fetch("faction-tiers-pie", force);
    },
    [fetch]
  );

  useEffect(() => {
    fetchAllCharts();
  }, []);

  return (
    <Flex className="space-y-3" direction="col">
      <Heading
        title="Admin.Stats.title"
        RightContent={
          <Button textColor="white" onClick={() => fetchAllCharts(true)}>
            <Translation id="Admin.Stats.Refresh.action.title" />
          </Button>
        }
      />
      <Flex className="grid gap-3">
        <Flex className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SaiPie title="Faction Pie" chart="faction-pie" unit="%" />
          <SaiPie
            unit="Tiers"
            title="Faction Tiers"
            chart="faction-tiers-pie"
          />
        </Flex>

        <Flex className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <SaiBar title="Ships avg quantity" chart="avg-ship-quantity" />
          </div>

          <SaiPie title="Faction Pie" chart="faction-pie" />
        </Flex>
      </Flex>
    </Flex>
  );
};
