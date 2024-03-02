import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Jobarouter</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="signup">signup</NavLink>
          <NavLink to="help">Help</NavLink>
          <NavLink to="careers">reservations</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}