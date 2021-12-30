import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { ShipImage } from "~/views/Home/components/WelcomeBanner/ShipImage";

export const WelcomeBanner = () => {
  const { locale } = useRouter();

  return (
    <Flex
      align="center"
      className="md:grid md:grid-cols-2"
      direction="col-reverse"
      mdDirection="row"
      justify="center"
    >
      <BlurBackground
        className="space-y-5  bg-opacity-30"
        direction="col"
        p={5}
        justify="center"
      >
        <Text
          color="white"
          className="tracking-tight0"
          weight="extrabold"
          size="4xl"
          mdSize="6xl"
        >
          <FormattedMessage
            id="Home.WelcomeBanner.title"
            defaultMessage="Benvenuto!"
          />
        </Text>
        <Text color="white" size="lg" mdSize="xl" weight="medium">
          <FormattedMessage
            id="Home.WelcomeBanner.description.0"
            defaultMessage="Un cataclisma cosmico ha generato un tesoro di Minerali al centro della
          galassia. Le tre fazioni in lotta da millenni rivolgono ora le brame di
          conquista agli immensi tesori di Star Atlas."
          />
        </Text>
        <Text color="white" weight="semibold" size="lg" mdSize="xl">
          <FormattedMessage
            id="Home.WelcomeBanner.description.1"
            defaultMessage="Sei pronto a unirti alla gilda più grande d'Italia?"
          />
        </Text>
        <Flex>
          <Link href="/ships" locale={locale}>
            <a>
              <Button
                bgColor="indigo-500"
                hoverBgColor="indigo-600"
                iconRight={ArrowRightIcon}
                textColor="white"
              >
                <FormattedMessage
                  id="Home.WelcomeBanner.action.title"
                  defaultMessage="Esplora le navi"
                />
              </Button>
            </a>
          </Link>
        </Flex>
      </BlurBackground>

      <Flex justify="center">
        <ShipImage />
      </Flex>
    </Flex>
  );
};
