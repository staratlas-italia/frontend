import { BN } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import invariant from "invariant";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { fetchSwapPrice } from "~/programs";

const Context = createContext<{ price: number } | null>(null);

export const SwapProgramPriceRetriever = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [price, setPrice] = useState<number>();

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const { swapAccount, quantity } = useSwapStateAccount();

  useEffect(() => {
    const run = async () => {
      if (!anchorWallet) {
        return;
      }

      const state = await fetchSwapPrice(connection, anchorWallet, swapAccount);

      const price = state.price.div(new BN(Math.pow(10, 6)));

      setPrice(price.toNumber() * (quantity || 1));
    };

    run();
  }, [anchorWallet, connection, swapAccount, quantity]);

  if (!price) {
    return null;
  }

  return <Context.Provider value={{ price }}>{children}</Context.Provider>;
};

export const useSwapProgramPrice = () => {
  const context = useContext(Context);

  invariant(context, "Should be used inside a SwapProgramPriceRetriever");

  return context.price;
};
