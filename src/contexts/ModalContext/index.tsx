import { createContext, useCallback, useContext, useState } from "react";

export type ModalContextState = {
  modals: { [key: string]: boolean };
  setVisible: (id: AvailableModal, open: boolean) => void;
};

export const ModalContext = createContext<ModalContextState>(
  {} as ModalContextState
);

export type AvailableModal =
  | "wallet-modal"
  | "add-program-instance-modal"
  | "how-to-buy-modal"
  | "ships-modal"
  | "easter-egg";

export const useModal = (id: AvailableModal) => {
  const { modals, setVisible } = useContext(ModalContext);

  return {
    visible: modals[id],
    open: () => setVisible(id, true),
    close: () => setVisible(id, false),
  };
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const setVisible = useCallback(
    (id: AvailableModal, value: boolean) => {
      setModals({
        ...modals,
        [id]: value,
      });
    },
    [modals, setModals]
  );

  return (
    <ModalContext.Provider value={{ modals, setVisible }}>
      {children}
    </ModalContext.Provider>
  );
};
