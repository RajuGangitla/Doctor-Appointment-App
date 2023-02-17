import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./context/appContext";
import Spinnerr from "./components/Spinner";
import ProtectedRoute from "./pages/ProtectedRoute";
import PublicRoute from "./pages/PublicRoute";
import HomePage from "./pages/dashboard/HomePage";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Appointments from "./pages/dashboard/Appointments";
import ApplyDoctor from "./pages/dashboard/ApplyDoctor";
// import Profile from "./pages/dashboard/Profile";
import Logout from "./pages/dashboard/Logout";
import Notifications from "./pages/dashboard/Notifications";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctors/Profile";
import BookingPage from './pages/dashboard/BookingPage';
import DoctorAppointments from "./pages/doctors/DoctorAppointments";
import UserProfile from "./pages/dashboard/UserProfile";

function App() {
  const { isLoading } = useAppContext();
  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <Spinnerr />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="apply-doctor" element={<ApplyDoctor />} />
              <Route path="profile/:id" element={<UserProfile />} />
              <Route path="logout" element={<Logout />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="admin/doctors" element={<Doctors />} />
              <Route path="admin/users" element={<Users />} />
              <Route path="doctor/profile/:id" element={<Profile />} />
              <Route path="doctor/book-appointment/:doctorId" element={<BookingPage />} />
              <Route path="doctor/appointments" element={<DoctorAppointments />} />
            </Route>
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
