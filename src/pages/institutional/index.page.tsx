import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";
import { useTutorAccounts } from "./useTutorAccounts";

const BadgeBlock = styled(Flex).attrs({
  className:
    "overflow-hidden cursor-pointer max-w-md w-full rounded-2xl transition-all md:hover:scale-105",
})`
  position: relative;
`;

const TitleWrapper = styled(Flex).attrs({
  className: "bg-white overflow-hidden divide-y",
})``;

const numberFormatter = new Intl.NumberFormat();

const Tutor = () => {
  const router = useRouter();

  const query = router.query as Record<string, string | number>;

  const { accounts, states } = useTutorAccounts();

  return (
    <>
      <Flex justify="center" pt={48} px={10}>
        <Text align="center" color="text-white" size="6xl" weight="bold" shadow>
          <Translation id="tutor.badgeSelector.title" />
        </Text>
      </Flex>

      <Flex
        className="space-y-10 lg:space-y-0 lg:space-x-12"
        direction="col"
        lgDirection="row"
        align="center"
        lgAlign="start"
        justify="center"
        p={8}
      >
        {(["s", "m", "l"] as const).map((size) => {
          const account = accounts[size];
          const state = states[account];
          const quantity = numberFormatter.format(state?.quantity || 0);

          return (
            <BadgeBlock
              direction="col"
              key={size}
              onClick={() =>
                router.push(
                  appendQueryParams(
                    fillUrlParameters(getRoute("/swap/:swapAccount"), {
                      swapAccount: account,
                    }),
                    query
                  )
                )
              }
            >
              <Flex>
                <img
                  alt={`tutor-badge-${size}`}
                  src={`/images/cards/card-tutor-${size}-square.webp`}
                />
              </Flex>

              <TitleWrapper direction="col">
                <Flex direction="col">
                  <Flex direction="col" py={4} px={4} className="md:py-3">
                    <Text size="3xl" weight="semibold">
                      {state?.name || "Unknown"}
                    </Text>

                    <Flex pt={2}>
                      <Text size="xl">
                        <Translation
                          id="tutor.badgeSelector.pieces"
                          values={{
                            items: quantity,
                          }}
                        />
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex direction="col" p={5} className="md:py-3">
                    <Text size="lg">
                      <Translation id="tutor.badgeSelector.whatYouReceive" />
                    </Text>

                    <ul className="list-disc pl-5">
                      <li>1 {state.name}</li>
                      <li>
                        <Translation
                          id="tutor.dao.shares"
                          values={{
                            quantity: quantity,
                          }}
                        />
                      </li>
                      <li>
                        <Translation
                          id="tutor.citizenship.badge"
                          values={{ quantity: "1" }}
                        />
                        *
                      </li>
                    </ul>

                    <Flex pt={3} direction="col">
                      <Text size="sm" color="text-gray-500">
                        * <Translation id="tutor.buyBefore31.12.22" />
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex direction="col" px={6} py={8}>
                  {state.prices && (
                    <Flex direction="col">
                      <Text
                        transform="uppercase"
                        weight="semibold"
                        color="text-gray-400"
                      >
                        <Translation id="generic.price" />
                      </Text>

                      <Text size="lg" decoration="line-through">
                        {state.prices.full} {state.vaultCurrency}
                      </Text>

                      {state.discounts && (
                        <>
                          <Flex align="center">
                            <Text size="3xl" weight="semibold">
                              {state.prices.real} {state.vaultCurrency}
                            </Text>

                            <Flex pl={3}>
                              <Text
                                size="lg"
                                weight="semibold"
                                color="text-emerald-500"
                              >
                                <Translation
                                  id="tutor.discount.perc"
                                  values={{
                                    discount:
                                      state.discounts.preReleaseDiscount.toString(),
                                  }}
                                />
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex pt={3} direction="col">
                            <Text size="xs" color="text-gray-500">
                              <Translation id="tutor.shares.description.0" />{" "}
                              <b>
                                <Translation
                                  id="tutor.badgeSelector.pieces"
                                  values={{
                                    items: numberFormatter.format(
                                      (state.quantity || 1) -
                                        state.prices.real / 0.1
                                    ),
                                  }}
                                />
                              </b>{" "}
                              <Translation id="tutor.shares.description.1" />
                              {!!state.discounts
                                .discountRelativeToPreviousBundle && (
                                <>
                                  {" "}
                                  <Translation id="tutor.shares.description.2" />{" "}
                                  <b>
                                    {
                                      state.discounts
                                        .discountRelativeToPreviousBundle
                                    }
                                    %
                                  </b>{" "}
                                  <Translation id="tutor.shares.description.3" />
                                </>
                              )}
                            </Text>
                          </Flex>
                        </>
                      )}
                    </Flex>
                  )}
                </Flex>
              </TitleWrapper>
            </BadgeBlock>
          );
        })}
      </Flex>
    </>
  );
};

export default Tutor;
