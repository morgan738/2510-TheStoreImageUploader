import { Outlet } from "react-router";
import NavBar from "./NavBar";
const Layout = ({ user }) => {
  return (
    <div>
      <h1>Welcome to the Store</h1>
      <p>(Officially endorsed by dwayne the rock johnson)</p>
      <NavBar user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
