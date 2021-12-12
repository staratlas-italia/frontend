import { ShipCard } from "~/components/pages/Ships/components/Ship";
import { StarAtlasEntity } from "~/types";

type Props = { ships: StarAtlasEntity[] };

export const ShipList = ({ ships }: Props) => (
  <div className="space-y-10 px-5">
    {ships.map((ship) => (
      <ShipCard key={ship._id} ship={ship} />
    ))}
  </div>
);
