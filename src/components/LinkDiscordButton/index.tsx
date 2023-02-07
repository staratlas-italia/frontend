import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useMemo } from "react";
import { DISCORD_OAUTH_URL } from "~/common/constants";
import { useSelf } from "~/hooks/useNullableSelf";
import { Button, ButtonProps } from "../controls/Button";

export const DiscordLink = ({ children }: PropsWithChildren<unknown>) => {
  const router = useRouter();

  return (
    <Link href={`${DISCORD_OAUTH_URL}&state=${router.asPath}`}>{children}</Link>
  );
};

type Props = {
  kind?: ButtonProps["kind"];
};

export const LinkDiscordButton = ({ kind = "primary" }: Props) => {
  const self = useSelf();

  const Wrapper = useMemo(
    () => (self.discordId ? Fragment : DiscordLink),
    [self.discordId]
  );

  return (
    <Wrapper>
      <Button
        kind={kind}
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
      </Button>
    </Wrapper>
  );
};

const Loader = () => (
  <Button kind="primary" as="div" loading className="rounded-xl" />
);

LinkDiscordButton.Loader = Loader;
