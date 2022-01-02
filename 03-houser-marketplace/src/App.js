import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, PrivateRoutes } from "./components";
import {
  Category,
  Explore,
  ForgotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
} from "./pages";

const App = () => {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<PrivateRoutes />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path='/category/:categoryName' element={<Category/>}/>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      {location.pathname === "/sign-up" ||
      location.pathname === "/sign-in" ||
      location.pathname === "/forgot-password" ? null : (
        <Navbar />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
