import Image from "next/image";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";

type Props = {
  image: string;
  title: string;
};

export const EmptyView = ({ image, title }: Props) => (
  <BlurBackground
    py={5}
    justify="center"
    align="center"
    direction="col"
    className="space-y-3"
  >
    <Image src={image} width={100} height={100} />
    <Text size="3xl" color="white" weight="medium">
      {title}
    </Text>
  </BlurBackground>
);
