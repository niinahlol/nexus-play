import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Nexus Play</NavLink>
          <NavLink to="/explorar">Explorar</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p> Nexus Play 2026</p>
        <p> Créditos a RAWG pela API!</p>
      </footer>
    </>
  );
}

export default Layout;
