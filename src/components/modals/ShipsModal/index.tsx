import Image from "next/image";
import React, { useState } from "react";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { BaseModal } from "~/components/modals/BaseModal";
import { useShips } from "~/contexts/ShipsContext";
import { useModal } from "../../../contexts/ModalContext";

type Fleet = {
  [key: string]: number;
};

export const ShipsModal = () => {
  const { setVisible } = useModal("ships-modal");

  const { ships } = useShips();

  const [fleet, setFleet] = useState<Fleet>({});

  return (
    <BaseModal id="ships-modal">
      <div className="divide-y p-3">
        <Flex pb={3}>
          <Text size="4xl" weight="semibold">
            Create your fleet
          </Text>
        </Flex>
        {ships.map((ship) => (
          <Flex align="center" justify="between" key={ship._id}>
            <Flex align="center">
              <Flex>
                <Image src={ship.media.thumbnailUrl} width={70} height={70} />
              </Flex>
              <Flex px={5} direction="col">
                <Text size="xl" weight="medium">
                  {ship.name}
                </Text>
                <Text size="lg">{ship.attributes.rarity}</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="end" className="space-x-5">
              <Button
                round
                bgColor="gray-200"
                hoverBgColor="gray-300"
                onClick={() =>
                  setFleet({
                    ...fleet,
                    [ship._id]: !!fleet?.[ship._id]
                      ? (fleet?.[ship._id] || 0) - 1
                      : fleet?.[ship._id],
                  })
                }
              >
                -
              </Button>
              <Text size="lg">{fleet?.[ship._id] || 0}</Text>
              <Button
                round
                bgColor="gray-200"
                hoverBgColor="gray-300"
                onClick={() =>
                  setFleet({
                    ...fleet,
                    [ship._id]: (fleet?.[ship._id] || 0) + 1,
                  })
                }
              >
                +
              </Button>
            </Flex>
          </Flex>
        ))}
        <Flex pt={2}>
          <Button
            bgColor="purple-300"
            hoverBgColor="purple-400"
            className="w-full"
            onClick={() => setVisible(false)}
          >
            Done
          </Button>
        </Flex>
      </div>
    </BaseModal>
  );
};
