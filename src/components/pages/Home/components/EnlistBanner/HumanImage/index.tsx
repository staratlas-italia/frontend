import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";

export const Container = styled(Flex)`
  position: relative;
`;

const Human = styled(Image).attrs({
  src: "/images/human.png",
})`
  overflow: hidden;
  max-width: 450px;
`;

export const HumanImage = () => {
  return (
    <Container px={10} mdPx={0} py={10} align="center" justify="center">
      <Flex className="rounded-full overflow-hidden">
        <Human width={400} height={400} />
      </Flex>
    </Container>
  );
};
