import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren } from "react";
import { Flex } from "~/components/layout/Flex";
import { AvailableModal, useModal } from "../../../contexts/ModalContext";

type Props = PropsWithChildren<{ id: AvailableModal }>;

export const BaseModal = ({ children, id, ...props }: Props) => {
  const { visible, close } = useModal(id);

  return (
    <Transition.Root show={visible || false} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={close}
      >
        <Flex
          align="center"
          justify="center"
          pt={4}
          className="min-h-screen pt-4 px-3 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {children}
            </div>
          </Transition.Child>
        </Flex>
      </Dialog>
    </Transition.Root>
  );
};
