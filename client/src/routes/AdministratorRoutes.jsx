import AdministratorLayout from '@/pages/administrator/AdministratorLayout';
import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const AdministratorRoutes = ({ user }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.role !== "admin") {
        return <Navigate to="/admin-dashboard" />;
    }

   
    return (
        <AdministratorLayout>
            <Outlet />
        </AdministratorLayout>
    );
};

export default AdministratorRoutes;
