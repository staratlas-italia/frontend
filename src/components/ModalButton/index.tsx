import { Button } from "antd";
import styled from "styled-components";

export const ModalButton = styled(Button).attrs({
  ghost: true,
})`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  margin-right: 24px;
  border: 0;
`;
