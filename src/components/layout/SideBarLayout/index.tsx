import { useWallet } from "@solana/wallet-adapter-react";
import React, { PropsWithChildren } from "react";
import { Price } from "~/components/common/Price";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { MintBanner } from "~/components/MintBanner";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { Provider } from "./components/Provider";
import { SideBar } from "./components/SideBar";
import { SidebarToggle } from "./components/SidebarToggle";

export const SideBarLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    const { connected } = useWallet();
    const [atlasAmount, polisAmount, usdcAmount] = usePlayerStore(
      (s) => s.amounts
    );

    return (
      <Provider>
        <SideBar />

        <BaseLayout headerFixed fluid>
          <div className="h-full relative container lg:px-5 lg:pl-80 mx-auto pb-32 sm:pb-28 lg:pb-0">
            <MintBanner />

            <Flex className="space-x-5 lg:space-x-0" pb={5}>
              <SidebarToggle />

              {connected && (
                <BlurBackground px={3} py={2} className="space-x-3">
                  <Price
                    color="white"
                    currency="ATLAS"
                    inverse
                    size="xl"
                    value={atlasAmount}
                  />
                  <Price
                    color="white"
                    currency="POLIS"
                    inverse
                    size="xl"
                    value={polisAmount}
                  />
                  <Price
                    color="white"
                    currency="USDC"
                    inverse
                    size="xl"
                    value={usdcAmount}
                  />
                </BlurBackground>
              )}
            </Flex>

            {children}
          </div>
        </BaseLayout>
      </Provider>
    );
  }
);
