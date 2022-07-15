import md5 from "md5";

export const getProofMessage = (timestamp?: number) =>
  md5(
    (timestamp ? new Date(timestamp) : new Date())
      .setHours(0, 0, 0, 0)
      .toString()
  );
