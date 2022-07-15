import invariant from "invariant";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type SidebarContext = {
  isOpen: boolean;
  toggle: () => void;
};

const Context = createContext<SidebarContext | null>(null);

export const Provider = ({ children }: PropsWithChildren<unknown>) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((open) => !open), [setOpen]);

  return (
    <Context.Provider value={{ isOpen, toggle }}>{children}</Context.Provider>
  );
};

export const useNavigation = () => {
  const navigation = useContext(Context);

  invariant(
    navigation,
    "The useNavigation hook is meant to be used inside a Provider component"
  );

  return navigation;
};
