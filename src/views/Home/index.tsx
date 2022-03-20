import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Treasury } from "~/components/layout/Header/components/Treasury";
import { MintBanner } from "~/components/MintBanner";
import { EnlistBanner } from "~/views/Home/components/EnlistBanner";
import { WelcomeBanner } from "~/views/Home/components/WelcomeBanner";

export const HomePage = () => {
  return (
    <div className="space-y-10">
      <MintBanner />

      <Flex>
        <BlurBackground px={4} py={3} className=" w-full md:w-72">
          <Treasury />
        </BlurBackground>
      </Flex>

      <WelcomeBanner />
      <EnlistBanner />
    </div>
  );
};
