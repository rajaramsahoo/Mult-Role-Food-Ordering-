import Login from "./pages/user/Login"
import Signup from "./pages/user/Signup"
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import MainLayout from "./layout/MainLayout";
import Restaurant from "./components/Restaurant";

import VerifyEmail from "./pages/user/VerifyEmail";

import Cart from "./components/Cart";

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
import AddMenu from "./components/AddMenu";
import Profile from "./components/Profile";
import EditResturant from "./components/EditResturant";
import SingleMenu from "./components/SingleMenu";
import AddRestaurant from "./components/AddResturant";
function App() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext)

  // const fetchResturantData = async() => {
  //   try {

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<SingleMenu />} />

        <Route path="/restaurant/:id" element={<SingleRestaurant />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />

      </Route>
      <Route element={<AdministratorRoutes user={user} />}>
        <Route path="/admin-dashboard" element={<AdministratorDashboard />} />
        <Route path="/admin/restaurant" element={<Restaurant />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/partner-with-us" element={<AddResturant />} />
        <Route path="/admin/partner-with-us/:id" element={<SingleRestaurant />} />
        <Route path="/admin/partner" element={<AllUsers />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/new-item" element={<AddMenu />} />
        <Route path="/admin/edit-restaurant/:id" element={<EditResturant />} />
      </Route>
      <Route element={<RestaurantOwnerPrivateRoute user={user} />}>
        <Route path="/restaurant-owner-dashboard" element={<ResturantOwnerDashboard />} />
        <Route path="/restaurant-owner-dashboard/new-patner" element={<AddRestaurant />} />
        <Route path="/restaurant-owner/menu" element={<Menu />} />
        <Route path="/restaurant-owner/partner-with-us" element={<Restaurant />} />
        <Route path="/restaurant-owner/partner-with-us/:id" element={<SingleRestaurant />} />
        <Route path="/restaurant-owner/partner" element={<AllUsers />} />
        <Route path="/restaurant-owner/orders" element={<Orders />} />
        <Route path="/restaurant-owner/new-item" element={<AddMenu />} />

      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  )
}

export default App
