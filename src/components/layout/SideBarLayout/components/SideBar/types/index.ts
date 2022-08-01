import { Routes } from "~/utils/getRoute";

export type MenuItem = {
  adminOnly?: boolean;
  name: string;
  external?: boolean;
  icon: string;
  needPbk?: boolean;
  route?: Routes | string;
};
