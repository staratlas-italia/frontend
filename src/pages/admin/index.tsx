import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { Stats } from "~/views/admin/Stats";

const Admin = () => (
  <AssertAuthenticated>
    <Stats />
  </AssertAuthenticated>
);

export default Admin;
