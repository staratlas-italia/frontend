import { useRouter } from "next/router";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

export type ToolbarState = "table" | "grid";

export const Toolbar = () => {
  const { pathname, push } = useRouter();

  const handleClick = useCallback(() => {
    switch (pathname) {
      case "/ships":
        push("/ships/table");
        break;
      case "/ships/table":
        push("/ships");
        break;
    }
  }, [pathname, push]);

  return (
    <Flex justify="end" px={5}>
      <Flex as="button" className="relative" pb={5} onClick={handleClick}>
        {pathname === "/ships" ? (
          <Text size="xl" color="white" weight="bold">
            <FormattedMessage
              id="Ships.Toolbar.table"
              defaultMessage={"Mostra tabella"}
            />
          </Text>
        ) : (
          <Text size="xl" color="white" weight="bold">
            <FormattedMessage
              id="Ships.Toolbar.grid"
              defaultMessage={"Mostra griglia"}
            />
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
