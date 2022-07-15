import { useWallet } from "@solana/wallet-adapter-react";
import React, { PropsWithChildren } from "react";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { Flex } from "~/components/layout/Flex";
import { MintBanner } from "~/components/MintBanner";
import { SelfRetriever } from "~/components/SelfRetriever";
import { Provider } from "./components/Provider";
import { SideBar } from "./components/SideBar";
import { SidebarToggle } from "./components/SidebarToggle";
import { TokenAmounts } from "./components/TokenAmounts";

export const SideBarLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    const { connected } = useWallet();

    return (
      <Provider>
        <SideBar />

        <BaseLayout headerFixed fluid>
          <div className="h-full relative container lg:px-5 lg:pl-80 mx-auto pb-32 sm:pb-28 lg:pb-0">
            <MintBanner />

            <Flex className="space-x-5 lg:space-x-0" pb={5}>
              <SidebarToggle />

              {connected && (
                <SelfRetriever>
                  <TokenAmounts />
                </SelfRetriever>
              )}
            </Flex>

            {children}
          </div>
        </BaseLayout>
      </Provider>
    );
  }
);
