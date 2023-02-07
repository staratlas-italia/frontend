import { useEffect } from "react";

export const KONAMI_CODE = [
  "QXJyb3dVcA==",
  "QXJyb3dVcA==",
  "QXJyb3dEb3du",
  "QXJyb3dEb3du",
  "QXJyb3dMZWZ0",
  "QXJyb3dSaWdodA==",
  "QXJyb3dMZWZ0",
  "QXJyb3dSaWdodA==",
  "Yg==",
  "YQ==",
];

type Param = {
  onUnlock: () => void;
  sequence?: string[];
};

export const useKonamiCheatCode = ({
  onUnlock,
  sequence = KONAMI_CODE,
}: Param) => {
  useEffect(() => {
    let currentIndex = 0;

    const onKeyUpHandler = (event: KeyboardEvent) => {
      const { key } = event;

      // is key in correct order otherwise reset
      if (Buffer.from(sequence[currentIndex], "base64").toString() !== key) {
        currentIndex = 0;
        return;
      }

      currentIndex += 1;

      if (sequence.length === currentIndex) {
        currentIndex = 0;

        onUnlock();
      }
    };

    document.addEventListener("keyup", onKeyUpHandler);

    return () => {
      document.removeEventListener("keyup", onKeyUpHandler);
    };
  }, [onUnlock, sequence]);

  return null;
};
