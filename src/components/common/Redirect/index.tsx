import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  to: string;
  replace?: boolean;
};

export const Redirect = ({ to, replace = false }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [replace, router, to]);

  return null;
};
