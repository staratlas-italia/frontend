import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { LoadingView } from "~/components/LoadingView";
import { View } from "./View";

const AdminPage = () => (
  <AssertAuthenticated
    adminOnly
    loader={<LoadingView title="Admin.SignatureLoader.title" />}
  >
    <View />
  </AssertAuthenticated>
);

export default AdminPage;
