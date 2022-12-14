import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TOKEN_SWAP_STATE_ACCOUNTS } from "~/common/constants";
import { Heading } from "~/components/common/Heading";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { AddProgramInstanceModal } from "~/components/modals/AddProgramInstanceModal";
import { useModal } from "~/contexts/ModalContext";
import { getAllSwapStates, startOrStopSell } from "~/programs";

type UnwrapPromiseType<T> = T extends Promise<infer U> ? U : never;

type StateAccount = UnwrapPromiseType<
  ReturnType<typeof getAllSwapStates>
>[number];

export const Admin = () => {
  const { open } = useModal("add-program-instance-modal");

  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const [states, setStates] = useState<Record<string, StateAccount>>({});

  const [loading, setLoading] = useState<string[]>([]);

  const getAllStates = useCallback(async () => {
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
    getAllStates();
  }, [getAllStates]);

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

        console.log(newState);
      } catch (e) {
        console.log(JSON.stringify(e));

        toast.error("Oops, something went wrong!");
      } finally {
        const currentLoaders = new Set(loading);
        currentLoaders.delete(stateAccount.toString());

        setLoading([...currentLoaders]);
      }
    },
    [anchorWallet, connection, loading]
  );

  const handleComplete = (something: string) => {
    console.log(something);

    getAllStates();
  };

  return (
    <>
      <AddProgramInstanceModal onComplete={handleComplete} />

      <Flex className="space-y-3" direction="col">
        <Heading
          title="Admin.Stats.title"
          rightContent={
            <Flex>
              <Button.Neutral size="small" onClick={open}>
                Add state
              </Button.Neutral>
            </Flex>
          }
        />

        <Flex direction="col" className="space-y-3" grow={1}>
          {Object.values(states).map((state) => {
            const stateAccount =
              TOKEN_SWAP_STATE_ACCOUNTS[state.publicKey.toString()];

            return (
              <Flex direction="col" key={state.publicKey.toString()}>
                <BlurBackground p={3} justify="between">
                  <Flex direction="col" className="space-y-3">
                    <InfoRow title="Swap">
                      <Text color="text-white">
                        {stateAccount?.name.toUpperCase() ||
                          state.publicKey.toString()}{" "}
                        / {stateAccount?.vaultCurrency}
                      </Text>
                    </InfoRow>

                    <InfoRow title="Vault">
                      <Text color="text-white">
                        {state.account.vault.toString()}
                      </Text>
                    </InfoRow>

                    <InfoRow title="Price">
                      <Price
                        color="text-white"
                        currency="USDC"
                        value={state.account.price.toNumber() / Math.pow(10, 6)}
                      />
                    </InfoRow>
                  </Flex>

                  <Flex>
                    <Button
                      loading={loading.includes(state.publicKey.toString())}
                      onClick={() => handleToggle(state.publicKey)}
                    >
                      <Text color="text-white">
                        {state.account.active ? "Disable" : "Enable"}
                      </Text>
                    </Button>
                  </Flex>
                </BlurBackground>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};
