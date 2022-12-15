import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ATLAS_TOKEN_MINT, USDC_TOKEN_MINT } from "~/common/constants";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { BaseModal } from "~/components/modals/BaseModal";
import { TextInput } from "~/components/TextInput";
import { useModal } from "~/contexts/ModalContext";
import { useTranslation } from "~/i18n/useTranslation";
import { initilizeSwap } from "~/programs";
import { isPublicKey } from "~/utils/pubkey";
import { shortenAddress } from "~/utils/shortenAddress";

type Form = {
  price: number;
  mint: string;
  proceedsMint: string;
};

type Props = {
  onComplete?: (_: string) => void;
};

export const AddProgramInstanceModal = ({ onComplete }: Props) => {
  const anchorWallet = useAnchorWallet();
  const { close } = useModal("add-program-instance-modal");
  const { connection } = useConnection();

  const form = useForm<Form>({
    mode: "onChange",
    defaultValues: {
      proceedsMint: USDC_TOKEN_MINT.toString(),
    },
  });

  const requiredErrorMessage = useTranslation("generic.form.error.required");
  const isPublickeyErrorMessage = useTranslation(
    "generic.form.error.publicKey"
  );

  const isPublickeyDifferentErrorMessage = useTranslation(
    "generic.form.error.publicKey.different"
  );

  const numberErrorMessage = useTranslation("generic.form.error.number");

  const handleSubmit = form.handleSubmit(
    async ({ proceedsMint, mint, price }) => {
      if (!anchorWallet) {
        return;
      }

      try {
        const result = await initilizeSwap(
          connection,
          anchorWallet,
          new PublicKey(proceedsMint),
          new PublicKey(mint),
          Number(price)
        );

        onComplete?.(result);

        close();
      } catch (e) {
        toast.error("Error creating the instance");
      }
      console.log({ proceedsMint, mint, price });
    }
  );

  const {
    formState: { isSubmitting },
    getValues,
  } = form;

  if (!anchorWallet) {
    return null;
  }

  return (
    <BaseModal id="add-program-instance-modal">
      <Flex direction="col" p={5} className="bg-white">
        <Flex pb={5}>
          <Text size="3xl" weight="semibold">
            Add instance
          </Text>
        </Flex>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <Flex direction="col" className="space-y-3">
              <TextInput
                placeholder="0.00 ATLAS"
                name="price"
                label="Price"
                rules={{
                  required: requiredErrorMessage,
                  validate: (value) => !!Number(value) || numberErrorMessage,
                }}
              />

              <TextInput
                name="proceedsMint"
                label="Proceeds Mint"
                placeholder={shortenAddress(USDC_TOKEN_MINT.toString(), 10)}
                defaultValue={USDC_TOKEN_MINT.toString()}
                rules={{
                  required: requiredErrorMessage,
                  validate: {
                    isPublicKey: (value) =>
                      isPublicKey(value) || isPublickeyErrorMessage,
                    shouldBeDifferentFromPrevious: (value) =>
                      value !== getValues().mint ||
                      isPublickeyDifferentErrorMessage,
                  },
                }}
              />

              <TextInput
                name="mint"
                label="Token Mint"
                placeholder={shortenAddress(ATLAS_TOKEN_MINT.toString(), 10)}
                rules={{
                  required: requiredErrorMessage,
                  validate: {
                    isPublicKey: (value) =>
                      isPublicKey(value) || isPublickeyErrorMessage,
                    shouldBeDifferentFromPrevious: (value) =>
                      value !== getValues().proceedsMint ||
                      isPublickeyDifferentErrorMessage,
                  },
                }}
              />

              <Button.Dark loading={isSubmitting} type="submit">
                Add
              </Button.Dark>
            </Flex>
          </form>
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
