import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useMemo } from "react";
import { DISCORD_OAUTH_URL } from "~/common/constants";
import { useSelf } from "~/hooks/useNullableSelf";
import { Button } from "../controls/Button";

const LinkWrapper = ({ children }: PropsWithChildren<unknown>) => {
  const router = useRouter();

  return (
    <Link href={`${DISCORD_OAUTH_URL}&state=${router.asPath}`}>{children}</Link>
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
        disabled={!!self.discordId}
        as="div"
        className="rounded-xl"
        iconLeft={() => (
          <img
            alt="Discord Link"
            className="h-6 w-6"
            src="/images/social/discord_logo.svg"
          />
        )}
      >
        {self.discordId ? "Linked" : "Link"}
      </Button.Primary>
    </Wrapper>
  );
};

const Loader = () => <Button.Primary as="div" loading className="rounded-xl" />;

LinkDiscordButton.Loader = Loader;
