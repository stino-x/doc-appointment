import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
// import Faq from './pages/help/Faq';
// import Contact from './pages/help/Contact';
// import NotFound from './pages/NotFound';
// import Careers, { careersLoader } from './pages/careers/Careers';
// import CareerDetails, { careerDetailsLoader } from './pages/careers/CareerDetails';

// layouts
import RootLayout from './layouts/RootLayout';
import CreateClassForm from './pages/CreateClassForm';
// import HelpLayout from './layouts/HelpLayout';
// import CareersLayout from './layouts/CareersLayout';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Home />} />
//       <Route path="about" element={<About />} />
//       <Route path="help" element={<HelpLayout />}>
//         <Route path="faq" element={<Faq />} />
//         <Route path="contact" element={<Contact />} />
//       </Route>
//       <Route path="careers" element={<CareersLayout />}>
//         <Route
//           index
//           element={<Careers />}
//           loader={careersLoader}
//         />
//         <Route
//           path=":id"
//           element={<CareerDetails />}
//           loader={careerDetailsLoader}
//         />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Route>,
//   ),
// );

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Signup />} />
      <Route path="book-class" element={<CreateClassForm />} />
      <Route path="login" element={<Login />} />
      <Route path="main" element={<RootLayout />}>
        <Route path="home" element={<Home />} />
      </Route>
      ,
    </Route>,
  ),
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
