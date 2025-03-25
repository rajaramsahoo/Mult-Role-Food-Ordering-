import { Navigate, Outlet } from "react-router-dom";
import RestaurantOwnerlayout from "../pages/resutrant/ResturantOwnerlayout";
const RestaurantOwnerPrivateRoute = ({ user }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role == "restaurantOwner") {
        return <Navigate to="/restaurant-owner-dashboard" />;
    }

    return (
        <RestaurantOwnerlayout>
            <Outlet />;

        </RestaurantOwnerlayout>
    )
};

export default RestaurantOwnerPrivateRoute;
