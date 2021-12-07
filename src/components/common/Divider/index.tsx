import classNames from "classnames";
import styled from "styled-components";
import { Padding } from "~/components/layout/Padding";
import { ColorName } from "~/components/layout/Pane";

type Props = {
  color: ColorName;
};

// export const Divider = styled.div.attrs<Props>(({ color = "gray-400" }) => ({
//   className: classNames("border-2", {
//     [`border-${color}`]: color,
//   }),
// }))`
//   width: 100%;
//   height: 50px;
// `;

export const Divider = styled(Padding).attrs<Props>(
  ({ color = "gray-300" }) => ({
    className: classNames("divide-y-2", {
      [`divide-${color}`]: color,
    }),
  })
)``;
