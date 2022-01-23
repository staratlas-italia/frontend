import { createContext, useContext } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { StarAtlasEntity } from "~/types";

export type ShipsContextState = {
  ships: StarAtlasEntity[];
  update: (ships: StarAtlasEntity[]) => void;
};

export const ShipsContext = createContext<ShipsContextState>(
  {} as ShipsContextState
);

export const useShipContext = () => useContext(ShipsContext);

export const ShipsProvider = ({ children }) => {
  const [ships, update] = useLocalStorage<StarAtlasEntity[]>("ships-v1", []);

  return (
    <ShipsContext.Provider
      value={{
        ships,
        update,
      }}
    >
      {children}
    </ShipsContext.Provider>
  );
};
