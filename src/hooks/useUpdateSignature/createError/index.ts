export const createError =
  <T extends string>(type: T) =>
  (error: unknown) => ({
    error: error instanceof Error ? error : new Error(String(error)),
    type,
  });
