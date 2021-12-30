import { useShips } from "~/contexts/ShipsContext";
import { ShipCard } from "~/views/Ships/components/Ship";

export const ShipList = () => {
  const { ships } = useShips();

  return (
    <div className="space-y-10 px-5">
      {ships?.map((ship) => (
        <ShipCard key={ship._id} ship={ship} />
      ))}
    </div>
  );
};
