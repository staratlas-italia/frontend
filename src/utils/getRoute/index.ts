import { ChartType } from "~/types/api";

export type Routes =
  | "/"
  | "/admin"
  | "/citizenship"
  | "/swap/:swapAccount"
  | "/swap/:swapAccount/checkout"
  | "/swap/:swapAccount/checkout/confirmed"
  | "/swap/:swapAccount/checkout/error"
  | "/dashboard"
  | "/mint"
  | "/ships"
  | "/ships/deals"
  | "/ships/:shipId";

export type ApiRoutes =
  | `/api/charts/${ChartType}`
  | "/api/menu"
  | "/api/player"
  | "/api/payment/confirm"
  | "/api/payment/reference"
  | "/api/referral/create"
  | "/api/referral/redeem"
  | "/api/score/:publicKey"
  | "/api/score/rates/:mint"
  | "/api/self"
  | "/api/self/link"
  | "/api/ships";

export const getApiRoute = <Route extends ApiRoutes>(route: Route) => route;
export const getRoute = <Route extends Routes>(route: Route) => route;
