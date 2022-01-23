import { useRouter } from "next/router";
import { useCallback } from "react";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";

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
    <Flex
      as="button"
      align="center"
      className="relative"
      onClick={handleClick}
      pr={5}
    >
      {pathname === "/ships" ? (
        <Text size="xl" color="white" weight="bold">
          <Translation id="Ships.Toolbar.table" />
        </Text>
      ) : (
        <Text size="xl" color="white" weight="bold">
          <Translation id="Ships.Toolbar.grid" />
        </Text>
      )}
    </Flex>
  );
};
