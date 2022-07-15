import { Flex } from "~/components/layout/Flex";
import { Badges } from "../Badges";
import { Fleet } from "../Fleet";
import { Profile } from "../Profile";

export const View = () => (
  <Flex className="space-y-5" direction="col">
    <Profile />
    <Badges />
    <Fleet />
  </Flex>
);
