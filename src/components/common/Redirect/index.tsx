import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  to: string;
};

export const Redirect = ({ to }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
};
