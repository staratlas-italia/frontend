import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminMiddleware } from "~/middlewares/isAdmin";
import { isPostMiddleware } from "~/middlewares/isPost";
import { matchSignatureMiddleware } from "~/middlewares/matchSignature";
import { queryFactionMemebers } from "~/queries/queryFactionMembers";
import { getFactionName } from "~/utils/getFactionName";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const members = await queryFactionMemebers();

  const data = members.map(({ faction, none_faction, total_member }) => ({
    label: getFactionName(faction),
    value: total_member + none_faction,
  }));

  return res.status(200).json({
    data,
  });
};

export default isPostMiddleware(
  isAdminMiddleware(matchSignatureMiddleware(handler))
);
