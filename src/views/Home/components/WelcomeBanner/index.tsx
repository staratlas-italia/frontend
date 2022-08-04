import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
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
        className="space-y-5"
        direction="col"
        p={5}
        justify="center"
      >
        <Text
          color="text-white"
          className="tracking-tight0"
          weight="extrabold"
          size="4xl"
          mdSize="6xl"
        >
          <Translation id="Home.WelcomeBanner.title" />
        </Text>
        <Text color="text-white" size="lg" mdSize="xl" weight="medium">
          <Translation id="Home.WelcomeBanner.description.0" />
        </Text>
        <Text color="text-white" weight="semibold" size="lg" mdSize="xl">
          <Translation id="Home.WelcomeBanner.description.1" />
        </Text>
        <Flex>
          <Link href="/dashboard" locale={locale}>
            <a>
              <Button
                iconRight={ArrowRightIcon}
                textColor="text-white"
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                <Translation id="Home.WelcomeBanner.action.title" />
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
