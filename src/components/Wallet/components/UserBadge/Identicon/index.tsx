import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {
  address?: string | PublicKey;
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
};

export const Identicon = ({ style, className, alt, ...props }: Props) => {
  const address =
    typeof props.address === "string"
      ? props.address
      : props.address?.toBase58();

  return (
    <Jazzicon
      diameter={style?.width || 16}
      seed={
        address
          ? jsNumberForAddress(
              bs58.decode(address).toString("hex").slice(5, 15)
            )
          : null
      }
    />
  );
};
