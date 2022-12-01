import { useWallet } from "@solana/wallet-adapter-react";
import styled, { css, keyframes } from "styled-components";
import { SelfRetriever } from "~/components/SelfRetriever";
import { useNullableBadges } from "~/hooks/useNullableBadges";
import { getHueByFactionStyle } from "~/utils/getHueByFaction";
import { isFactionBadge } from "~/utils/isFactionBadge";

type Props = {
  badgeMint?: string;
};

const hueAnimation = (badgeMint: string) => keyframes`
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(${getHueByFactionStyle(badgeMint)}deg);
  }
`;

const LayoutBackground = styled.div.attrs({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen w-screen",
})<Props>`
  background-image: url("/images/bg.webp");

  ${({ badgeMint }) =>
    badgeMint &&
    css`
      animation: ${hueAnimation(badgeMint)} 0.5s ease-in-out;
      animation-fill-mode: forwards;
    `}
`;

const ConnectedBackground = () => {
  const { badges } = useNullableBadges();

  const [badge] =
    badges?.find(([badge]) => isFactionBadge(badge.mintAddress)) || [];

  if (!badge) {
    return <LayoutBackground />;
  }

  return <LayoutBackground badgeMint={badge.mintAddress.toString()} />;
};

export const Background = () => {
  const { connected } = useWallet();

  if (connected) {
    return (
      <SelfRetriever loader={<LayoutBackground />}>
        <ConnectedBackground />
      </SelfRetriever>
    );
  }

  return <LayoutBackground />;
};
