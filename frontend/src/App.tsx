import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin
import AdminRoute from "../adminlog/adminroute";
import AdminLogin from "../adminlog/adminlogin";

// Common
import Header from "../common/Header";
import Footer from "../common/Footer";
import UserHeader from "../common/userheader"; 

// Pages
import Homepage from "../pages/admin/Homepage";
import Onboarding from "../pages/admin/onboarding";
import ApiGroups from "../pages/admin/apigroups";
import ProductsApis from "../pages/admin/products-apis";
import Admin from "../pages/admin/admin";
import Analytics from "../pages/admin/analytics";

// User login, register and pages
import UserLogin from "../userlog/userlogin";
import UserRegister from "../userlog/userregister";
import VerifyOtp from "../userlog/verifyotp"; // 👇 VerifyOtp component-ai import seiyungal (folder path-ai check pannikonga)
import UserHomepage from "../pages/users/userhomepage";
import UserApiPage from "../pages/users/userapipage"; 
import UserAnalytics from "../pages/users/useranalytics"; 
import ProfilePopup from "../pages/users/profilepopup";
import ViewProfile from "../pages/users/viewprofile"; 
import ChangePassword from "../userlog/changepassword"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Pages */}
        <Route element={<AdminRoute />}>
          <Route path="/" element={<><Header /><Homepage /><Footer /></>} />
          <Route path="/onboarding" element={<><Header /><Onboarding /><Footer /></>} />
          <Route path="/api-groups" element={<><Header /><ApiGroups /><Footer /></>} />
          <Route path="/products-apis" element={<><Header /><ProductsApis /><Footer /></>} />
          <Route path="/admin" element={<><Header /><Admin /><Footer /></>} />
          <Route path="/analytics" element={<><Header /><Analytics /><Footer /></>} />
        </Route>

        {/* User Routes */}
        <Route path="/userlogin" element={<UserLogin />} /> 
        <Route path="/userregister" element={<UserRegister />} />
        
        {/* 👇 Verify OTP Route Added */}
        <Route path="/verify-otp" element={<VerifyOtp />} />
        
        {/* User Homepage Route */}
        <Route
          path="/homepage"
          element={
            <>
              <UserHeader activeTab="home" />
              <UserHomepage />
              <Footer />
            </>
          }
        />

        {/* User API Page Route */}
        <Route
          path="/apis"
          element={
            <>
              <UserHeader activeTab="apis" />
              <UserApiPage />
              <Footer />
            </>
          }
        />

        {/* User Analytics Route */}
        <Route
          path="/user-analytics"
          element={
            <>
              <UserHeader activeTab="analytics" />
              <UserAnalytics />
              <Footer />
            </>
          }
        />

        {/* User View Profile Page Route */}
        <Route
          path="/view-profile"
          element={
            <>
              <UserHeader activeTab="profile" />
              <ViewProfile />
              <Footer />
            </>
          }
        />

        {/* User Change Password Route */}
        <Route
          path="/change-password"
          element={
            <>
              <UserHeader activeTab="profile" />
              <ChangePassword />
              <Footer />
            </>
          }
        />

        {/* User Profile Popup Route */}
        <Route
          path="/profile"
          element={
            <>
              <UserHeader />
              <ProfilePopup isOpen={true} />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;