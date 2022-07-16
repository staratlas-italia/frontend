import { MenuIcon } from "@heroicons/react/solid";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { useNavigation } from "../Provider";
import { SideBarContent } from "../SideBarContent";

export const SidebarToggle = () => {
  const { toggle, isOpen } = useNavigation();

  return (
    <Flex className="lg:hidden cursor-pointer" onClick={toggle}>
      <BlurBackground
        className="w-16 h-16 rounded-full"
        align="center"
        justify="center"
      >
        <MenuIcon className="w-8 h-8 text-white w" />
      </BlurBackground>

      {isOpen && (
        <Flex className="absolute z-20 ">
          <BlurBackground>
            <Flex className="absolute top-4 left-4">
              <MenuIcon className="w-8 h-8 text-white" />
            </Flex>

            <Flex pl={12} p={5}>
              <SideBarContent />
            </Flex>
          </BlurBackground>
        </Flex>
      )}
    </Flex>
  );
};
