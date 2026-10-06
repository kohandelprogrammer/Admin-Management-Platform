import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Products
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Users
      </NavLink>

      <NavLink
        to="/tickets"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Tickets
      </NavLink>
    </aside>
  );
}
