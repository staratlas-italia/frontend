import { schedule } from "@netlify/functions";
import {
  AccountInfo,
  clusterApiUrl,
  Connection,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
} from "@solana/web3.js";
import axios, { AxiosResponse } from "axios";
import { NormalizedShipStakingInfoExtended } from "~/types";
import { ScoreFleetResponse } from "~/types/api";
import { tier1BadgeMints } from "~/utils/getBadgeByMint/tier1";
import { tier2BadgeMints } from "~/utils/getBadgeByMint/tier2";
import { tier3BadgeMints } from "~/utils/getBadgeByMint/tier3";

const connection = new Connection(
  process.env.MAIN_RPC_ENDPOINT || clusterApiUrl("mainnet-beta")
);

const getLevel = (max?: number, filledAt?: number, burnTime?: number) =>
  (max || 0) -
  (new Date().getTime() - (filledAt || 0) * 1000) / (burnTime || 1);

const getShipLevel = (
  ship: NormalizedShipStakingInfoExtended,
  type: "food" | "tools" | "ammo" | "fuel"
) => {
  switch (type) {
    case "ammo":
      return getLevel(
        ship.armsMaxReserve,
        ship.armedAtTimestamp,
        ship.millisecondsToBurnOneArms
      );
    case "food":
      return getLevel(
        ship.foodMaxReserve,
        ship.fedAtTimestamp,
        ship.millisecondsToBurnOneFood
      );
    case "fuel":
      return getLevel(
        ship.fuelMaxReserve,
        ship.fueledAtTimestamp,
        ship.millisecondsToBurnOneFuel
      );
    case "tools":
      return getLevel(
        ship.toolkitMaxReserve,
        ship.repairedAtTimestamp,
        ship.millisecondsToBurnOneToolkit
      );
  }
};

// Runs every 30 minutes
exports.handler = schedule("@daily", async () => {
  console.log("Fleets check is starting at", Date.now());

  const mints = [...tier1BadgeMints, ...tier2BadgeMints, ...tier3BadgeMints];

  let fleet: AxiosResponse<ScoreFleetResponse>;

  let mintPublicKey: PublicKey,
    largestAccounts: any,
    largestAccountInfo: RpcResponseAndContext<AccountInfo<
      Buffer | ParsedAccountData
    > | null>,
    owner: string;
  for (let mint of mints) {
    mintPublicKey = new PublicKey(mint);

    largestAccounts = await connection.getTokenLargestAccounts(mintPublicKey);

    largestAccountInfo = await connection.getParsedAccountInfo(
      largestAccounts.value[0].address
    );

    owner = (largestAccountInfo.value?.data as ParsedAccountData)?.parsed.info
      .owner;

    if (owner) {
      console.log(`checking ${owner} fleet`);
      fleet = await axios.get<ScoreFleetResponse>(
        `https://app.staratlasitalia.com/api/score/${owner}`
      );

      if (fleet.data.success) {
        for (let ship of fleet.data.data) {
          if (getShipLevel(ship, "ammo") < (ship.armsMaxReserve * 10) / 100) {
            console.log(`Arms for ship ${ship.shipMint} are less then 10%`);
          }

          if (getShipLevel(ship, "food") < (ship.foodMaxReserve * 10) / 100) {
            console.log(`Food for ship ${ship.shipMint} are less then 10%`);
          }

          if (getShipLevel(ship, "fuel") < (ship.fuelMaxReserve * 10) / 100) {
            console.log(`Fuel for ship ${ship.shipMint} are less then 10%`);
          }

          if (
            getShipLevel(ship, "tools") <
            (ship.toolkitMaxReserve * 10) / 100
          ) {
            console.log(`Tools for ship ${ship.shipMint} are less then 10%`);
          }
        }
      }
    }
  }

  return { statusCode: 200 };
});
