import { NextApiRequest, NextApiResponse } from "next";

const handler = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { pubkey } = query;

  if (!pubkey) {
    res.status(404).json({
      error: "Invalid player pubkey",
    });
  }

  let response = await fetch(
    `${process.env.STAR_ATLAS_API_URL}/players/${pubkey}`
  );

  let data = await response.json();

  res.status(200).json(data);
};

export default handler;
