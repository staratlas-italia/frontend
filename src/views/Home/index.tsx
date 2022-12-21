import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Header } from "~/components/layout/Header";
import { Treasury } from "~/components/layout/Header/components/Treasury";
import { EnlistBanner } from "~/views/Home/components/EnlistBanner";
import { WelcomeBanner } from "~/views/Home/components/WelcomeBanner";

export const HomePage = () => {
  return (
    <div className="container mx-auto">
      <Header fluid />

      <div className="space-y-10 px-5 pb-5">
        <Flex>
          <BlurBackground px={4} py={3} className="w-full md:w-72">
            <Treasury />
          </BlurBackground>
        </Flex>

        <WelcomeBanner />

        <EnlistBanner />
      </div>
    </div>
  );
};
