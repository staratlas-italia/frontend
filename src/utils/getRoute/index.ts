export type InternalRoutes =
  | "/"
  | "/admin"
  | "/dashboard"
  | "/ships"
  | "/ships/table"
  | "/ships/table"
  | "/ships/:shipId";

export type ApiRoute =
  | "/api/orderbook"
  | "/api/player"
  | "/api/score/:publicKey"
  | "/api/score/rates/:mint"
  | "/api/ships";

export type Routes = InternalRoutes | ApiRoute;

export const getRoute = <Route extends Routes>(route: Route) => route;
