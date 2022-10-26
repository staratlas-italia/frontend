import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect, useMemo } from "react";
import { DISCORD_OAUTH_URL } from "~/common/constants";
import { useSelf } from "~/hooks/useNullableSelf";
import { Button } from "../controls/Button";

const LinkWrapper = ({ children }: PropsWithChildren<unknown>) => {
  const router = useRouter();
  return (
    <Link href={`${DISCORD_OAUTH_URL}&state=${router.asPath}`}>
      <a>{children}</a>
    </Link>
  );
};

export const LinkDiscordButton = () => {
  const self = useSelf();

  const Wrapper = useMemo(
    () => (self.discordId ? Fragment : LinkWrapper),
    [self.discordId]
  );

  return (
    <Wrapper>
      <Button.Primary
        as="div"
        size="small"
        iconLeft={() => (
          <img
            alt="Discord Link"
            className="h-10 w-10"
            src="/images/social/discord_logo.svg"
          />
        )}
      >
        {self.discordId ? "Linked" : "Link"}
      </Button.Primary>
    </Wrapper>
  );
};