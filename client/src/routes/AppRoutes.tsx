import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import Interview from "../pages/Interview";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Recommendations from "../pages/Recommendations";
import EditProfile from "../components/EditProfile";

const AppRoutes = () => {
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
