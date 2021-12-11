import React from "react";
import { Text } from "~/components/common/Text";

type Props = {
  text: string;
};

export const Description = ({ text }: Props) => (
  <Text as="p" size="base" smSize="lg" mdSize="xl" color="gray-100">
    {text.substring(0, 200).trim()}
    {"..."}
  </Text>

  // <Disclosure>
  //   {({ open }) => (
  //     <div className="inline">
  //       <Text
  //         as="span"
  //         align="left"
  //         size="base"
  //         smSize="lg"
  //         mdSize="xl"
  //         color="gray-500"
  //       >
  //         {text.substring(0, 200).trim()}
  //         {!open ? "..." : ""}
  //         <Transition
  //           as="span"
  //           enter="transition duration-100 ease-out"
  //           enterFrom="transform scale-95 opacity-0"
  //           enterTo="transform scale-100 opacity-100"
  //           leave="transition duration-75 ease-out"
  //           leaveFrom="transform scale-100 opacity-100"
  //           leaveTo="transform scale-95 opacity-0"
  //         >
  //           <Disclosure.Panel as="span">{text.substring(200)}</Disclosure.Panel>
  //         </Transition>
  //       </Text>

  //       <Disclosure.Button
  //         as={Text}
  //         className="inline cursor-pointer"
  //         size="base"
  //         smSize="lg"
  //         mdSize="xl"
  //         color="indigo-500"
  //       >
  //         {open ? " Read less" : " Read more"}
  //       </Disclosure.Button>
  //     </div>
  //   )}
  // </Disclosure>
);
