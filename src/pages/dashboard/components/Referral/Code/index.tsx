import { DuplicateIcon, PlusIcon } from "@heroicons/react/solid";
import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { useSelf } from "~/hooks/useNullableSelf";
import { useReferral } from "~/hooks/useReferral";
import { shortenAddress } from "~/utils/shortenAddress";

export const Code = () => {
  const self = useSelf();

  const { code, create } = useReferral();

  if (self.referral || code) {
    return (
      <Flex
        align="center"
        px={2}
        py={3}
        className="rounded-xl border border-white space-x-3"
      >
        <Flex className="overflow-hidden h-5">
          <Text color="gray-400">
            {shortenAddress(self.referral?.code || code || "", 10)}
          </Text>
        </Flex>
        <Flex>
          <DuplicateIcon className="w-5 h-5 text-white" />
        </Flex>
      </Flex>
    );
  }

  return (
    <AssertAuthenticated>
      <Button textColor="white" iconLeft={PlusIcon} onClick={create}>
        Generate referral
      </Button>
    </AssertAuthenticated>
  );
};
