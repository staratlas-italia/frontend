type Split<
  Text extends string,
  Separator extends string
> = Text extends `${Separator}${infer Suffix}`
  ? Split<Suffix, Separator>
  : Text extends `${infer Prefix}${Separator}${infer Suffix}`
  ? [Prefix, ...Split<Suffix, Separator>]
  : Text extends ""
  ? []
  : [Text];

type FilterParams<Params> = Params extends [infer Param, ...infer OtherParams]
  ? Param extends `:${infer Name}`
    ? [Name, ...FilterParams<OtherParams>]
    : FilterParams<OtherParams>
  : [];

type SplitEndpoint<Endpoint extends string> = Split<Endpoint, "/">;

type ExtractParams<Endpoint extends string> = FilterParams<
  SplitEndpoint<Endpoint>
>;

export type UrlParametes<Route extends string> = Record<
  ExtractParams<Route>[number],
  boolean | number | string
>;

export const fillUrlParameters = <Route extends `${string}/:${string}`>(
  endpoint: Route,
  params: UrlParametes<Route>
) =>
  Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, `${value}`),
    endpoint as string
  );
