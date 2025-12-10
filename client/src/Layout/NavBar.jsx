import { Link } from "react-router";

const NavBar = ({ user }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      {user.id ? (
        <span>
          <Link to="/me">About Me</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
        </span>
      ) : (
        <span>
          <Link to="/login">Login</Link>
        </span>
      )}
    </nav>
  );
};

export default NavBar;
