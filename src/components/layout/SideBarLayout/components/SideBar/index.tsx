import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { SideBarContent as Content } from "../SideBarContent";
import { Footer } from "./components/Footer";

export const SideBar = () => {
  return (
    <>
      <div className="z-20 invisible lg:visible min-h-screen fixed w-0 lg:w-64">
        <BlurBackground
          className="rounded-none h-screen"
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
