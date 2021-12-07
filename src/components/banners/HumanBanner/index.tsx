import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { BannerContainer } from "~/components/banners/BannerContainer";
import { Flex } from "~/components/layout/Flex";

const HumanImage = styled(Image).attrs({
  src: "/images/human.png",
})`
  overflow: hidden;
  max-width: 450px;
`;

export const HumanBanner = () => {
  return (
    <BannerContainer px={10} mdPx={0} py={10} align="center" justify="center">
      <Flex className="rounded-full overflow-hidden">
        <HumanImage width={400} height={400} />
      </Flex>
    </BannerContainer>
  );
};
