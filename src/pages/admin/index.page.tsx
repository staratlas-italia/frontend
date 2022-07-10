import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { LoadingView } from "~/components/LoadingView";
import { Stats } from "~/views/admin/Stats";

const Admin = () => (
  <AssertAuthenticated
    adminOnly
    loader={<LoadingView title="Admin.SignatureLoader.title" />}
  >
    <Stats />
  </AssertAuthenticated>
);

export default Admin;
