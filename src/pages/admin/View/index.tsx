import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCluster } from "~/components/ClusterProvider";
import { Heading } from "~/components/common/Heading";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { AddProgramInstanceModal } from "~/components/modals/AddProgramInstanceModal";
import { useModal } from "~/contexts/ModalContext";
import { useTransactionToast } from "~/hooks/useTransactionToast";
import { ProgramInstance } from "~/pages/admin/View/ProgramInstance";
import {
  getAllSwapStates,
  getWithdrawProceedsInstruction,
  startOrStopSell,
} from "~/programs";
import { getTokenBalance } from "~/utils/getTokenBalance";

type UnwrapPromiseType<T> = T extends Promise<infer U> ? U : never;

export type StateAccount = UnwrapPromiseType<
  ReturnType<typeof getAllSwapStates>
>[number];

export const View = () => {
  const { open } = useModal("add-program-instance-modal");

  const anchorWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();

  const { cluster } = useCluster();
  const { connection } = useConnection();

  const [states, setStates] = useState<Record<string, StateAccount>>({});

  const [loading, setLoading] = useState<string[]>([]);

  const showTransactionToast = useTransactionToast();

  const fetchSwapStates = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    const states = await getAllSwapStates(connection, anchorWallet);

    const hashmap = states.reduce((acc, state) => {
      acc[state.publicKey.toString()] = state;

      return acc;
    }, {} as Record<string, StateAccount>);

    setStates(hashmap);
  }, [anchorWallet, connection]);

  useEffect(() => {
    fetchSwapStates();
  }, [fetchSwapStates]);

  const handleToggle = useCallback(
    async (stateAccount: PublicKey) => {
      if (!anchorWallet) {
        return;
      }

      setLoading((loading) => [...loading, stateAccount.toString()]);

      try {
        const newState = await startOrStopSell(
          connection,
          anchorWallet,
          stateAccount
        );

        setStates((states) => ({
          ...states,
          [newState.publicKey.toString()]: newState,
        }));
      } catch (e) {
        toast.error("Oops, something went wrong!");
      } finally {
        const currentLoaders = new Set(loading);
        currentLoaders.delete(stateAccount.toString());

        setLoading([...currentLoaders]);
      }
    },
    [anchorWallet, connection, loading]
  );

  const handleClaimAll = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    const vaults = Object.values(states).map(
      (s) => [s.publicKey, s.account.proceedsVault] as const
    );

    const balances = await Promise.all(
      vaults.map(async ([state, vault]) => {
        const balance = await getTokenBalance(connection, vault);

        return [state, balance] as const;
      })
    );

    const claimableStates = balances.filter(([, balance]) => balance > 0);

    const ixs = await Promise.all(
      claimableStates.map(([state]) =>
        getWithdrawProceedsInstruction(cluster, connection, anchorWallet, state)
      )
    );

    const latestBlockhah = await connection.getLatestBlockhashAndContext();

    const transaction = new Transaction({
      ...latestBlockhah.value,
      feePayer: anchorWallet.publicKey,
    });

    transaction.add(...ixs);

    showTransactionToast(() => sendTransaction(transaction, connection));
  }, [
    anchorWallet,
    cluster,
    connection,
    sendTransaction,
    showTransactionToast,
    states,
  ]);

  return (
    <>
      <AddProgramInstanceModal onComplete={fetchSwapStates} />

      <Flex className="space-y-3" direction="col">
        <Heading
          title="Admin.Stats.title"
          rightContent={
            <Flex className="space-x-3">
              <Button kind="neutral" size="small" onClick={open}>
                Add state
              </Button>

              <Button kind="neutral" size="small" onClick={handleClaimAll}>
                Claim All
              </Button>
            </Flex>
          }
        />

        <Flex direction="col" className="space-y-3" grow={1}>
          {Object.values(states).map((state) => (
            <ProgramInstance
              key={state.publicKey.toString()}
              account={state}
              onToggle={() => handleToggle(state.publicKey)}
              loading={loading.includes(state.publicKey.toString())}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
