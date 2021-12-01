import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex } from "../layout/Flex";
import { HowToBuyModal } from "../modals/HowToBuyModal";
import { ConnectButton } from "../wallet/ConnectButton";
import { CurrentUserBadge } from "../wallet/CurrentUserBadge";

const getDefaultLinkActions = (connected: boolean) => {
  return [
    <Link href={`/`} key={"explore"}>
      <Button className="app-btn">Explore</Button>
    </Link>,
    <Link href={`/artworks`} key={"artwork"}>
      <Button className="app-btn">{connected ? "My Items" : "Artwork"}</Button>
    </Link>,
    <Link href={`/artists`} key={"artists"}>
      <Button className="app-btn">Creators</Button>
    </Link>,
  ];
};

// const DefaultActions = ({ vertical = false }: { vertical?: boolean }) => {
//   const { connected } = useWallet();
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: vertical ? "column" : "row",
//       }}
//     >
//       {getDefaultLinkActions(connected)}
//     </div>
//   );
// };

// const MetaplexMenu = () => {
//   const { width } = useWindowDimensions();
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//   const { connected } = useWallet();

//   if (width < 768)
//     return (
//       <>
//         <Modal
//           title={<img src={"/metaplex-logo.svg"} />}
//           visible={isModalVisible}
//           footer={null}
//           className={"modal-box"}
//           closeIcon={
//             <img
//               onClick={() => setIsModalVisible(false)}
//               src={"/modals/close.svg"}
//             />
//           }
//         >
//           <div className="site-card-wrapper mobile-menu-modal">
//             <Menu onClick={() => setIsModalVisible(false)}>
//               {getDefaultLinkActions(connected).map((item, idx) => (
//                 <Menu.Item key={idx}>{item}</Menu.Item>
//               ))}
//             </Menu>
//             <div className="actions">
//               {!connected ? (
//                 <div className="actions-buttons">
//                   <ConnectButton
//                     onClick={() => setIsModalVisible(false)}
//                     className="secondary-btn"
//                   />
//                   <HowToBuyModal
//                     onClick={() => setIsModalVisible(false)}
//                     buttonClassName="black-btn"
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <CurrentUserBadgeMobile
//                     showBalance={false}
//                     showAddress={true}
//                     iconSize={24}
//                     closeModal={() => {
//                       setIsModalVisible(false);
//                     }}
//                   />
//                   <Notifications />
//                   <Cog />
//                 </>
//               )}
//             </div>
//           </div>
//         </Modal>
//         <MenuOutlined
//           onClick={() => setIsModalVisible(true)}
//           style={{ fontSize: "1.4rem" }}
//         />
//       </>
//     );

//   return <DefaultActions />;
// };

export const LogoLink = () => {
  return (
    <Link href={`/`}>
      <Image
        priority
        src="/images/logo.png"
        height={72 * 0.7}
        width={200 * 0.7}
        alt={"Start Atlas Italia"}
      />
    </Link>
  );
};

export const AppBar = () => {
  const { connected } = useWallet();
  return (
    <Flex align="center" justify="space-between" grow>
      <Flex align="center">
        <LogoLink />
      </Flex>
      <Flex>
        {!connected && <HowToBuyModal />}
        {!connected && <ConnectButton />}
        {connected && (
          <>
            <CurrentUserBadge showAddress />
            {/* <Notifications />
              <Cog /> */}
          </>
        )}
      </Flex>
    </Flex>
  );
};
