import { Routes } from "~/utils/getRoute";

export type MenuItem = {
  name: string;
  external?: boolean;
  icon: string;
  route: Routes | string;
};
