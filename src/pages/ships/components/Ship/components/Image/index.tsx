import { default as NextImage, ImageProps } from "next/image";

type Props = ImageProps;

export const Image = (props: Props) => (
  <div className="relative h-72 2xl:h-full 2xl:absolute 2xl:inset-y-0 2xl:left-0 2xl:w-1/2">
    <NextImage
      {...props}
      quality={20}
      layout="fill"
      className="w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
    />
  </div>
);
