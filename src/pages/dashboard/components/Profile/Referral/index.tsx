import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { getApiRoute } from "~/utils/getRoute";

const fetcher = (pk?: string) => (url: string) => {
  const params = new URLSearchParams();
  params.append("publicKey", pk!);

  return fetch(`${url}?${params}`).then((res) => res.json());
};

export const Referral = () => {
  const { publicKey } = useWallet();
  const { data } = useSWR<{ success: boolean; code: string | null }>(
    getApiRoute("/api/referral"),
    fetcher(publicKey?.toString())
  );

  if (data?.code) {
    return (
      <Text color="white" size="sm">
        {data.code}
      </Text>
    );
  }

  return <Button>Generate referral code</Button>;
};
