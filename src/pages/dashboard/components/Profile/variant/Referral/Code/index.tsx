import { DuplicateIcon, PlusIcon } from "@heroicons/react/solid";
import { APP_BASE_URL } from "~/common/constants";
import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { useSelf } from "~/hooks/useNullableSelf";
import { useReferral } from "~/hooks/useReferral";
import { copyTextToClipboard } from "~/utils/copyToClipboard";
import { shortenAddress } from "~/utils/shortenAddress";

export const Code = () => {
  const self = useSelf();

  const { code, create } = useReferral();

  const referralCode = self.referral?.code || code;

  if (referralCode) {
    return (
      <Flex
        align="center"
        px={2}
        py={3}
        className="rounded-xl border border-white space-x-3"
      >
        <Flex className="overflow-hidden h-5">
          <Text color="text-gray-400">
            {shortenAddress(referralCode || "", 10)}
          </Text>
        </Flex>
        <Flex
          className="cursor-pointer"
          onClick={() =>
            copyTextToClipboard(`${APP_BASE_URL}/referral?code=${referralCode}`)
          }
        >
          <DuplicateIcon className="w-5 h-5 text-white" />
        </Flex>
      </Flex>
    );
  }

  return (
    <AssertAuthenticated>
      <Button textColor="text-white" iconLeft={PlusIcon} onClick={create}>
        Generate referral
      </Button>
    </AssertAuthenticated>
  );
};
