import { iconRenderProp } from "~/types";
import { Routes } from "~/utils/getRoute";

export type MenuItem = {
  name: string;
  external?: boolean;
  icon: iconRenderProp;
  needPbk?: boolean;
  route?: Routes | string;
};
