import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import BookClass from "./pages/BookClass";

import OfflineClasses from "./pages/OfflineClasses";
import CreateProfile from "./pages/CreateProfile";
import TrainingPlans from "./pages/TrainingPlans";
import PlanDays from "./pages/PlanDays";
import DayWorkout from "./pages/DayWorkout";
import BuyPage from "./pages/BuyPage";
import AdminOfflinePlans from "./pages/admin/AdminOfflinePlans";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import UserDetails from "./pages/admin/UserDetails";
import UserProfileView from "./pages/admin/UserProfileView";
import WorkoutStats from "./pages/admin/WorkoutStats";
import PlanAnalytics from "./pages/admin/PlanAnalytics";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPlans from "./pages/admin/AdminPlans";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
                        <Route path="/offlineclasses" element={<OfflineClasses />} />
            <Route path="/book-class" element={<BookClass />} /> 
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]}><MainLayout /></ProtectedRoute>}>
            <Route path="/createprofile" element={<CreateProfile />} />
            <Route path="/plans" element={<TrainingPlans />} />
            <Route path="/plans/:planId" element={<PlanDays />} />
            <Route path="/day/:day" element={<DayWorkout />} />
            <Route path="/buy/:planId" element={<BuyPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>




          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="user/:userName" element={<UserDetails />} />
            <Route path="userProfile/:userName" element={<UserProfileView />} />
            <Route path="workoutStats" element={<WorkoutStats />} />
            <Route path="planAnalytics" element={<PlanAnalytics />} />
  <Route path="offline-plans" element={<AdminOfflinePlans />} /> 

            <Route path="bookings" element={<AdminBookings />} />
            <Route path="plans" element={<AdminPlans />} />
          </Route>

          <Route path="*" element={<div className="text-center mt-20 text-xl">Page Not Found</div>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;