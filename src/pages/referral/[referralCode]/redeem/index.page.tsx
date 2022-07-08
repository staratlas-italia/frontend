import { useEffect, useReducer } from "react";
import { Redirect } from "~/components/common/Redirect";
import { LoadingView } from "~/components/LoadingView";
import { getRoute } from "~/utils/getRoute";

const ReedemReferralCodePage = () => {
  const [done, setDone] = useReducer(() => true, false);

  useEffect(() => {}, []);

  if (!done) {
    return <LoadingView />;
  }

  return <Redirect to={getRoute("/dashboard")} />;
};

export default ReedemReferralCodePage;
