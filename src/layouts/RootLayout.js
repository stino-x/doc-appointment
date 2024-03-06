import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Jobarouter</h1>
          <NavLink to="/">Home </NavLink>
          <NavLink to="signup">signup </NavLink>
          <NavLink to="add-class">Add Class </NavLink>
          <NavLink to="class-details">class details </NavLink>
          <NavLink to="login">Log in</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}