import { default as NextImage } from "next/image";

type Props = {
  src: string;
  alt: string;
};
export const Image = (props: Props) => (
  <div className="relative h-72 lg:h-full lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
    <NextImage
      {...props}
      layout="fill"
      className="bg-gray-300 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
    />
  </div>
);
