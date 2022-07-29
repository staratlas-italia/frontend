import { CogIcon } from "@heroicons/react/outline";
import { Button } from "~/components/controls/Button";
import { useModal } from "~/contexts/ModalContext";

export const Settings = () => {
  const { open } = useModal("wallet-modal");

  return (
    <Button size="small" bgColor="white" className="rounded-xl" onClick={open}>
      <CogIcon className="h-5 w-5" />
    </Button>
  );
};
