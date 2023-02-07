import Image from "next/image";
import { Flex } from "~/components/layout/Flex";
import { useSelf } from "~/hooks/useNullableSelf";

export const Badges = () => {
  const self = useSelf();

  const isCatLover = self.tags?.includes("cat-lover");

  return (
    <>
      {isCatLover && (
        <Flex
          title="cat-lover"
          className="rounded-full overflow-hidden border-4 border-white"
        >
          <Image
            width={64}
            height={64}
            alt="Nyan cat badge"
            src="/images/kittens/nyan-cat.webp"
          />
        </Flex>
      )}
    </>
  );
};
