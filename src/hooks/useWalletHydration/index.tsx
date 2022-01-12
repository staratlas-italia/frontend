import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useInterval } from "~/hooks/useInterval";
import { useWalletStore } from "~/stores/useWalletStore";

const SECONDS = 1000;

export default function useWalletHydration() {
  const {
    connected,
    connection,
    current,
    set: setWalletStore,
    actions,
  } = useWalletStore((state) => state);
  const { adapter } = useWallet();

  useEffect(() => {
    if (adapter) {
      const updateWallet = () => {
        // hack to also update wallet synchronously in case it disconnects
        setWalletStore((state) => {
          state.current = adapter;
        });
      };

      if (document.readyState !== "complete") {
        // wait to ensure that browser extensions are loaded
        const listener = () => {
          updateWallet();
          window.removeEventListener("load", listener);
        };
        window.addEventListener("load", listener);
        return () => window.removeEventListener("load", listener);
      } else {
        updateWallet();
      }
    }
  }, [adapter, connection]);

  useEffect(() => {
    if (!current) return;
    current.on("connect", async () => {
      setWalletStore((state) => {
        state.connected = true;
      });
      // notify({
      //   message: "Wallet connected",
      //   description:
      //     "Connected to wallet " +
      //     shortenAddress(current!.publicKey!.toString()),
      // });
      await actions.fetchWalletTokenAccounts();
    });
    current.on("disconnect", () => {
      setWalletStore((state) => {
        state.connected = false;
        state.tokenAccounts = [];
      });
      // notify({
      //   type: "info",
      //   message: "Disconnected from wallet",
      // });
    });
    return () => {
      current?.disconnect?.();
      setWalletStore((state) => {
        state.connected = false;
      });
    };
  }, [current]);

  // fetch on page load
  useEffect(() => {
    const pageLoad = async () => {
      console.log("pageLoad");
    };
    pageLoad();
  }, []);

  // refresh regularly
  useInterval(async () => {
    console.log("refresh");
  }, 10 * SECONDS);

  return { connected, wallet: adapter };
}
