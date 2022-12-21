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
  direction: "col",
  className:
    "overflow-hidden cursor-pointer max-w-md w-full rounded-3xl transition-all md:hover:scale-105",
})`
  position: relative;
`;

const TitleWrapper = styled(Flex).attrs({
  direction: "col",
  className: "bg-white py-4 md:py-3 px-4",
})`
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

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
        className="space-y-5 md:space-y-0 md:space-x-5"
        direction="col"
        mdDirection="row"
        align="center"
        justify="center"
        p={8}
      >
        <BadgeBlock
          onClick={() =>
            router.push(
              appendQueryParams(
                fillUrlParameters(getRoute("/swap/:swapAccount"), {
                  swapAccount: accounts.s,
                }),
                query
              )
            )
          }
        >
          <img
            alt="tutor-badge-s"
            src="/images/cards/card-tutor-s-square.webp"
          />

          <TitleWrapper>
            <Flex direction="col">
              <Text size="3xl" weight="semibold">
                Bundle S
              </Text>

              <Text size="xl">
                <Translation
                  id="tutor.badgeSelector.pieces"
                  values={{
                    items: new Intl.NumberFormat().format(
                      states[accounts.s]?.quantity || 0
                    ),
                  }}
                />
              </Text>
            </Flex>
          </TitleWrapper>
        </BadgeBlock>

        <BadgeBlock
          onClick={() =>
            router.push(
              appendQueryParams(
                fillUrlParameters(getRoute("/swap/:swapAccount"), {
                  swapAccount: accounts.m,
                }),
                query
              )
            )
          }
        >
          <img
            alt="tutor-badge-m"
            src="/images/cards/card-tutor-m-square.webp"
          />

          <TitleWrapper>
            <Flex direction="col">
              <Text size="3xl" weight="semibold">
                Bundle M
              </Text>
              <Text size="xl">
                <Translation
                  id="tutor.badgeSelector.pieces"
                  values={{
                    items: new Intl.NumberFormat().format(
                      states[accounts.m]?.quantity || 0
                    ),
                  }}
                />
              </Text>
            </Flex>
          </TitleWrapper>
        </BadgeBlock>

        <BadgeBlock
          onClick={() =>
            router.push(
              appendQueryParams(
                fillUrlParameters(getRoute("/swap/:swapAccount"), {
                  swapAccount: accounts.l,
                }),
                query
              )
            )
          }
        >
          <img
            alt="tutor-badge-l"
            src="/images/cards/card-tutor-l-square.webp"
          />

          <TitleWrapper>
            <Flex direction="col">
              <Text size="3xl" weight="semibold">
                Bundle L
              </Text>

              <Text size="xl">
                <Translation
                  id="tutor.badgeSelector.pieces"
                  values={{
                    items: new Intl.NumberFormat().format(
                      states[accounts.l]?.quantity || 0
                    ),
                  }}
                />
              </Text>
            </Flex>
          </TitleWrapper>
        </BadgeBlock>
      </Flex>
    </>
  );
};

export default Tutor;
