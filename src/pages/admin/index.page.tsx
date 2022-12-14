import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { LoadingView } from "~/components/LoadingView";
import { Admin } from "~/views/Admin";

const AdminPage = () => (
  <AssertAuthenticated
    adminOnly
    loader={<LoadingView title="Admin.SignatureLoader.title" />}
  >
    <Admin />
  </AssertAuthenticated>
);

export default AdminPage;
