import { useShips } from "~/hooks/useShips";
import { ShipCard } from "../Ship";

export const ShipList = () => {
  const { ships } = useShips();

  return (
    <div className="space-y-10">
      {ships.map((ship) => (
        <ShipCard key={ship._id} ship={ship} />
      ))}
    </div>
  );
};
