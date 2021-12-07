import styled from "styled-components";
import { BannerContainer } from "~/components/banners/BannerContainer";
import { Flex } from "~/components/layout/Flex";

const SpaceBackground = styled(Flex)`
  border-radius: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: 350px;
  background-image: url("images/space.png");
`;

const ShipImage = styled.img.attrs({
  src: "/images/ship.png",
})`
  min-width: 400px;
  max-width: 450px;
  transform: rotate(10deg);
`;

export const ShipBanner = () => {
  return (
    <BannerContainer px={10} mdPx={0} py={10}>
      <SpaceBackground align="center" justify="center">
        <ShipImage />
      </SpaceBackground>
    </BannerContainer>
  );
};
