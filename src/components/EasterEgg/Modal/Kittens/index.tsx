import { useWallet } from "@solana/wallet-adapter-react";
import { shuffle } from "lodash";
import md5 from "md5";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { api } from "~/network/api";
import { getApiRoute } from "~/utils/getRoute";

type Props = {
  onComplete: () => void;
};

export const Kittens = ({ onComplete }: Props) => {
  const { publicKey } = useWallet();
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(false);

  const order = useMemo(
    () => shuffle(new Array(9).fill(0).map((a, index) => index + 1)),
    []
  );

  const handleComplete = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    setLoading(true);

    const messyfied = selectedOrder.map((s) =>
      md5(`kitten-${s}`).toString().toUpperCase()
    );

    const result = await api.post<{ success: boolean }>(
      getApiRoute("/api/kittens"),
      {
        body: {
          publicKey: publicKey.toString(),
          order: messyfied,
        },
      }
    );

    setLoading(false);

    if (result.success) {
      onComplete();
      return;
    }

    toast.error("Oops...Wrong answer");
  }, [onComplete, publicKey, selectedOrder]);

  const handleSelect = useCallback(
    (index: number) => {
      const currentSet = new Set([...selectedOrder]);

      if (currentSet.has(index)) {
        currentSet.delete(index);
      } else {
        currentSet.add(index);
      }

      setSelectedOrder([...currentSet]);
    },
    [selectedOrder]
  );

  return (
    <>
      <Text size="2xl" weight="semibold">
        Great! You&apos;re on the right way!
      </Text>

      <Flex py={2}>
        <Text transform="uppercase" color="text-gray-700">
          Here some cute kittens just for you!
        </Text>
      </Flex>

      <Text color="text-gray-700" size="sm">
        A long long time ago in a very far away galaxy, nine kittens were born,
        and they were supposed to bring equilibrium to the universe. You have to
        find them!
        <ol className="list-disc pl-3">
          <li>The first kitten likes hunting</li>
          <li>The second kitten loves relaxing</li>
          <li>The third kitten has a passion for spying on others</li>
          <li>The fourth kitten has the talent to pose</li>
          <li>The fifth kitten likes walking</li>
          <li>The sixth kitten never leave his kennel empty</li>
          <li>The seventh kitten likes to hide</li>
          <li>The eighth kitten is super cute</li>
          <li>The last kitten is a bit scared</li>
        </ol>
      </Text>

      <Flex py={4} className="grid grid-cols-3">
        {order.map((index) => {
          const selectedNumber =
            selectedOrder.findIndex((n) => n === index) + 1;

          return (
            <Flex
              key={`kitten-${index}`}
              onClick={() => handleSelect(index)}
              className="relative cursor-pointer select-none hover:border-white hover:border-4"
            >
              {!!selectedNumber && (
                <Flex
                  align="center"
                  justify="center"
                  className=" rounded-full absolute bg-white h-7 w-7 top-1 left-1 "
                >
                  {selectedNumber}
                </Flex>
              )}
              <img
                alt="Cute kitten"
                className="select-none"
                draggable={false}
                src={`/images/kittens/kitten-${index}.webp`}
              />
            </Flex>
          );
        })}
      </Flex>

      <Button
        kind="primary"
        onClick={handleComplete}
        loading={isLoading}
        disabled={!publicKey || isLoading || selectedOrder.length !== 9}
      >
        Go
      </Button>
    </>
  );
};
