import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { useGuildTreasury } from "~/hooks/useGuildTreasury";
import { useTranslation } from "~/i18n/useTranslation";

export const Treasury = () => {
  const {
    loading,
    treasury: { usdcAmount },
  } = useGuildTreasury();

  const treasuryTranslation = useTranslation("Layout.Treasury.title");

  if (!loading && !usdcAmount) {
    return null;
  }

  return (
    <InfoRow loading={loading} title={treasuryTranslation}>
      <Price color="white" value={usdcAmount} currency="USDC" />
    </InfoRow>
  );
};
