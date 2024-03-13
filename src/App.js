import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Signup from './Auth/Signup';
// import RootLayout from './components/RootLayout';
import Login from './Auth/Login';
import Landingpage from './components/Landingpage';
import ReservationsTable from './components/Reservations';
import DoctorsForm from './components/DoctorsForm';
import DoctorSelect from './components/DoctorSelect';
import ReservationForm from './components/ReservationForm';
import DetailPage from './components/DetailPage';

// // pages
// import Home from './pages/Home';
// import About from './pages/About';
// import Faq from './pages/help/Faq';
// import Contact from './pages/help/Contact';
// import NotFound from './pages/NotFound';
// import Careers, { careersLoader } from './pages/careers/Careers';
// import CareerDetails, { careerDetailsLoader } from './pages/careers/CareerDetails';

// // layouts
// import RootLayout from './layouts/RootLayout';
// import HelpLayout from './layouts/HelpLayout';
// import CareersLayout from './layouts/CareersLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Landingpage />} />
      <Route path="doctor-select" element={<DoctorSelect />} />
      <Route path="add-doctor" element={<DoctorsForm />} />
      <Route path="doctor-reservation-form" element={<ReservationForm />} />
      <Route path="home/details" element={<DetailPage />} />
      <Route path="reservations" element={<ReservationsTable />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </>,
  ),
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
