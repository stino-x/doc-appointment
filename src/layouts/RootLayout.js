import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
