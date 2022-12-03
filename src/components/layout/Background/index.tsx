import { useWallet } from "@solana/wallet-adapter-react";
import styled, { css, keyframes } from "styled-components";
import { SelfRetriever } from "~/components/SelfRetriever";
import { useNullableBadges } from "~/hooks/useNullableBadges";
import { useHueAnimation } from "~/stores/useAppStore";
import { useHueStore } from "~/stores/useHueStore";
import { getHueByFactionStyle } from "~/utils/getHueByFaction";
import { isFactionBadge } from "~/utils/isFactionBadge";

type Props = {
  show?: boolean;
  hue?: number;
  connected?: boolean;
};

const hueAnimation = (hue: number) => keyframes`
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(${hue}deg);
  }
`;

const LayoutBackground = styled.div.attrs({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen w-screen",
})<Props>`
  background-image: url("/images/bg.webp");

  ${({ hue, connected = false, show = true }) =>
    show &&
    hue &&
    hue != 0 &&
    css`
      animation: ${hueAnimation(hue)} 0.5s ease-in-out;
      animation-fill-mode: forwards;
      animation-direction: ${connected ? "normal" : "reverse"};
    `}
`;

const ConnectedBackground = () => {
  const { badges } = useNullableBadges();

  const showAnimation = useHueAnimation();

  const hue = useHueStore((state) => state.hue);
  const updateHue = useHueStore((state) => state.updateHue);

  const [badge] =
    badges?.find(([badge]) => isFactionBadge(badge.mintAddress)) || [];

  if (!badge) {
    return <LayoutBackground />;
  }

  updateHue(getHueByFactionStyle(badge.mintAddress.toString()));

  return <LayoutBackground hue={hue} connected={true} show={showAnimation} />;
};

export const Background = () => {
  const { connected } = useWallet();
  const showAnimation = useHueAnimation();
  const hue = useHueStore((state) => state.hue);

  if (connected) {
    return (
      <SelfRetriever
        loader={<LayoutBackground hue={hue} show={showAnimation} />}
      >
        <ConnectedBackground />
      </SelfRetriever>
    );
  }

  return <LayoutBackground hue={hue} show={showAnimation} />;
};
