import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import Homepage from "../pages/public/Homepage";
import UserProfile from "../pages/protected/UserProfile";
import Dashboard from "../pages/admin/Dashboard";
import UnAuthorized from "../pages/public/UnAuthorized";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";
import Programs from "../pages/public/Programs";
import Loader from "../components/loader";
import Team from "../pages/public/Team";
import AboutUs from "../pages/public/AboutUs";
import Event from "../pages/public/Event";
import RegisterForm from "../pages/public/Register";
import ForgetPassword from "../pages/public/Forgotpassword";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/event" element={<Event />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/programs/:id" element={<Programs />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
