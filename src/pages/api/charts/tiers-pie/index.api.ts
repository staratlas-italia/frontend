import { withSentry } from "@sentry/nextjs";
import { pipe } from "fp-ts//function";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminMiddleware } from "~/middlewares/isAdmin";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { matchSignatureMiddleware } from "~/middlewares/matchSignature";
import { queryTiers } from "~/queries/queryTiers";
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

  return res.status(200).json({
    data: tiersData,
  });
};

export default pipe(
  handler,
  withSentry,
  matchMethodMiddleware(["POST"]),
  isAdminMiddleware,
  matchSignatureMiddleware
);
