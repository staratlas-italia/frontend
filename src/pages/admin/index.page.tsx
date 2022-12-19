import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { View } from "./View";

const AdminPage = () => (
  <AssertAuthenticated adminOnly>
    <View />
  </AssertAuthenticated>
);

export default AdminPage;
