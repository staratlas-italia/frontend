export type TranslationId =
  | "Home.EnlistBanner.action.title"
  | "Home.EnlistBanner.description.0"
  | "Home.EnlistBanner.description.1"
  | "Home.EnlistBanner.title"
  | "Home.WelcomeBanner.action.title"
  | "Home.WelcomeBanner.description.0"
  | "Home.WelcomeBanner.description.1"
  | "Home.WelcomeBanner.title"
  | "Layout.AtlasChange.title"
  | "Layout.Treasury.title"
  | "Layout.Wallet.Connect.title"
  | "Layout.Wallet.Disconnect.title"
  | "Ships.Details.calico_compakt_hero.description"
  | "Ships.Details.calico_evac.description"
  | "Ships.Details.Components.title"
  | "Ships.Details.Crew.title"
  | "Ships.Details.fimbul_byos_packlite.description"
  | "Ships.Details.Modules.title"
  | "Ships.Details.opal_jet.description"
  | "Ships.Details.opal_jetjet.description"
  | "Ships.Details.pearce_f4.description"
  | "Ships.Details.pearce_x4.description"
  | "Ships.Details.pearce_x5.description"
  | "Ships.Details.rainbow_chi.description"
  | "Ships.Details.rainbow_om.description"
  | "Ships.Details.saleDate"
  | "Ships.Details.tufa_feist.description"
  | "Ships.Details.vzus_ambwe.description"
  | "Ships.Details.vzus_opod.description"
  | "Ships.List.Card.BuyAction.title"
  | "Ships.List.Card.ReadMore.title"
  | "Ships.Table.Column.atlasPrice"
  | "Ships.Table.Column.atlasPriceVsPrice"
  | "Ships.Table.Column.atlasPriceVsVwapPrice"
  | "Ships.Table.Column.name"
  | "Ships.Table.Column.price"
  | "Ships.Table.Column.priceVsVwapPrice"
  | "Ships.Table.Column.vwap"
  | "Ships.Toolbar.grid"
  | "Ships.Toolbar.table";

export type TranslationValues = {
  "Ships.Details.saleDate": { date: string };
};

export type TranslationValuesId = keyof TranslationValues;

export type GetTranslationValues<T> = T extends TranslationValuesId
  ? { values: TranslationValues[T] }
  : { values?: never };
