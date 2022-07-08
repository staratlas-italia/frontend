import md5 from "md5";

export const getProofMessage = () =>
  md5(new Date().setHours(0, 0, 0, 0).toString());
