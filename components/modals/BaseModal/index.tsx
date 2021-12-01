import { Modal, ModalProps } from "antd";
import React, { PropsWithChildren } from "react";
import { AvailableModal, useModal } from "../../../contexts/ModalContext";

type Props = PropsWithChildren<ModalProps & { id: AvailableModal }>;

export const BaseModal = ({ children, id, onCancel, ...props }: Props) => {
  const { visible, setVisible } = useModal(id);
  return (
    <Modal
      visible={visible}
      bodyStyle={{
        background: "#2F2F2F",
        boxShadow: "0px 20px 12px 8px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
      }}
      className={"modal-box small-modal"}
      footer={null}
      width={500}
      onCancel={(e) => {
        setVisible(false);
        onCancel?.(e);
      }}
      {...props}
    >
      {children}
    </Modal>
  );
};
