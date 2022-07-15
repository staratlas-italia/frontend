import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminMiddleware } from "~/middlewares/isAdmin";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";

import { matchSignatureMiddleware } from "~/middlewares/matchSignature";
import { queryFactionTiers } from "~/queries/queryFactionTiers";
import { queryTiers } from "~/queries/queryTiers";
import { getFactionName } from "~/utils/getFactionName";
import { getTier } from "~/utils/getTier";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const tiers = await queryTiers();

  const tiersData = tiers.map(({ tier, quantity }) => {
    const tierData = getTier(tier);

    return {
      label: tierData.name,
      value: quantity * tierData.cost,
    };
  });

  const factionTiers = await queryFactionTiers();

  const factionTiersData = factionTiers.map(({ faction, tier, quantity }) => {
    const tierData = getTier(tier);
    const factionName = getFactionName(faction);

    return {
      label: factionName,
      value: quantity * tierData.cost,
    };
  });

  return res.status(200).json({
    data: { tiersData, factionTiersData },
  });
};

export default matchMethodMiddleware(
  isAdminMiddleware(matchSignatureMiddleware(handler)),
  ["POST"]
);
