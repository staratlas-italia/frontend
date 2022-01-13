import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { LogoLink } from "~/components/layout/Header";
import { Content } from "~/components/layout/SideBarLayout/components/SideBar/components/Content";
import { Footer } from "~/components/layout/SideBarLayout/components/SideBar/components/Footer";

export const SideBar = () => {
  return (
    <div className="z-20 invisible lg:visible min-h-screen fixed w-0 lg:w-64">
      <BlurBackground
        className="rounded-none h-screen bg-opacity-10"
        direction="col"
        disableRound
        px={4}
        pt={8}
        justify="between"
      >
        <Flex justify="center">
          <LogoLink />
        </Flex>
        <Content />
        <Footer />
      </BlurBackground>
    </div>
  );
};
