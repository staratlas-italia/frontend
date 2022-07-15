import { Flex } from "~/components/layout/Flex";

export const SocialLinks = () => {
  return (
    <Flex px={8} pb={4} justify={"between"}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://t.me/StarAtlasIta"
      >
        <img src="/images/social/telegram_logo.svg" className="h-6 w-6" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://dsc.gg/staratlasitalia"
      >
        <img src="/images/social/discord_logo.svg" className="h-6 w-6" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/staratlasitalia"
      >
        <img src="/images/social/twitter_logo.svg" className="h-6 w-6" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/staratlas-italia"
      >
        <img src="/images/social/github_logo.svg" className="h-6 w-6" />
      </a>
    </Flex>
  );
};
