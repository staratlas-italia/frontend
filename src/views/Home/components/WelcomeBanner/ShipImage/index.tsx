import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";

const BannerContainer = styled(Flex)`
  position: relative;
`;

const SpaceBackground = styled(Flex)`
  border-radius: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: 350px;
  background-image: url("images/space.webp");
`;

const Ship = styled.img.attrs({
  src: "/images/ship.webp",
})`
  min-width: 400px;
  max-width: 450px;
  transform: rotate(10deg);
`;

export const ShipImage = () => {
  return (
    <BannerContainer px={10} mdPx={0} py={10}>
      <SpaceBackground align="center" justify="center">
        <Ship />
      </SpaceBackground>
    </BannerContainer>
  );
};
