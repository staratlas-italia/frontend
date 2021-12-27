import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { HumanImage } from "~/components/pages/Home/components/EnlistBanner/HumanImage";

export const EnlistBanner = () => (
  <Flex
    align="center"
    className="md:grid md:grid-cols-2"
    direction="col"
    mdDirection="row"
    justify="center"
  >
    <Flex justify="center">
      <HumanImage />
    </Flex>
    <Flex
      color="black"
      className="space-y-5 md:rounded-3xl backdrop-filter backdrop-blur-xl bg-opacity-20"
      direction="col"
      py={5}
      px={8}
    >
      <Text
        color="white"
        className="tracking-tight "
        weight="extrabold"
        size="4xl"
        mdSize="6xl"
      >
        <FormattedMessage
          id="Home.EnlistBanner.title"
          defaultMessage="Vuoi far parte della gilda?"
        />
      </Text>

      <Text size="lg" mdSize="xl" color="gray-200">
        <FormattedMessage
          id="Home.EnlistBanner.description.0"
          defaultMessage="In base all’ammontare investito nella Guild verranno airdroppati 1 o più
          NFT che rappresenteranno le quote di partecipazione alla Gilda, avendo a
          tutti gli effetti il potere di decidere su di essa (DAO)."
        />
      </Text>

      <Text color="white" weight="semibold" size="lg" mdSize="xl">
        <FormattedMessage
          id="Home.EnlistBanner.description.1"
          defaultMessage="Sei pronto ad affrontare delle incredibili avventure spaziali?"
        />
      </Text>

      <Flex justify="end" pt={3}>
        <Link href="https://forms.gle/7VVMXHE5nDVdjcPL8">
          <a target="_blank">
            <Button
              as="span"
              bgColor="green-100"
              hoverBgColor="green-200"
              textColor="green-700"
            >
              <FormattedMessage
                id="Home.EnlistBanner.action.title"
                defaultMessage="Vuoi arruolati? - Clicca qui"
              />
            </Button>
          </a>
        </Link>
      </Flex>
    </Flex>
  </Flex>
);
