import { default as NextImage, ImageProps } from "next/image";

type Props = ImageProps;

export const Image = (props: Props) => (
  <div className="relative h-72 ">
    <NextImage
      {...props}
      quality={20}
      layout="fill"
      className="w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
    />
  </div>
);
