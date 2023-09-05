import { Route, Routes } from "react-router-dom";
import LandNew from "./pages/LandingPage/LandNew";
import Login from "./pages/Loginpage/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage3 from "./yogesh/pages/HomePage/HomePage3";
import Forbidden from "./pages/Error/Forbidden";
import ServiceUnavilable from "./pages/Error/ServiceUnavilable";
import NotFoundPage from "./pages/Error/NotFoundPage";
import Thank from "./pages/ThankPage/Thank";
import ClerkHomePage from "./clerk/pages/ClerkPage/ClerkHomePage";
import Register from "./components/CustomerRegisterComp/Register";
import ManagerDashboard from "./manager/pages/Manager/ManagerDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandNew />} />
        <Route path="/home" element={<LandNew />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<HomePage3 />} />
        {/* <Route path="/profile" element={<CustomerDashboard />} /> */}
        <Route path="/clerkdashboard" element={<ClerkHomePage />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
        <Route path="/thank" element={<Thank />} />
        <Route path="/unauthorize" element={<Forbidden />} />
        <Route path="/maintainence" element={<ServiceUnavilable />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer theme="colored" autoClose={2000} />
    </div>
  );
}

export default App;
