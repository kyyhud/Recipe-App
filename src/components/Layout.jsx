import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/add", label: "Add Recipe" },
  { to: "/recipes", label: "Browse Recipes" },
];

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="brand-kicker">Kitchen Journal</p>
        <h1>Recipe Studio</h1>
        <p className="brand-copy">Create, discover, and save your go-to dishes.</p>
        <nav className="app-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
