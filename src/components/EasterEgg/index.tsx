import { useCallback, useState } from "react";
import {
  FallingSpaceships,
  FallingSpaceshipsProps,
} from "~/components/EasterEgg/FallingSpaceships";
import { HtmlComment } from "~/components/HtmlComment";
import { useModal } from "~/contexts/ModalContext";
import { useKonamiCheatCode } from "~/hooks/useKonamiCheatCode";

const Content = ({ onUnlock }: { onUnlock: () => void }) => {
  useKonamiCheatCode({ onUnlock });

  return null;
};

export const EasterEgg = (props: FallingSpaceshipsProps) => {
  const { open } = useModal("easter-egg");
  const [show, setShow] = useState(false);
  const onUnlock = useCallback(() => setShow(true), [setShow]);

  if (show) {
    return (
      <>
        <HtmlComment text="You did it" />

        <div
          onAnimationEnd={() => {
            setShow(false);
            open();
          }}
        >
          <FallingSpaceships {...props} />
        </div>
      </>
    );
  }

  return (
    <>
      <HtmlComment text="Here should be what you're searching for... but hey, you need to press some key :)" />
      <Content onUnlock={onUnlock} />
    </>
  );
};

// EasterEgg.displayName = "EasterEgg";
