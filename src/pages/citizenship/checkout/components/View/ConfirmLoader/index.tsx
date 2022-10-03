import { useEffect, useMemo, useState } from "react";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useFaction } from "~/pages/citizenship/FactionGuard";

export const ConfirmLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  const faction = useFaction();

  const messages = useMemo(
    () => [
      "",
      "Checking permissions",
      "Request authority",
      "Sending at 3x light speed",
      `Contacting ${faction.toUpperCase()} leaders`,
    ],
    [faction]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((index) => (index + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <Flex>
      <Loader color="text-white" />

      {!!messages[messageIndex] && (
        <Flex pl={5}>
          <Text color="text-white">{messages[messageIndex]}</Text>
        </Flex>
      )}
    </Flex>
  );
};
