export type Routes =
  | "/"
  | "/admin"
  | "/dashboard"
  | "/ships"
  | "/ships/table"
  | "/ships/table"
  | "/ships/:shipId";

export type ChartType =
  | "faction-pie"
  | "avg-ship-quantity"
  | "faction-tiers-pie";

export type ApiRoutes =
  | `/api/charts/${ChartType}`
  | "/api/orderbook"
  | "/api/player"
  | "/api/score/:publicKey"
  | "/api/score/rates/:mint"
  | "/api/ships";

export const getApiRoute = <Route extends ApiRoutes>(route: Route) => route;
export const getRoute = <Route extends Routes>(route: Route) => route;
