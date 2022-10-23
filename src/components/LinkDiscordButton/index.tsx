import Link from "next/link";
import { DISCORD_OAUTH_URL } from "~/common/constants";
import { Button } from "../controls/Button";
import Image from "next/image";

const LinkDiscordButton = () => {
  return (
    <Link href={DISCORD_OAUTH_URL}>
      <a>
        <Button.Primary
          size="small"
          iconRight={({ className }) => (
            <Image
              alt="Discord Link"
              src={"/images/social/discord_logo.svg"}
              width={50}
              height={50}
              className={className}
            />
          )}
        >
          Link
        </Button.Primary>
      </a>
    </Link>
  );
};

export default LinkDiscordButton;
