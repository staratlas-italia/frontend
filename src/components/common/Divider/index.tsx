import classNames from "classnames";
import styled from "styled-components";
import { Padding } from "~/components/layout/Padding";
import { ColorName } from "~/components/layout/Pane";

type Props = {
  color: ColorName;
};

export const Divider = styled(Padding).attrs<Props>(
  ({ color = "gray-100" }) => ({
    className: classNames("divide-y", {
      [`divide-${color}`]: color,
    }),
  })
)``;
