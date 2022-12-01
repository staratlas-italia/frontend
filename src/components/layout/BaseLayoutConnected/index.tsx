import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";
import { Footer } from "~/components/layout/Footer";
import { useNullableBadges } from "~/hooks/useNullableBadges";
import { getFactionByBadgeMint } from "~/utils/getFactionByBadgeMint";
import { PublicKey } from "@solana/web3.js";
import { getHueByFaction } from "~/utils/getHueByFaction";
import { usePlayerStore } from "~/stores/usePlayerStore";

// filter: hue-rotate(40deg); ONI
// filter: hue-rotate(140deg); MUD
// filter: hue-rotate(200deg); USTUR
type BgProps = {
  badgeMint?: string;
};

const LayoutBackground = styled.div.attrs<BgProps>(({ badgeMint }) => ({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen	w-screen",
  style: {
    filter: `hue-rotate(${badgeMint ? getHueByFaction(badgeMint) : "0deg"})`,
  },
}))<BgProps>`
  background-image: url("/images/bg.webp");
`;

type Props = { hasSidebar?: boolean };

export const BaseLayoutConnected = React.memo(
  ({ children, hasSidebar }: PropsWithChildren<Props>) => {
    const { badges } = useNullableBadges();

    const citizenBadges = badges
      ?.map(([badge]) => badge.mintAddress)
      .filter((mint) => getFactionByBadgeMint(mint));

    const badgeMint = citizenBadges ? citizenBadges[0]?.toString() : "";

    return (
      <>
        <LayoutBackground badgeMint={badgeMint} />

        <div className="relative min-h-screen">{children}</div>

        <Flex className={classNames("mx-auto", { "lg:pl-64": hasSidebar })}>
          <Footer />
        </Flex>
      </>
    );
  }
);

BaseLayoutConnected.displayName = "BaseLayoutConnected";
