import React from 'react'
import { Outlet } from "react-router-dom";
import AdministratorSidebar from './AdministratorSidebar';
const AdministratorLayout = () => {
    return (
        <div className="flex">
            <div className=" ">
                <AdministratorSidebar />

            </div>


            {/* Main Content */}
            <div className="ml-auto w-full  h-screen overflow-y-auto mt-0">
                <Outlet />
            </div>
        </div>
    )
}

export default AdministratorLayout