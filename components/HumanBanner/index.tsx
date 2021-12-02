import Image from "next/image";
import styled from "styled-components";
import { Flex } from "../layout/Flex";

const Container = styled(Flex)`
  position: relative;
  min-height: 300px;
`;

const Circle = styled(Flex)`
  border-radius: 100%;
  overflow: hidden;
`;

const HumanImage = styled(Image).attrs({
  src: "/images/human.png",
})`
  overflow: hidden;
  max-width: 450px;
`;

export const HumanBanner = () => {
  return (
    <Container py={10} align="center" justify="center">
      <Circle>
        <HumanImage width={400} height={400} />
      </Circle>
    </Container>
  );
};
