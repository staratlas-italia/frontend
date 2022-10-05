import { useEffect } from "react";

export const useRefreshAlert = () => {
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return null;
};
