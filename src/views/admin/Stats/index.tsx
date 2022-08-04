import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect } from "react";
import { Heading } from "~/components/common/Heading";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { useAuthStore } from "~/stores/useAuthStore";
import { useChartsStore } from "~/stores/useChartsStore";
import { CoomingSoonChart } from "~/views/admin/Stats/components/CoomingSoonChart";
import { FactionsPie } from "~/views/admin/Stats/components/FactionsPie";
import { FactionTiersPie } from "~/views/admin/Stats/components/FactionTiersPie";
import { ShipsAvgBar } from "~/views/admin/Stats/components/ShipsAvgBar";

export const Stats = () => {
  const fetch = useChartsStore((state) => state.fetchChart);

  const { publicKey } = useWallet();

  const signature = useAuthStore((s) => s.signature);

  const fetchAllCharts = useCallback(
    (force: boolean = false) => {
      if (publicKey && signature) {
        fetch("avg-ship-quantity", publicKey.toString(), signature, force);
        fetch("faction-pie", publicKey.toString(), signature, force);
        fetch("faction-tiers-pie", publicKey.toString(), signature, force);
        fetch("tiers-pie", publicKey.toString(), signature, force);
      }
    },
    [fetch, publicKey, signature]
  );

  useEffect(() => {
    fetchAllCharts();
  }, [fetchAllCharts]);

  return (
    <Flex className="space-y-3" direction="col">
      <Heading
        title="Admin.Stats.title"
        rightContent={
          <Button textColor="text-white" onClick={() => fetchAllCharts(true)}>
            <Translation id="Admin.Stats.Refresh.action.title" />
          </Button>
        }
      />
      <Flex className="grid gap-3">
        <Flex className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FactionsPie title="Faction Pie" unit="%" />

          <FactionTiersPie unit="$" title="Faction Tiers" />
        </Flex>

        <Flex className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-3">
            <ShipsAvgBar title="Ships avg quantity" />
          </div>

          <div className="lg:col-span-2">
            <CoomingSoonChart />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};
