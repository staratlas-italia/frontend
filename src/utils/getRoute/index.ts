export type Routes =
  | "/"
  | "/admin"
  | "/citizenship"
  | "/dashboard"
  | "/mint"
  | "/ships"
  | "/ships/:shipId"
  | "/ships/deals"
  | "/swap/:swapAccount"
  | "/swap/:swapAccount/checkout"
  | "/swap/:swapAccount/checkout/confirmed"
  | "/swap/:swapAccount/checkout/error"
  | "/institutional";

export type ApiRoutes =
  | "/api/kittens"
  | "/api/menu"
  | "/api/payment/confirm"
  | "/api/payment/reference"
  | "/api/player"
  | "/api/referral/create"
  | "/api/referral/redeem"
  | "/api/score/:publicKey"
  | "/api/score/rates/:mint"
  | "/api/self"
  | "/api/self/link"
  | "/api/ships"
  | "/api/swap";

export const getApiRoute = <Route extends ApiRoutes>(route: Route) => route;
export const getRoute = <Route extends Routes>(route: Route) => route;
