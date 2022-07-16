import { LoadingView } from "~/components/LoadingView";
import { useNullableShips } from "~/hooks/useNullableShips";

export const ShipsRetriever = ({ children }) => {
  const { error, loading } = useNullableShips();

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return null;
  }

  return children;
};
