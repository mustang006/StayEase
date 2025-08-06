import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./Pages/FirsPage";
import HomesPage from "./Pages/HomesPage";

// import MyBookingsPage from "./components/UserPage/bookings";
// import FavouritePage from "./components/UserPage/favourite-list";
import HomeDetailsPage from "./Pages/HomeDetailPage";
// import AdminDashboard from "./Pages/AdminDashboard";
// import AuthPage from "./components/AuthSystem/AuthPage";
// import AdminRoute from "./routes/AdminRoutes";
// import PrivateRoute from "./components/AuthSystem/PrivateRoute";
// import AccountPage from "./Pages/MyAccountPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/homes" element={<HomesPage />} />
        <Route path="/homes/:id" element={<HomeDetailsPage />} />

        {/* 🔒 Protected Routes - Now commented out */}

        {/* <Route path="/auth" element={<AuthPage />} /> */}

        {/* <Route
          path="/homes/:id"
          element={
            <PrivateRoute>
              <HomeDetailsPage />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <MyBookingsPage />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/favourite-list"
          element={
            <PrivateRoute>
              <FavouritePage />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/account/:userId"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
