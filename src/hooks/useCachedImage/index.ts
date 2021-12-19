import { useEffect } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";

export const useCachedImage = ({ id, url }: { id: string; url: string }) => {
  const [image, setImage] = useLocalStorage(id, null);

  useEffect(() => {
    const run = async () => {
      if (!image) {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
      }
    };

    run();
  }, []);

  return image;
};
