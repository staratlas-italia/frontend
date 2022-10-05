import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";

type Props = {
  title: string;
};

export const EmptyView = ({ title }: Props) => (
  <BlurBackground
    py={5}
    justify="center"
    align="center"
    direction="col"
    className="space-y-3"
  >
    <Text size="xl" color="text-white" weight="semibold">
      {title}
    </Text>
  </BlurBackground>
);
