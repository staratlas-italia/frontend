import { BlurBackground } from "~/components/layout/BlurBackground";
import { Treasury } from "~/components/layout/Header/components/Treasury";
import { EnlistBanner } from "~/views/Home/components/EnlistBanner";
import { WelcomeBanner } from "~/views/Home/components/WelcomeBanner";

export const HomePage = () => (
  <div className="z-10 space-y-10">
    <BlurBackground px={4} py={3} className=" w-full md:w-72">
      <Treasury />
    </BlurBackground>

    <WelcomeBanner />
    <EnlistBanner />
  </div>
);
