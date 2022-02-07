import { useAuth } from "~/hooks/useAuth";

export const AssertAuthenticated = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return children;
};
