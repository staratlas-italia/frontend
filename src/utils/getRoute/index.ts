import { ChartType } from "~/types/api";

export type Routes =
  | "/"
  | "/admin"
  | "/dashboard"
  | "/mint"
  | "/ships"
  | "/ships/table"
  | "/ships/table"
  | "/ships/:shipId";

export type ApiRoutes =
  | `/api/charts/${ChartType}`
  | "/api/orderbook"
  | "/api/player"
  | "/api/referral/create"
  | "/api/score/:publicKey"
  | "/api/score/rates/:mint"
  | "/api/self"
  | "/api/ships";

export const getApiRoute = <Route extends ApiRoutes>(route: Route) => route;
export const getRoute = <Route extends Routes>(route: Route) => route;
