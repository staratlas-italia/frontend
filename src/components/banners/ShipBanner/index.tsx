import { Image } from "antd";
import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";

const Container = styled(Flex)`
  position: relative;
  min-height: 300px;
`;

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

const ShipImage = styled(Image).attrs({
  src: "/images/ship.png",
  preview: false,
})`
  min-width: 400px;
  max-width: 450px;
  transform: rotate(10deg);
`;

export const ShipBanner = () => {
  return (
    <Container py={10}>
      <SpaceBackground align="center" justify="center">
        <ShipImage />
      </SpaceBackground>
    </Container>
  );
};
