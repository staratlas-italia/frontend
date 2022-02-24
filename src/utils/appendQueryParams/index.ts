export const appendQueryParams = (
  endpoint: string,
  params: Record<string, number | string>
): string => {
  const url = Object.entries(params).reduce((accumulator, [key, value]) => {
    return `${accumulator}&${key}=${encodeURIComponent(value)}`;
  }, endpoint);

  if (url.indexOf("&") !== -1 && url.indexOf("?") === -1) {
    return url.replace("&", "?");
  }

  return url;
};
