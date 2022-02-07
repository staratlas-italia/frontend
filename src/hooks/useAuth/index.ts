import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { getAdminWallets } from "~/utils/getAdminWallets";

export const useAuth = () => {
  const { publicKey } = useWallet();

  const admins = useMemo(() => getAdminWallets(), []);

  return {
    isAdmin: publicKey ? admins.includes(publicKey?.toString()) : null,
  };
};
