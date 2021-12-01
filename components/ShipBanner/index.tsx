import { Image } from "antd";
import styled from "styled-components";
import { Flex } from "../layout/Flex";

const Container = styled(Flex)`
  position: relative;
  min-height: 300px;
`;

const Circle = styled(Flex)`
  position: absolute;
  border-radius: 100%;
  background-color: #e65757;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
`;

const ShipImage = styled(Image).attrs({
  src: "/images/ship.png",
  preview: false,
})`
  max-width: 450px;
  transform: rotate(10deg);
`;

export const ShipBanner = () => {
  return (
    <Container py={10} align="center" justify="center">
      <Circle />
      <ShipImage />
    </Container>
  );
};
