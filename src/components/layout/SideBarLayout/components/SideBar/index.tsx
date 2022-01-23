import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Content } from "~/components/layout/SideBarLayout/components/SideBar/components/Content";
import { Footer } from "~/components/layout/SideBarLayout/components/SideBar/components/Footer";

export const SideBar = () => {
  return (
    <>
      <Flex
        justify="center"
        className="z-20 bottom-8 fixed lg:invisible w-full px-5"
      >
        <BlurBackground
          className="rounded-3xl bg-opacity-10"
          disableRound
          px={4}
          py={2}
          lgPt={8}
          justify="between"
        >
          <Content />
        </BlurBackground>
      </Flex>
      <div className="z-20 invisible lg:visible min-h-screen fixed w-0 lg:w-64">
        <BlurBackground
          className="rounded-none h-screen bg-opacity-10"
          direction="col"
          disableRound
          px={4}
          pt={8}
          justify="between"
        >
          <Flex />
          <Content />
          <Footer />
        </BlurBackground>
      </div>
    </>
  );
};
