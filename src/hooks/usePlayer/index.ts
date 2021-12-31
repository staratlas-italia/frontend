import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import useSWR from "swr";
import { Avatar, Currency } from "~/types";
import { getAvatarImageUrl } from "~/utils/getAvatarImageUrl";

const fetcher = (url) => fetch(url).then((res) => res.json());

type Player = {
  avatarId: Avatar;
  badgeMint: string | null;
  balance: number;
  balances: {
    _id: string;
    mint: string;
    quantity: number;
    valuePerAsset: number;
  }[];
  country: string;
  currencySymbol: Currency;
  faction: number;
  factionRank: number;
  publicKey: string;
  rank: number;
  registrationDate: string;
  updatedAt: string;
};

export const usePlayer = () => {
  const { publicKey } = useWallet();

  const { data, error } = useSWR<Player>(
    `/api/player?pubkey=${publicKey}`,
    fetcher
  );

  const avatarImageUrl = useMemo(
    () => (data ? getAvatarImageUrl(data?.avatarId as Avatar) : undefined),
    [data]
  );
  return {
    ...data,
    avatarImageUrl,
    loading: !data && !error,
  };
};
