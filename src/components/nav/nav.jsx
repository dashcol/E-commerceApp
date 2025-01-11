import { NavLink, Outlet } from "react-router-dom";
import "./nav.css";
import { useValue } from "../../Context/Context";

export default function NavBar() {
  const { handleLogout, isAuthenticated } = useValue();

  return (
    <>
      <div className="navbar">
        <div className="nav-links">
          <NavLink to="/">
            <h5 className="nav-item">Home</h5>
          </NavLink>
          <NavLink to="products">
            <h5 className="nav-item">Products</h5>
          </NavLink>
          {!isAuthenticated && (
            <NavLink to="login">
              <h5 className="nav-item">Login</h5>
            </NavLink>
          )}
        </div>
        <div className="nav-logo">
          <h1>BUYit</h1>
        </div>
        <div className="order-cart">
          <NavLink to="cart">
            <img
              alt="cart"
              src="https://cdn-icons-png.flaticon.com/128/891/891462.png"
            />
          </NavLink>
          <NavLink to="order">
            <img
              alt="orders"
              src="https://cdn-icons-png.flaticon.com/128/3045/3045670.png"
            />
          </NavLink>
        </div>

        {isAuthenticated && (
          <div className="logout" onClick={handleLogout}>
            <img
              alt="logout"
              src="https://cdn-icons-png.flaticon.com/128/2529/2529508.png"
            />
          </div>
        )}
        <div className="nav-icons">
          <img
            className="icon"
            alt="settings"
            src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
          />
          <img
            className="icon"
            alt="sidebar"
            src="https://cdn-icons-png.flaticon.com/128/8166/8166618.png"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}
