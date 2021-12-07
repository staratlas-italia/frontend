import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import { ModalButton } from "~/components/controls/ModalButton";
import { BaseModal } from "~/components/modals/BaseModal";
import { AvailableModal, useModal } from "~/contexts/ModalContext";

const Card = styled.div;

export const ContentCard = (props: {
  title: string;
  description: string;
  endElement?: any;
  imgSrc?: string;
}) => {
  const {
    title = "",
    description = "",
    endElement = <div className={"line"} />,
    imgSrc = "",
  } = props;
  return (
    <Card
      cover={
        <div className={"card-cover"}>
          {/* {imgSrc ? (
            <img src={imgSrc} />
          ) : (
            <CreditCardOutlined
              style={{
                color: "rgba(179, 136, 245, 1)",
                fontSize: 18,
              }}
            />
          )} */}
        </div>
      }
    >
      <div className={"body-title"}>{title}</div>
      <div className={"body-content"}>{description}</div>
      {endElement}
    </Card>
  );
};

export const ModalContent = ({ children }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={24}>{children[0]} </Col>
        <Col span={24}>{children[1]}</Col>
        <Col span={24}>{children[2]}</Col>
      </Row>
    </div>
  );
};

type Props = {
  id: AvailableModal;
  buttonClassName?: string;
  buttonText: string;
  modalTitle: string;
  cardProps: any[];
  onClick?: VoidFunction;
};

export const InstructionsModal = ({
  id,
  buttonClassName,
  buttonText,
  modalTitle,
  cardProps,
  onClick,
  ...props
}: Props) => {
  const { visible, setVisible } = useModal(id);
  const showModal = () => {
    onClick?.();
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <ModalButton className={classNames(buttonClassName)} onClick={showModal}>
        {buttonText}
      </ModalButton>
      <BaseModal
        id={id}
        // title={modalTitle}
        // visible={visible}
        // onOk={handleOk}
        // onCancel={handleCancel}
        // footer={null}
        // className={"modal-box instructions-modal"}
        // closeIcon={<img src={"images/modals/close.svg"} />}
        {...props}
      >
        <ModalContent>
          <ContentCard
            title={cardProps[0].title}
            description={cardProps[0].description}
            imgSrc={cardProps[0].imgSrc}
            endElement={cardProps[0].endElement}
          />
          <ContentCard
            title={cardProps[1].title}
            description={cardProps[1].description}
            imgSrc={cardProps[1].imgSrc}
            endElement={cardProps[1].endElement}
          />
          <ContentCard
            title={cardProps[2].title}
            description={cardProps[2].description}
            imgSrc={cardProps[2].imgSrc}
            endElement={cardProps[2].endElement}
          />
        </ModalContent>
      </BaseModal>
    </>
  );
};
