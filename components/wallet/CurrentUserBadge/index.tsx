import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "antd";
import React, { useState } from "react";
import { shortenAddress } from "../../../utils/shortenAddress";
import { ModalButton } from "../../modals/ModalButton";
import { Identicon } from "./Identicon";

type Props = {
  iconSize?: number;
  showAddress?: boolean;
};

export const CurrentUserBadge = ({ iconSize, showAddress }: Props) => {
  const { wallet, publicKey, disconnect } = useWallet();
  //const solPrice = useSolPrice();

  const [showAddFundsModal, setShowAddFundsModal] = useState<Boolean>(false);

  // const balance = (account?.lamports || 0) / LAMPORTS_PER_SOL;
  // const balanceInUSD = balance * solPrice;
  // const solMintInfo = useTokenList().tokenMap.get(WRAPPED_SOL_MINT.toString());
  const iconStyle: React.CSSProperties = {
    display: "flex",
    width: iconSize,
    borderRadius: 50,
  };

  let name = showAddress ? shortenAddress(`${publicKey}`) : "";
  const unknownWallet = wallet as any;
  if (unknownWallet.name && !showAddress) {
    name = unknownWallet.name;
  }

  if (!wallet || !publicKey) {
    return null;
  }

  let image = <Identicon address={publicKey?.toBase58()} style={iconStyle} />;
  if (unknownWallet.image) {
    image = <img src={unknownWallet.image} style={iconStyle} />;
  }

  return (
    <div className="wallet-wrapper">
      {/* {props.showBalance && (
        <span>
          {formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL
        </span>
      )} */}

      {/* <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <Settings
            additionalSettings={
              <div
                style={{
                  width: 250,
                }}
              >
                <h5
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    letterSpacing: "0.02em",
                  }}
                >
                  BALANCE
                </h5>
                <div
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <TokenCircle
                    iconFile={solMintInfo ? solMintInfo.logoURI : ""}
                  />
                  &nbsp;
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {formatNumber.format(balance)} SOL
                  </span>
                  &nbsp;
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {formatUSD.format(balanceInUSD)}
                  </span>
                  &nbsp;
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: 10,
                  }}
                >
                  <Button
                    className="metaplex-button-default"
                    onClick={() => setShowAddFundsModal(true)}
                    style={btnStyle}
                  >
                    Add Funds
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    className="metaplex-button-default"
                    onClick={disconnect}
                    style={btnStyle}
                  >
                    Disconnect
                  </Button>
                </div>
                <UserActions />
              </div>
            }
          />
        }
      > */}
      <Button className="wallet-key">
        {image}
        {name && (
          <span
            style={{
              marginLeft: "0.5rem",
              fontWeight: 600,
            }}
          >
            {name}
          </span>
        )}
      </Button>
      <ModalButton className={""} onClick={disconnect}>
        Disconnect
      </ModalButton>
      {/* </Popover> */}
      {/* <AddFundsModal
        setShowAddFundsModal={setShowAddFundsModal}
        showAddFundsModal={showAddFundsModal}
        publicKey={publicKey}
        balance={balance}
      /> */}
    </div>
  );
};
