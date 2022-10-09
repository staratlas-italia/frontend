import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import { getMenuItems } from "~/components/layout/SideBarLayout/components/SideBarContent/getMenuItems";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    from: fromParam,
    publicKey: publicKeyParam,
    locale = "it",
  } = req.query;

  const publicKey = publicKeyParam as string | undefined;

  res.json({
    success: true,
    items: await getMenuItems(locale as string, publicKey),
  });
};

export default pipe(handler, matchMethodMiddleware(["GET"]));
