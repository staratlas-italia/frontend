import { useState } from "react";

import { EasterEggDone } from "~/components/EasterEgg/Modal/Done";
import { Kittens } from "~/components/EasterEgg/Modal/Kittens";
import { Flex } from "~/components/layout/Flex";
import { BaseModal } from "~/components/modals/BaseModal";

export const EasterEggModal = () => {
  const [done, setDone] = useState(false);

  return (
    <BaseModal
      id="easter-egg"
      size={done ? "regular" : "large"}
      onClose={() => setDone(false)}
    >
      <Flex direction="col" px={5} py={8}>
        {done ? (
          <EasterEggDone />
        ) : (
          <Kittens onComplete={() => setDone(true)} />
        )}
      </Flex>
    </BaseModal>
  );
};
