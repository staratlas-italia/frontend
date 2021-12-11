import { ShipCard } from "~/components/pages/ShipList/components/Ship";
import { StarAtlasEntity } from "~/types";

type Props = { ships: StarAtlasEntity[] };

export const ShipListPage = ({ ships }: Props) => (
  <div className="space-y-10">
    {ships.map((ship) => (
      <ShipCard key={ship._id} ship={ship} />
    ))}
  </div>
);
