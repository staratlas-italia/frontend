import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, PropsWithChildren } from "react";
import { AvailableModal, useModal } from "../../../contexts/ModalContext";

type Props = PropsWithChildren<{
  id: AvailableModal;
  size?: "regular" | "large";
  onClose?: () => void;
}>;

export const BaseModal = ({
  children,
  id,
  size = "regular",
  onClose,
}: Props) => {
  const { visible, close } = useModal(id);

  return (
    <Transition.Root show={!!visible} as={Fragment}>
      <Dialog
        open={!!visible}
        onClose={() => {
          close();

          onClose?.();
        }}
        className="relative z-50"
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
          <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={classNames(
                "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle  sm:w-full",
                { "sm:max-w-lg": size === "regular" },
                { "sm:max-w-2xl": size === "large" }
              )}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
