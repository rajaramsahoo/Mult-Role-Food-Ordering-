import Login from "./pages/user/Login"
import Signup from "./pages/user/Signup"
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import MainLayout from "./layout/MainLayout";
import Restaurant from "./components/Restaurant";
// import Offers from "./components/Offers";
// import Profile from "./components/Profile";
import VerifyEmail from "./pages/user/VerifyEmail";
// import AdminDashboard from "./pages/admin/adminDashboard";
// import Sidebar from "./components/Sidebar";
// import Admin from "./pages/admin/Admin";
// import RestaurantCard from "./components/RestaurantCard";
// import Demo from "./pages/home/Demo";
import Cart from "./components/Cart";
// import Demo2 from "./components/Demo2";
import Demo1 from "./components/Demo1";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import AdministratorRoutes from "./routes/AdministratorRoutes";
import AdministratorDashboard from "./pages/administrator/AdministratorDashboard";
import Menu from "./components/Menu";
import SingleRestaurant from "./components/SingleRestaurant";
import AddResturant from "./components/AddResturant";
import AllUsers from "./components/AllUsers";
import Orders from "./components/Orders";
import RestaurantOwnerPrivateRoute from "./routes/RestaurantOwnerPrivateRoute";
import ResturantOwnerDashboard from "./pages/resutrant/ResturantOwnerDashboard";
function App() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext)
  console.log(user)
  return (

    <Routes>
      {/* Wrap Home inside MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/restaurant/single" element={<SingleRestaurant />} />
        <Route path="/cart" element={<Cart />} />

      </Route>
      <Route element={<AdministratorRoutes user={user} />}>
        <Route path="/admin-dashboard" element={<AdministratorDashboard />} />
        <Route path="/admin/restaurant" element={<Restaurant />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/partner-with-us" element={<AddResturant />} />
        <Route path="/admin/partner" element={<AllUsers />} />
        <Route path="/admin/orders" element={<Orders />} />

        {/* <Route path="/edit-menu" element={<EditMenu />} /> */}
      </Route>
      <Route element={<RestaurantOwnerPrivateRoute user={user} />}>
        <Route path="/restaurant-owner-dashboard" element={<ResturantOwnerDashboard />} />
        <Route path="/restaurant-owner/menu" element={<Menu />} />
        <Route path="/restaurant-owner/partner-with-us" element={<SingleRestaurant />} />
        <Route path="/restaurant-owner/partner" element={<AllUsers />} />
        <Route path="/restaurant-owner/orders" element={<Orders />} />

      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

    </Routes>
  )
}

export default App
