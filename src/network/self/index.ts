import { Self } from "~/types/api";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getApiRoute } from "~/utils/getRoute";

export const fetchSelf = async (publicKey: string): Promise<Self | null> => {
  try {
    const res = await fetch(
      appendQueryParams(getApiRoute("/api/self"), { publicKey })
    );
    const response = await res.json();

    if (response.success) {
      return response.user;
    }

    return null;
  } catch (e) {
    return null;
  }
};
