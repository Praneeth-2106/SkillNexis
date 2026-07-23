import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("name");

    navigate("/login");
  };

  return (

    <nav className="navbar">

      <div className="logo">
        🛍️ ShopEase
      </div>

      <div className="nav-links">

        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/cart">
          <button>Cart</button>
        </Link>

        <Link to="/admin">
          <button>Admin</button>
        </Link>

        {!name ? (

          <Link to="/login">
            <button>Login</button>
          </Link>

        ) : (

          <>
  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>
</>

        )}

      </div>

    </nav>

  );

}

export default Navbar;